import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import { NatsModule } from '../transports/nats.module';
import { PrismaService } from '../prisma.service';
import { ClubsRepository } from './clubs.repository';

@Module({
  imports: [NatsModule],
  controllers: [ClubsController],
  providers: [ClubsService, ClubsRepository, PrismaService],
})
export class ClubsModule {}
