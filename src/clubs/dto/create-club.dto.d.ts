import { ClubStatus, SportType } from '../../generated/prisma/enums';
export declare class CreateClubDto {
    name: string;
    sport: SportType;
    assignmentId: string;
    phone: string;
    image?: string;
    address: string;
    city: string;
    country: string;
    status?: ClubStatus;
    available?: boolean;
}
