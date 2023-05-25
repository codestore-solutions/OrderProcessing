import { Socket } from 'socket.io';

// guard types
export type AuthPayload = {
    userID: string;
    name: string;
    userType: string;
    establishments?: string[] | string;
};
  
export type SocketWithAuth = Socket & AuthPayload;
export type WsExceptionType = 'BadRequest' | 'Unauthorized' | 'Unknown';
