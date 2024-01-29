import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class CustomWebSocketGateway {
  @WebSocketServer() server: Server;

  notifyUser(message: string): void {
    this.server.emit('notificacao', message);
  }
}
