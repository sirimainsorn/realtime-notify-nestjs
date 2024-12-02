import { Inject, Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
// import { NotificationGateway } from 'src/notification/notification.gateway';

@Injectable()
export class DashboardService {
  // constructor(private notificationGateway: NotificationGateway) {}
  // constructor(
  //   @Inject(NotificationGateway)
  //   private notificationGateway: Promise<NotificationGateway>,
  // ) {}

  // async approveRequest(userId: string) {
  //   const gateway = await this.notificationGateway;

  //   gateway.handleSendNotification(
  //     userId,
  //     'Your request has been approved!',
  //     'approved',
  //   );
  // }

  // async rejectRequest(userId: number, reason: string) {
  //   this.notificationGateway.handleNotification(
  //     userId,
  //     `Your request has been rejected: ${reason}`,
  //   );
  // }

  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
