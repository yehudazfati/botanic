/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ErrorDataDocument = HydratedDocument<ErrorData>;

@Schema()
export class ErrorData {
    @Prop()
    count: number;
    @Prop()
    tenantsCount: number;

    @Prop()
    sessionsCount: number;

    @Prop()
    tenants: string[];

    @Prop()
    lastPage: string;
}

export const ErrorDataSchema = SchemaFactory.createForClass(ErrorData);
