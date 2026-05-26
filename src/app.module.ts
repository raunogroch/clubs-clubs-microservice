import { Module } from '@nestjs/common';
import { ClubsModule } from './clubs/clubs.module';

@Module({
  imports: [ClubsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
