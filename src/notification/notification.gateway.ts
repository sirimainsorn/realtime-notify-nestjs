import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationGateway {
  constructor(private readonly notificationService: NotificationService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('chat-message')
  @UsePipes(new ValidationPipe())
  handleChatMessage(
    @MessageBody() message: CreateNotificationDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(client);
    console.log(message);
    this.server.emit('chat-message', { user: client.id, message: message });
  }

  // @WebSocketServer() server: Server;
  // private readonly logger = new Logger('NotificationGateway');

  // @SubscribeMessage('sendNotification')
  // async handleSendNotification(
  //   userId: string,
  //   message: string,
  //   status: 'approved' | 'rejected',
  // ) {
  //   try {
  //     this.server.to(userId).emit('notification', { message, status });
  //   } catch (error) {
  //     this.logger.error(
  //       `Failed to fetch messages by User ID ${userId}: ${error.message}`,
  //       error.stack,
  //     );
  //     throw new WsException('Error occurred while fetching messages.');
  //   }
  // }

  @SubscribeMessage('createNotification')
  create(@MessageBody() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @SubscribeMessage('findAllNotification')
  findAll() {
    return this.notificationService.findAll();
  }

  @SubscribeMessage('findOneNotification')
  findOne(@MessageBody() id: number) {
    return this.notificationService.findOne(id);
  }

  @SubscribeMessage('updateNotification')
  update(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(
      updateNotificationDto.id,
      updateNotificationDto,
    );
  }

  @SubscribeMessage('removeNotification')
  remove(@MessageBody() id: number) {
    return this.notificationService.remove(id);
  }
}
