import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Injectable()
export class UserService {
  constructor(private notificationGateway: NotificationGateway) {}

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
  }

  create(user: UserDto) {
    return user;
  }

  findAll(data: UserDto) {
    return data;
  }

  findOne(user: UserDto) {
    return user;
  }

  update(id: number, user: UserDto) {
    return {
      data: user,
      message: 'User status updated successfully',
    };
  }

  updateStatus(id: number, user: UserDto) {
    this.notificationGateway.server.emit('notification', {
      message: user.status + ' successfully',
      data: user,
    });

    return {
      data: user,
      message: user.status + ' successfully',
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
