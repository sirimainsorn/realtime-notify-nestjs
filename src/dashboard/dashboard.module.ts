import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [DashboardController],
  providers: [DashboardService, NotificationGateway],
})
export class DashboardModule {}
