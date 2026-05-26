"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcCustomExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let RpcCustomExceptionsFilter = class RpcCustomExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const rpcError = exception.getError();
        if (rpcError.toString().includes('Empty response.')) {
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: rpcError
                    .toString()
                    .substring(0, rpcError.toString().indexOf('(') - 1),
            });
        }
        if (typeof rpcError === 'object' &&
            'status' in rpcError &&
            'message' in rpcError) {
            const status = isNaN(Number(rpcError.status))
                ? 400
                : Number(rpcError.status);
            return response.status(status).json(rpcError);
        }
        return response.status(400).json({
            status: 400,
            message: rpcError,
        });
    }
};
exports.RpcCustomExceptionsFilter = RpcCustomExceptionsFilter;
exports.RpcCustomExceptionsFilter = RpcCustomExceptionsFilter = __decorate([
    (0, common_1.Catch)(microservices_1.RpcException)
], RpcCustomExceptionsFilter);
//# sourceMappingURL=rpc-exceptions.filter.js.map