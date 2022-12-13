/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { JsonPatchOperation, Operation } from 'azure-devops-node-api/interfaces/common/VSSInterfaces';
import { WorkItem, WorkItemExpand } from 'azure-devops-node-api/interfaces/WorkItemTrackingInterfaces';
import { from, map, mergeMap, Observable, switchMap, tap } from 'rxjs';
import * as azdev from "azure-devops-node-api";
import { IWorkItemTrackingApi } from 'azure-devops-node-api/WorkItemTrackingApi';


@Injectable()
export class CreateWorkItemService {
    private readonly ORG_URL = `https://tfs.varonis.com/DefaultCollection/`;
    private readonly TOKEN = `fos2nkhitb2ulq5d23o7znpy2zurhspws7u7m5wbyjdgqohuzd7a`;
    private readonly WORK_ITEM_TEMPLATE_ID = 1421407;
    private readonly logger = new Logger(CreateWorkItemService.name);
    private tfsConnection: azdev.WebApi;

	public parseAggregatedDataToWotkItemModel(): JsonPatchOperation[] {
        return [
            {
                // description section in TFS
                op: Operation.Add,
                path: '/fields/Microsoft.VSTS.TCM.ReproSteps',
                value: 'very serious Hackathon bug!'
            },
            {
                // title section in TFS
                op: Operation.Add,
                path: '/fields/System.Title',
                value: '[TenentID][Cloud Incident][Critical] - bug from customer panic'
            }
        ];
    }

    public createWorkItem(workItemData: JsonPatchOperation[]): Observable<WorkItem> {
        this.createConnection();
        this.logger.debug(`Going to create work item.`);

        return from(this.tfsConnection.getWorkItemTrackingApi()).pipe(
            switchMap(workItemApi => {
                this.logger.debug(`Going to fetch work item base template.`);

                return from(workItemApi.getWorkItem(this.WORK_ITEM_TEMPLATE_ID)).pipe(
                    map(workItemTemplate => ([workItemTemplate, workItemApi])),
                    tap(() => this.logger.debug(`fetched work item base template successfully!`))
                );
            }),
            mergeMap(([workItemBugTemplate, workItemApi]: [WorkItem, IWorkItemTrackingApi]) => {
                const baseWorkItemFields = this.prepareBaseWorkItemFields(workItemBugTemplate);
                const mergedData = this.mergeWorkItemDataWithTemplate(baseWorkItemFields, workItemData);

                return from(workItemApi.createWorkItem(
                    undefined,
                    mergedData,
                    `Idu Client-Server`,
                    'Bug',
                    false,
                    false,
                    undefined,
                    WorkItemExpand.None
                ));
            }),
            tap(createdWorkItem => this.logger.debug(`Work Item was created successfully! ID=${createdWorkItem.id}`))
        );
        
    }

    private createConnection(): void {
        if (!this.tfsConnection) {
            const authHandler = azdev.getPersonalAccessTokenHandler(this.TOKEN);
            this.tfsConnection = new azdev.WebApi(this.ORG_URL, authHandler); 
        }
    }

    private prepareBaseWorkItemFields(workItem: WorkItem): JsonPatchOperation[] {
        return Object.entries(workItem.fields).reduce((fields, [key, value]) => {

            if (key !== 'System.AssignedTo' && 
                key !== 'System.CreatedBy' && 
                key !== 'System.ChangedBy' && 
                key !== 'Microsoft.VSTS.Common.ActivatedBy' &&
                key !== 'Varonis.QAContact') {
                
                if (key === 'System.State') {
                    fields.push({
                        op: Operation.Add,
                        path: `/fields/${key}`,
                        value: `New`
                    });
        
                    return fields;
                }

                if (key === 'System.Microsoft.VSTS.Common.Severity') {
                    fields.push({
                        op: Operation.Add,
                        path: `/fields/${key}`,
                        value: `Critical`
                    });
        
                    return fields;
                }
    
                if (key === 'System.Reason') {
                    fields.push({
                        op: Operation.Add,
                        path: `/fields/${key}`,
                        value: `To be defined`
                    });
        
                    return fields;
                }
                const parsedVal = typeof value === 'string' || typeof value === 'boolean' ? value : JSON.stringify(value);

                fields.push({
                    op: Operation.Add,
                    path: `/fields/${key}`,
                    value: parsedVal
                });
            } else {
                fields.push({
                    op: Operation.Add,
                    path: `/fields/${key}`,
                    value: `VARONIS\\llevy`
                });
            }

        return fields;
        }, []);
    }

    private mergeWorkItemDataWithTemplate(baseWorkItemFields: JsonPatchOperation[], workItemData: JsonPatchOperation[]): JsonPatchOperation[]{
        return baseWorkItemFields.map(f => {
            const matchingField = workItemData.find(w => w.path === f.path);

            if (matchingField) {
                // override
                return {
                    ...matchingField
                };
            }

            return f;
        })
    }
}
