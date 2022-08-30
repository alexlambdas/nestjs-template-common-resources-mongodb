import { HttpException, Injectable } from "@nestjs/common";
import { FaultDto } from "../dtos/Fault.fault.dto";
import { LoggerDto } from "../dtos/Logger.dto";
import { MongodbMetaDataDto } from "../dtos/MongodbMetaData.dto";
import { ConfigAppService } from "./ConfigApp.service";


/**
 * 
 * @author alexLambdas
 * @description
 * 
 */
@Injectable()
export class UtilitiesService{

    private faultDto: FaultDto;
    private loggerDto: LoggerDto;

    constructor(private configApp: ConfigAppService){}


    /**
     * 
     * @description 
     * 
     * 
     */
    public fnGetTimeZone(): string {

        let gmtZuluDate = new Date();
        let year = gmtZuluDate.getFullYear();
        let month = gmtZuluDate.getMonth();
        let day = gmtZuluDate.getDate();
        let hours = gmtZuluDate.getHours() - 5;
        let minutes = gmtZuluDate.getMinutes();
        let seconds = gmtZuluDate.getSeconds();
        let gmt05Date = new Date(year, month, day, hours, minutes, seconds);
        return gmt05Date.toISOString().split(".")[0];
    }



    /**
     * 
     * @description 
     * 
     * 
     */
    public fnGetProcessingTime(
        end: number, 
        init: number): number{
            
            //
            return (end-init)/1000;
    }



    /**
     * 
     * @description 
     * 
     * 
     */
    public fnGetVerbString(verb: number): string{

        return (
            verb === 0 && "GET"
            ||
            verb === 1 && "GET"
            ||
            verb === 2 && "GET"
            ||
            verb === 3 && "PUT"
            ||
            verb === 4 && "POST"
            ||
            verb === 5 && "DEL"
        )
    }



    /**
     * 
     * @description 
     * 
     * 
     */
    public fnGetObjectLog_SuccessWithBody(
        timeInit: number,
        timeEnd: number,
        mongodbMetaData: MongodbMetaDataDto,
        response: string): LoggerDto{

            //
            this.loggerDto = {
                type: this.configApp.loggerInfo(),
                applicationName: mongodbMetaData.applicationName,
                methodName: mongodbMetaData.methodName,
                verb: this.fnGetVerbString(mongodbMetaData.verb),
                transactionId: mongodbMetaData.uuidv4,
                level: undefined, //
                layer: this.configApp.connectionLayer(),
                message: this.configApp.successMessage(),
                processingTime: this.fnGetProcessingTime(timeEnd, timeInit),
                timestamp: this.fnGetTimeZone(),
                urlApi: mongodbMetaData.urlApi,
                request: mongodbMetaData.body,
                response: response,
            };
            return this.loggerDto;
    }



    /**
     * 
     * @description 
     * 
     * 
     */
    public fnGetObjectLog_SuccessWithUrlApi(
        timeInit: number,
        timeEnd: number,
        mongodbMetaData: MongodbMetaDataDto,
        response: string): LoggerDto{

            //
            this.loggerDto = {
                type: this.configApp.loggerInfo(),
                applicationName: mongodbMetaData.applicationName,
                methodName: mongodbMetaData.methodName,
                verb: this.fnGetVerbString(mongodbMetaData.verb),
                transactionId: mongodbMetaData.uuidv4,
                level: undefined, //
                layer: this.configApp.connectionLayer(),
                message: this.configApp.successMessage(),
                processingTime: this.fnGetProcessingTime(timeEnd, timeInit),
                timestamp: this.fnGetTimeZone(),
                urlApi: mongodbMetaData.urlApi,
                request: mongodbMetaData.urlApi,
                response: response,
            };
            return this.loggerDto;
    }



