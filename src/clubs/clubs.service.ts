import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { envs, NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { firstValueFrom } from 'rxjs';
import { CreateClubDto, UpdateClubDto } from './dto';

@Injectable()
export class ClubsService extends PrismaClient {
  constructor(
    @Inject(NATS_SERVICE) private readonly assignmentClient: ClientProxy,
  ) {
    const adapter = new PrismaPg(envs.databaseUrl);
    super({ adapter });
  }

  async create(createClubDto: CreateClubDto) {
    try {
      const clubExist = await this.club.findFirst({
        where: {
          name: createClubDto.name,
          assignmentId: createClubDto.assignmentId,
        },
      });

      if (clubExist) {
        throw new RpcException('Club already exists');
      }

      const assignmentIsValid = await this.validateAssignment(
        createClubDto.assignmentId,
      );

      if (!assignmentIsValid) {
        throw new RpcException('Assignment is not valid');
      }

      return await this.club.create({
        data: {
          name: createClubDto.name,
          sport: createClubDto.sport,
          assignmentId: assignmentIsValid,
          phone: createClubDto.phone,
          image: createClubDto.image,
          address: createClubDto.address,
          city: createClubDto.city,
          country: createClubDto.country,
          status: createClubDto.status,
          available: createClubDto.available,
        },
      });
    } catch (err: any) {
      throw new RpcException(err);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { page = 1, limit = 10 } = paginationDto;
      const totalPage = await this.club.count({
        where: { available: true },
      });

      const lastPage = Math.ceil(totalPage / limit);

      return {
        data: await this.club.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: { available: true },
          select: {
            id: true,
            name: true,
            sport: true,
            assignmentId: true,
            image: true,
            address: true,
            city: true,
            country: true,
            status: true,
            available: true,
          },
        }),
        meta: {
          total: totalPage,
          page: page,
          lastPage: lastPage,
        },
      };
    } catch (err: any) {
      throw new RpcException(err);
    }
  }

  async findOne(id: string) {
    try {
      const clubExist = await this.club.findFirst({
        where: { id },
        select: {
          id: true,
          name: true,
          sport: true,
          assignmentId: true,
          image: true,
          address: true,
          city: true,
          country: true,
          status: true,
          available: true,
        },
      });
      if (!clubExist) throw new RpcException('Club no exist');

      return clubExist;
    } catch (err: any) {
      throw new RpcException(err);
    }
  }

  async update(clubId: string, updateClubDto: UpdateClubDto) {
    try {
      const clubExist = await this.club.findFirst({
        where: { id: clubId },
      });

      if (!clubExist) {
        throw new RpcException('Club no exist');
      }

      const { id: dtoId, assignmentId, ...data } = updateClubDto as any;
      const id = dtoId || clubId;

      if (assignmentId) {
        const assignmentIsValid = await this.validateAssignment(assignmentId);

        if (!assignmentIsValid) {
          throw new RpcException('Assignment is not valid');
        }

        data.assignmentId = assignmentIsValid;
      }

      return this.club.update({
        where: { id },
        data,
      });
    } catch (err: any) {
      throw new RpcException(err);
    }
  }

  async remove(id: string) {
    try {
      const clubExist = await this.club.findFirst({
        where: {
          id,
        },
      });

      if (!clubExist) {
        throw new RpcException('Club no exist');
      }

      await this.club.update({
        where: { id },
        data: { available: false },
      });

      return { message: 'Club was removed successfully' };
    } catch (err: any) {
      throw new RpcException(err);
    }
  }

  private async validateAssignment(assignmentId: string) {
    const assignmentIsValid = await firstValueFrom(
      this.assignmentClient.send('assignment.validate', assignmentId),
    ).catch((err) => {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message,
      });
    });
    return assignmentIsValid;
  }
}
