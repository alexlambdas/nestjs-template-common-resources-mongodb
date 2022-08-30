import { HttpException } from "@nestjs/common";

export class CustomHttpHandlerException extends HttpException{
    constructor(err: any){
        // custom exception object returned by this class { 'status': 0, 'response': 'string'}
        super(String(err.description), err.code);
    }
}