    /**
     * 
     * @description 
     * 
     * 
     */
    public fnGetObjectLog_ErrorWithBody(
        timeInit: number,
        timeEnd: number,
        mongodbMetaData: MongodbMetaDataDto,
        fault: FaultDto): LoggerDto {

            //
            this.loggerDto = {
                type: this.configApp.loggerError(),
                applicationName: mongodbMetaData.applicationName,
                methodName: mongodbMetaData.methodName,
                verb: this.fnGetVerbString(mongodbMetaData.verb),
                transactionId: mongodbMetaData.uuidv4,
                level: undefined, //
                layer: this.configApp.connectionLayer(),
                message: this.configApp.errorMessage(),
                processingTime: this.fnGetProcessingTime(timeEnd, timeInit),
                timestamp: this.fnGetTimeZone(),
                urlApi: mongodbMetaData.urlApi,
                request: mongodbMetaData.body,
                response: JSON.stringify(fault),
            };
            return this.loggerDto;
    }



    /**
     * 
     * @description 
     * 
     * 
     */
    public fnGetObjectLog_ErrorWithUrlApi(
        timeInit: number,
        timeEnd: number,
        mongodbMetaData: MongodbMetaDataDto,
        fault: FaultDto): LoggerDto{

            //
            this.loggerDto = {
                type: this.configApp.loggerError(),
                applicationName: mongodbMetaData.applicationName,
                methodName: mongodbMetaData.methodName,
                verb: this.fnGetVerbString(mongodbMetaData.verb),
                transactionId: mongodbMetaData.uuidv4,
                level: undefined, //
                layer: this.configApp.connectionLayer(),
                message: this.configApp.errorMessage(),
                processingTime: this.fnGetProcessingTime(timeEnd, timeInit),
                timestamp: this.fnGetTimeZone(),
                urlApi: mongodbMetaData.urlApi,
                request: mongodbMetaData.urlApi,
                response: JSON.stringify(fault),
            };
            return this.loggerDto;
    }



    /**
     * 
     * @description 
     * 
     * 
     */
    public fnGetObjectFault_ErrorMongodb(
        customInternalFault: HttpException,
        mongodbMetaData: MongodbMetaDataDto): FaultDto {

            //
            this.faultDto = {
                fault: {
                    transactionId: mongodbMetaData.uuidv4,
                    timeStamp: new Date().toISOString(),
                    httpStatusCode: customInternalFault.getStatus(),
                    message: this.configApp.error(),
                    layer: this.configApp.connectionLayer(),
                    path: mongodbMetaData.backEndUrl,
                    detail: {
                        systemErrorHandler: this.configApp.systemErrorHandler(),
                        originSystemError: this.configApp.originSystemError("mongo"),
                        originSystemErrorCode: customInternalFault.getStatus().toString(),
                        originSystemErrorMessage: this.configApp.errorMessage(),
                        originSystemErrorDescription: customInternalFault.getResponse(),
                    }
                }
            };
            return this.faultDto;
    }

    

    /**
     * 
     * @description 
     * 
     * 
     */
     public fnGetObjectFault_ErrorCircuitBreaker(
        customInternalFault: HttpException,
        mongodbMetaData: MongodbMetaDataDto): FaultDto {

            //
            this.faultDto = {
                fault: {
                    transactionId: mongodbMetaData.uuidv4,
                    timeStamp: new Date().toISOString(),
                    httpStatusCode: customInternalFault.getStatus(),
                    message: this.configApp.error(),
                    layer: this.configApp.connectionLayer(),
                    path: mongodbMetaData.backEndUrl,
                    detail: {
                        systemErrorHandler: this.configApp.systemErrorHandler(),
                        originSystemError: this.configApp.originSystemError("oc"),
                        originSystemErrorCode: customInternalFault.getStatus().toString(),
                        originSystemErrorMessage: customInternalFault.getResponse().toString(),
                        originSystemErrorDescription: this.configApp.errorDescriptionCircuitBreaker(mongodbMetaData.timeoutCircuitBreaker),
                    }
                }
            };
            return this.faultDto;
    }
}