import { Module } from '@nestjs/common';
import { ClubsModule } from './clubs/clubs.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [NatsModule, ClubsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
