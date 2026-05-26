import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { PaginationDto } from '../common';
export declare class ClubsController {
    private readonly clubsService;
    constructor(clubsService: ClubsService);
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
    update(updateClubDto: UpdateClubDto): Promise<{
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
}
