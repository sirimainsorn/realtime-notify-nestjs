import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [NotificationModule, DashboardModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
