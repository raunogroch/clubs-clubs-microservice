import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { PaginationDto } from '../common';

@Controller()
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @MessagePattern('club.create')
  create(@Payload() createClubDto: CreateClubDto) {
    return this.clubsService.create(createClubDto);
  }

  @MessagePattern('club.findAll')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.clubsService.findAll(paginationDto);
  }

  @MessagePattern('club.findOne')
  findOne(@Payload() id: string) {
    return this.clubsService.findOne(id);
  }

  @MessagePattern('club.update')
  update(@Payload() updateClubDto: UpdateClubDto) {
    return this.clubsService.update(updateClubDto.id, updateClubDto);
  }

  @MessagePattern('club.remove')
  remove(@Payload() id: string) {
    return this.clubsService.remove(id);
  }
}
