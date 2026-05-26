import { PartialType } from '@nestjs/mapped-types';
import { CreateClubDto } from './create-club.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClubDto extends PartialType(CreateClubDto) {
  @IsString()
  @IsNotEmpty()
  id!: string;
}
