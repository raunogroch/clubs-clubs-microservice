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
exports.ClubsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const clubs_service_1 = require("./clubs.service");
const create_club_dto_1 = require("./dto/create-club.dto");
const update_club_dto_1 = require("./dto/update-club.dto");
const common_2 = require("../common");
let ClubsController = class ClubsController {
    clubsService;
    constructor(clubsService) {
        this.clubsService = clubsService;
    }
    create(createClubDto) {
        return this.clubsService.create(createClubDto);
    }
    findAll(paginationDto) {
        return this.clubsService.findAll(paginationDto);
    }
    findOne(id) {
        return this.clubsService.findOne(id);
    }
    update(updateClubDto) {
        return this.clubsService.update(updateClubDto.id, updateClubDto);
    }
    remove(id) {
        return this.clubsService.remove(id);
    }
};
exports.ClubsController = ClubsController;
__decorate([
    (0, microservices_1.MessagePattern)('club.create'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_club_dto_1.CreateClubDto]),
    __metadata("design:returntype", void 0)
], ClubsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('club.findAll'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaginationDto]),
    __metadata("design:returntype", void 0)
], ClubsController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('club.findOne'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClubsController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('club.update'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_club_dto_1.UpdateClubDto]),
    __metadata("design:returntype", void 0)
], ClubsController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('club.remove'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClubsController.prototype, "remove", null);
exports.ClubsController = ClubsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [clubs_service_1.ClubsService])
], ClubsController);
//# sourceMappingURL=clubs.controller.js.map