import { WsException,  BaseWsExceptionFilter } from '@nestjs/websockets';
import {
    ArgumentsHost,
    BadRequestException,
    Catch,
} from '@nestjs/common';
import { SocketWithAuth, WsExceptionType } from './gateway.types';


export class WsTypeException extends WsException {
    readonly type: WsExceptionType;

    constructor(type: WsExceptionType, code: string | unknown, message: string | unknown) {
        const error = {
            type,
            code,
            message,
        };
        super(error);
        this.type = type;
    }
}


export class WsBadRequestException extends WsTypeException {
    constructor(code: string | unknown, message: string | unknown) {
        super('BadRequest',code, message);
    }
}


export class WsUnauthorizedException extends WsTypeException {
    constructor(code: string | unknown, message: string | unknown) {
        super('Unauthorized',code, message);
    }
}


export class WsUnknownException extends WsTypeException {
    constructor(code: string | unknown, message: string | unknown) {
        super('Unknown',code, message);
    }
}


@Catch()
export class WsCatchAllFilter extends  BaseWsExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const socket: SocketWithAuth = host.switchToWs().getClient();
        if (exception instanceof BadRequestException) {
            const exceptionData = exception.getResponse();
            const exceptionMessage =
                exceptionData['message'] ?? exceptionData ?? exception.name;
            const exceptionCode = exceptionData['message'] ?? exceptionData ?? exception.name;

            const wsException = new WsBadRequestException(exceptionMessage, exceptionCode);
            socket.emit('exception', wsException.getError());
            return;
        }

        if (exception instanceof WsTypeException) {
            console.log(exception.getError())
            socket.emit('exception', exception.getError());
            return;
        }
        
        const wsException = new WsUnknownException(exception.message, 'UNKNOWN_ERROR');
        socket.emit('exception', wsException.getError());
    }
}