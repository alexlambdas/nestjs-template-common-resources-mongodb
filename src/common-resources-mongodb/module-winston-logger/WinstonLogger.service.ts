import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { LoggerDto } from "../dtos/Logger.dto";

@Injectable()
export class WinstonLoggerService {

    private loggerDto: LoggerDto;

    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger){}

    public async audit(loggerDto: LoggerDto){

        //
        this.loggerDto = {
            type: undefined,
            applicationName: loggerDto.applicationName,
            methodName: loggerDto.methodName,
            verb: loggerDto.verb,
            transactionId: loggerDto.transactionId,
            level: loggerDto.level,
            layer: loggerDto.layer,
            message: loggerDto.message,
            processingTime: loggerDto.processingTime,
            timestamp: loggerDto.timestamp,
            urlApi: loggerDto.urlApi,
            request: loggerDto.request,
            response: loggerDto.response,
        };

        //
        const childLogger: any = this.logger.child(this.loggerDto);

        //
        if(loggerDto.type === "error") childLogger.error(this.loggerDto.message);
        if(loggerDto.type === "info") childLogger.info(this.loggerDto.message);
    }
}