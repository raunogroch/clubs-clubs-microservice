import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
export declare class RpcCustomExceptionsFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost): any;
}
