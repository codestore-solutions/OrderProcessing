import {
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Namespace } from 'socket.io';
import { SocketWithAuth } from './gateway.types';
import { WsCatchAllFilter } from './gateway.exception';
import {
    UseFilters, UseGuards
} from '@nestjs/common'
import { NotificationServices } from './gateway.services';


@WebSocketGateway({
    namespace: 'notification'
})
@UseFilters( WsCatchAllFilter)
export class NotificationGateway implements OnGatewayInit, 
    OnGatewayConnection, OnGatewayDisconnect {

    afterInit():void {
        console.log("Notification Websocket initialized")
    }

    constructor(private readonly notificationService: NotificationServices){}

    @WebSocketServer() io: Namespace;
    @WebSocketServer() server: Server;


    async handleConnection(client: SocketWithAuth, ...args: any[]) {
        const sockets = this.io.sockets;
        const userId = client.userID;
        
        try{
            await client.join(userId);
        } catch(e){
            console.log(e, "Connection error")
            this.io.to(client.id).emit('exception', 
                { code: 'UNKNOWN_ERROR', message: "Something went wrong"});
            this.io.in(client.id).disconnectSockets();
        }

        console.log("Number of connected services", sockets.size)
    }

    @SubscribeMessage('SendMessage')
    SendMessage(client: SocketWithAuth){
        this.io.emit('message', { code: 'MESSAGE', message: "Wweb socket connection"});
    }


    handleDisconnect(client: SocketWithAuth) {
        const sockets = this.io.sockets;
        console.log("After disconnection - number of connected services", sockets.size)
    }
}