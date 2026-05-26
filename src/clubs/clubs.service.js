"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const config_1 = require("../config");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let ClubsService = class ClubsService extends client_1.PrismaClient {
    assignmentClient;
    constructor(assignmentClient) {
        const adapter = new adapter_pg_1.PrismaPg(config_1.envs.databaseUrl);
        super({ adapter });
        this.assignmentClient = assignmentClient;
    }
    async create(createClubDto) {
        try {
            const clubExist = await this.club.findFirst({
                where: {
                    name: createClubDto.name,
                    assignmentId: createClubDto.assignmentId,
                },
            });
            if (clubExist) {
                throw new microservices_1.RpcException('Club already exists');
            }
            const assignmentIsValid = await this.validateAssignment(createClubDto.assignmentId);
            if (!assignmentIsValid) {
                throw new microservices_1.RpcException('Assignment is not valid');
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
        }
        catch (err) {
            throw new microservices_1.RpcException(err);
        }
    }
    async findAll(paginationDto) {
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
        }
        catch (err) {
            throw new microservices_1.RpcException(err);
        }
    }
    async findOne(id) {
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
            if (!clubExist)
                throw new microservices_1.RpcException('Club no exist');
            return clubExist;
        }
        catch (err) {
            throw new microservices_1.RpcException(err);
        }
    }
    async update(clubId, updateClubDto) {
        try {
            const clubExist = await this.club.findFirst({
                where: { id: clubId },
            });
            if (!clubExist) {
                throw new microservices_1.RpcException('Club no exist');
            }
            const { id: dtoId, assignmentId, ...data } = updateClubDto;
            const id = dtoId || clubId;
            if (assignmentId) {
                const assignmentIsValid = await this.validateAssignment(assignmentId);
                if (!assignmentIsValid) {
                    throw new microservices_1.RpcException('Assignment is not valid');
                }
                data.assignmentId = assignmentIsValid;
            }
            return this.club.update({
                where: { id },
                data,
            });
        }
        catch (err) {
            throw new microservices_1.RpcException(err);
        }
    }
    async remove(id) {
        try {
            const clubExist = await this.club.findFirst({
                where: {
                    id,
                },
            });
            if (!clubExist) {
                throw new microservices_1.RpcException('Club no exist');
            }
            await this.club.update({
                where: { id },
                data: { available: false },
            });
            return { message: 'Club was removed successfully' };
        }
        catch (err) {
            throw new microservices_1.RpcException(err);
        }
    }
    async validateAssignment(assignmentId) {
        const assignmentIsValid = await (0, rxjs_1.firstValueFrom)(this.assignmentClient.send('assignment.validate', assignmentId)).catch((err) => {
            throw new microservices_1.RpcException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: err.message,
            });
        });
        return assignmentIsValid;
    }
};
exports.ClubsService = ClubsService;
exports.ClubsService = ClubsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], ClubsService);
//# sourceMappingURL=clubs.service.js.map