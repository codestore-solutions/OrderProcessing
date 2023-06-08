import { INestApplicationContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IoAdapter } from "@nestjs/platform-socket.io"
import { Server, ServerOptions } from 'socket.io';
import { SocketWithAuth } from "./gateway.types";


//Socket io adapter for implementing authentication and authorization
export class SocketIOAdapter extends IoAdapter {
    constructor(
        private app: INestApplicationContext,
    ) {
        super(app)
    }

    createIOServer(port: number, options?: ServerOptions) {

        const jwtService = this.app.get(JwtService);
        const server: Server = super.createIOServer(port, options);

        //authenticating notification namespace
        server.of('notification').use(createTokenMiddleware(jwtService))
        return server;
    }
}


//middleware for authenticating socket connection
const createTokenMiddleware =
    (jwtService: JwtService) =>
        async (socket: SocketWithAuth, next) => {
            // for Postman testing support, fallback to token header
            const token = socket.handshake.auth.token || socket.handshake.headers['token'] ||socket.handshake.query.token;
            console.log(token, 'token')
            try {
                // const payload = jwtService.verify(token);
                // socket.userID = payload.data.sub;
                // socket.name = payload.data.name;
                // socket.userType = payload.data.userType;
                socket.userID = token

                // console.log(payload.data, ';payload')
                next();
            } catch {
                next(new Error('FORBIDDEN'));
            }
        };