import { Injectable } from '@nestjs/common';
import { Prisma, SportType } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ClubsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByNameAndAssignment(
    name: string,
    assignmentId: string,
    sport: SportType,
  ) {
    return this.prisma.club.findFirst({
      where: {
        name,
        assignmentId,
        sport,
      },
    });
  }

  create(data: Prisma.ClubCreateInput) {
    return this.prisma.club.create({
      data,
    });
  }

  countAvailable() {
    return this.prisma.club.count({
      where: { deletedAt: null },
    });
  }

  findAll(page: number, limit: number) {
    return this.prisma.club.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,
        sport: true,
        phone: true,
        assignmentId: true,
        image: true,
        address: true,
        city: true,
        country: true,
        status: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.club.findFirst({
      where: { id, deletedAt: null },
      select: {
        id: true,
        name: true,
        sport: true,
        phone: true,
        assignmentId: true,
        image: true,
        address: true,
        city: true,
        country: true,
        status: true,
      },
    });
  }

  findById(id: string) {
    return this.prisma.club.findFirst({
      where: { id, deletedAt: null },
    });
  }

  update(id: string, data: Prisma.ClubUpdateInput) {
    return this.prisma.club.update({
      where: { id },
      data,
    });
  }

  softDelete(id: string) {
    return this.prisma.club.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
