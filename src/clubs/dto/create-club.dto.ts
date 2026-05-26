import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClubStatus, SportType } from '../../generated/prisma/enums';

export class CreateClubDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(SportType)
  sport!: SportType;

  @IsString()
  @IsNotEmpty()
  assignmentId!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsEnum(ClubStatus)
  @IsOptional()
  status?: ClubStatus;

  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
