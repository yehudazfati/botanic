/* eslint-disable prettier/prettier */
// import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
// import { from, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Server } from 'socket.io';

// @WebSocketGateway(81, {
//     transports: ['websocket'],
// 	cors: {
// 		origin: '*',
// 	},
// })
// export class EventsGateway {
// 	@WebSocketServer()
// 	server: Server;

// 	@SubscribeMessage('events')
// 	findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
// 		return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
// 	}

// 	@SubscribeMessage('process')
// 	async process(@MessageBody() data: number): Promise<number> {
// 		return data;
// 	}

//     public xxx() {
//         this.server.e
//     }
// }

import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway(81, {
	transports: ['websocket'],
	namespace: 'notifications',
    cors: {
        origin: '*',
    },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server;
	users = 0;

	async handleConnection() {
		// A client has connected
		this.users++;

		// Notify connected clients of current users
		this.server.emit('events', this.users);
		console.log(this.users);
	}

	async handleDisconnect() {
		// A client has disconnected
		this.users--;

		// Notify connected clients of current users
		this.server.emit('events', this.users);
	}

	@SubscribeMessage('chat')
	async onChat(client, message) {
		client.broadcast.emit('chat', message);
	}
}
