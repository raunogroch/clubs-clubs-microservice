import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ClubsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByNameAndAssignment(name: string, assignmentId: string) {
    return this.prisma.club.findFirst({
      where: {
        name,
        assignmentId,
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
      where: { available: true },
    });
  }

  findAll(page: number, limit: number) {
    return this.prisma.club.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { available: true },
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
        available: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.club.findFirst({
      where: { id },
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
        available: true,
      },
    });
  }

  findById(id: string) {
    return this.prisma.club.findFirst({
      where: { id },
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
      data: { available: false },
    });
  }
}
