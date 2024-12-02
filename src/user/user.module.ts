import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Module({
  controllers: [UserController],
  providers: [UserService, NotificationGateway],
})
export class UserModule {}
