import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { FaultDto } from "../dtos/Fault.fault.dto";


/**
 * 
 * @author alexLambdas
 * @description
 * 
 * 
 */
@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter{

    private reduceMessage: any;

    constructor(){
        this.reduceMessage = (previousValue: string, currentValue: string) => `${previousValue} && ${currentValue}`;
    }

    catch(exception: any, host: ArgumentsHost) {
        
        //
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();
        const status = exception.getStatus();
        const faultResponse = exception.getResponse();

        //
        faultResponse.fault !== undefined &&
        response.status(status).json(faultResponse);

        //
        faultResponse.fault === undefined &&
        response.status(status).json(this.fnGetObjectFault(faultResponse, request, this.reduceMessage));
    }



    /**
     * 
     * @description 
     * 
     * 
     */
     private fnGetObjectFault(
        customInternalFault: any,
        request: any,
        reduceMessage?: any): FaultDto {

            //
            let faultDto: FaultDto;
            faultDto = {
                fault: {
                    transactionId: undefined,
                    timeStamp: new Date().toISOString(),
                    httpStatusCode: customInternalFault.statusCode,
                    message: "error",
                    layer: "CONTROLLER_LAYER",
                    path: request.url,
                    detail: {
                        systemErrorHandler: "openshift",
                        originSystemError: "openshift",
                        originSystemErrorCode: (customInternalFault.statusCode).toString(),
                        originSystemErrorMessage: customInternalFault.error,
                        originSystemErrorDescription: Array.isArray(customInternalFault.message) ? (
                            customInternalFault.message.reduce(reduceMessage)
                        ) : (
                            customInternalFault.message
                        ),
                    }
                }
            };
            return faultDto;
    }
}