import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [ClubsController],
  providers: [ClubsService],
})
export class ClubsModule {}
