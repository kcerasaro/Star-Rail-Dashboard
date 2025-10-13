import { Module } from '@nestjs/common';
import { UserInformationService } from './user-information.service';
import { UserInformationController } from './user-information.controller';

@Module({
  providers: [UserInformationService],
  controllers: [UserInformationController]
})
export class UserInformationModule {}
