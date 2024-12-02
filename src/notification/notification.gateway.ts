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
    // console.log('user : ', client);
    console.log('user : ', client.id);
    console.log('name : ', message.name);
    console.log('status : ', message.status);
    console.log('============================');

    this.server.emit('chat-message', { messageId: message });
  }

  @SubscribeMessage('notification')
  handleNotification(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('notification', data);
  }

  // @SubscribeMessage('createNotification')
  // create(@MessageBody() createNotificationDto: CreateNotificationDto) {
  //   return this.notificationService.create(createNotificationDto);
  // }

  // @SubscribeMessage('findAllNotification')
  // findAll() {
  //   return this.notificationService.findAll();
  // }

  // @SubscribeMessage('findOneNotification')
  // findOne(@MessageBody() id: number) {
  //   return this.notificationService.findOne(id);
  // }

  // @SubscribeMessage('updateNotification')
  // update(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
  //   return this.notificationService.update(
  //     updateNotificationDto.id,
  //     updateNotificationDto,
  //   );
  // }

  // @SubscribeMessage('removeNotification')
  // remove(@MessageBody() id: number) {
  //   return this.notificationService.remove(id);
  // }
}
