import { PrismaClient } from '../generated/prisma/client';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { CreateClubDto, UpdateClubDto } from './dto';
export declare class ClubsService extends PrismaClient {
    private readonly assignmentClient;
    constructor(assignmentClient: ClientProxy);
    create(createClubDto: CreateClubDto): Promise<{
        id: string;
        name: string;
        image: string | null;
        sport: import("../generated/prisma/enums").SportType;
        phone: string;
        address: string;
        city: string;
        country: string;
        assignmentId: string;
        status: import("../generated/prisma/enums").ClubStatus;
        createdAt: Date;
        updatedAt: Date;
        available: boolean;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: {
            id: string;
            name: string;
            image: string | null;
            sport: import("../generated/prisma/enums").SportType;
            address: string;
            city: string;
            country: string;
            assignmentId: string;
            status: import("../generated/prisma/enums").ClubStatus;
            available: boolean;
        }[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        image: string | null;
        sport: import("../generated/prisma/enums").SportType;
        address: string;
        city: string;
        country: string;
        assignmentId: string;
        status: import("../generated/prisma/enums").ClubStatus;
        available: boolean;
    }>;
    update(clubId: string, updateClubDto: UpdateClubDto): Promise<{
        id: string;
        name: string;
        image: string | null;
        sport: import("../generated/prisma/enums").SportType;
        phone: string;
        address: string;
        city: string;
        country: string;
        assignmentId: string;
        status: import("../generated/prisma/enums").ClubStatus;
        createdAt: Date;
        updatedAt: Date;
        available: boolean;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    private validateAssignment;
}
