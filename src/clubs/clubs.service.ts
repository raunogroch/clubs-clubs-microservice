import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { firstValueFrom } from 'rxjs';
import { CreateClubDto, UpdateClubDto } from './dto';
import { ClubsRepository } from './clubs.repository';

@Injectable()
export class ClubsService {
  constructor(
    private readonly clubsRepository: ClubsRepository,
    @Inject(NATS_SERVICE) private readonly assignmentClient: ClientProxy,
  ) {}

  async create(createClubDto: CreateClubDto) {
    try {
      const clubExist = await this.clubsRepository.findByNameAndAssignment(
        createClubDto.name,
        createClubDto.assignmentId,
      );

      if (clubExist) {
        throw new RpcException('Club already exists');
      }

      const assignmentIsValid = await this.validateAssignment(
        createClubDto.assignmentId,
      );

      if (!assignmentIsValid) {
        throw new RpcException('Assignment is not valid');
      }

      const newClub = await this.clubsRepository.create({
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
      });

      try {
        await firstValueFrom(
          this.assignmentClient.send('assignment.addClubs', {
            id: assignmentIsValid,
            clubs: [newClub.id],
          }),
        );
      } catch (err) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Club created but failed to register in assignment microservice',
        });
      }

      return newClub;
    } catch (err: any) {
      throw new RpcException(err);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { page = 1, limit = 10 } = paginationDto;
      const totalPage = await this.clubsRepository.countAvailable();

      const lastPage = Math.ceil(totalPage / limit);

      return {
        data: await this.clubsRepository.findAll(page, limit),
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
      const clubExist = await this.clubsRepository.findOne(id);
      if (!clubExist) throw new RpcException('Club no exist');

      return clubExist;
    } catch (err: any) {
      throw new RpcException(err);
    }
  }

  async update(clubId: string, updateClubDto: UpdateClubDto) {
    try {
      const clubExist = await this.clubsRepository.findById(clubId);

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

      return this.clubsRepository.update(id, data);
    } catch (err: any) {
      throw new RpcException(err);
    }
  }

  async remove(id: string) {
    try {
      const clubExist = await this.clubsRepository.findById(id);

      if (!clubExist) {
        throw new RpcException('Club no exist');
      }

      await this.clubsRepository.softDelete(id);

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
