import { BadRequestException, Inject, Injectable, InternalServerErrorException, ServiceUnavailableException } from "@nestjs/common";
import { CreateDbConnectionDto } from "../dtos/CreateDbConnection.dto";
import { CustomHttpHandlerExceptionDto } from "../dtos/CustomHttpHandlerException.dto";
import { FaultDto } from "../dtos/Fault.fault.dto";
import { MongodbMetaDataDto } from "../dtos/MongodbMetaData.dto";
import { VerbEnumDto } from "../dtos/VerbEnum.dto";
import { CustomHttpHandlerException } from "../exceptions/CustomHttpHandlerException";
import { CircuitBreakerInterface, I_CIRCUIT_BREAKER } from "../module-circuit-breaker/CircuitBreaker.interface";
import { UtilitiesService } from "../module-utilities/Utilities.service";
import { WinstonLoggerService } from "../module-winston-logger/WinstonLogger.service";
import { CrudInterface } from "./Crud.interface";
import { I_MONGO_DB, MongodbInterface } from "./Mongodb.interface";


/**
 * 
 * @author alexLambdas
 * @description
 * 
 * 
 */
@Injectable()
export class CrudService  implements CrudInterface{

    constructor(
        private winston: WinstonLoggerService,
        private util: UtilitiesService,
        @Inject(I_MONGO_DB) private db: MongodbInterface,
        @Inject(I_CIRCUIT_BREAKER) private circuitBreaker: CircuitBreakerInterface){}



    /**
     * 
     * @description
     * 
     * 
     * 
     * 
     */
    public async crud(mongodbMetaData: MongodbMetaDataDto): Promise<string>{

        //
        let timeInit = 0;
        let timeEnd = 0;
        let response: string;
        let faultDto: FaultDto;
        let createDbConnectionDto: CreateDbConnectionDto;
        
        //
        createDbConnectionDto = {
            user: mongodbMetaData.dbUsername,
            pass: mongodbMetaData.dbPassword,
            serverSelectionTimeoutMS: mongodbMetaData.dbServerSelectionTimeoutMS,
            useUnifiedTopology: false,
        };
        
        //
        try{

            //
            await this.circuitBreaker.exex();

            //
            timeInit = (new Date()).getTime();
            await this.db.customGetConnection(mongodbMetaData.backEndUrl, createDbConnectionDto);
            response = await this.customCrudMongodb(mongodbMetaData);
            await this.db.customCloseConnection();
            timeEnd = (new Date()).getTime();

            //
            await this.circuitBreaker.updateBreakerState("SUCCESS");

            //
            this.logForSuccessTransaction(mongodbMetaData, timeInit, timeEnd, response);

            //
            return response;

        }
        catch(customInternalFault){

            //
            await this.circuitBreaker.updateBreakerState("FAILURE");

            //
            if(customInternalFault.response === "CIRCUIT_BREAKER"){
                faultDto = this.util.fnGetObjectFault_ErrorCircuitBreaker(customInternalFault, mongodbMetaData);
            }
            else{
                faultDto = this.util.fnGetObjectFault_ErrorMongodb(customInternalFault, mongodbMetaData);
            }

            //
            this.logForErrorTransaction(mongodbMetaData, timeInit, timeEnd, faultDto);

            //
            this.fhThrowCustomFault(faultDto);
        }
    }



    /**
     * 
     * @description
     * 
     * 
     * 
     * 
     */
    private async customCrudMongodb(mongodbMetaData: MongodbMetaDataDto,): Promise<string>{

        //
        return (
            mongodbMetaData.verb === VerbEnumDto.DELETE_ONE &&
            await this.db.customDeleteOne(mongodbMetaData.mongooseId, mongodbMetaData.mongooseModel)
            ||
            mongodbMetaData.verb === VerbEnumDto.GET_ALL &&
            await this.db.customFind(mongodbMetaData.mongooseModel)
            ||            
            mongodbMetaData.verb === VerbEnumDto.GET_BY_ID &&
            await this.db.customFindById(mongodbMetaData.mongooseId, mongodbMetaData.mongooseModel)
            ||            
            mongodbMetaData.verb === VerbEnumDto.GET_BY_PARAMS &&
            await this.db.customFindByParams(mongodbMetaData.mongooseModel, mongodbMetaData.paramsObject)
            ||
            mongodbMetaData.verb === VerbEnumDto.UPDATE_ONE &&
            await this.db.customUpdateOne(mongodbMetaData.mongooseId, mongodbMetaData.body, mongodbMetaData.mongooseModel)
            ||
            mongodbMetaData.verb === VerbEnumDto.POST_ONE &&
            this.fnPostOne(mongodbMetaData)
        )
    }


    /**
     * 
     * @description
     * 
     * 
     * 
     * 
     */
    private async fnPostOne(mongodbMetaData: MongodbMetaDataDto): Promise<string>{

        //
        const findObject: string = await this.db.customFindOne(mongodbMetaData.body, mongodbMetaData.mongooseModel);

        //
        if(findObject !== "null"){
            let customHttpHandlerExceptionDto: CustomHttpHandlerExceptionDto;
            customHttpHandlerExceptionDto = {
                code: 400,
                description: `already exists object with "_id": ${(JSON.parse(findObject))._id}`,
            };
            throw new CustomHttpHandlerException(customHttpHandlerExceptionDto);
        }

        //
        return this.db.customSave(mongodbMetaData.body, mongodbMetaData.mongooseModel);
    }


    /** 
     * 
     * @description
     * 
     * 
     * 
     * 
     */
    private logForSuccessTransaction(
        mongodbMetaData: MongodbMetaDataDto,
        timeInit: number,
        timeEnd: number,
        response: string): void{

            //
            (
                mongodbMetaData.verb === VerbEnumDto.GET_ALL ||
                mongodbMetaData.verb === VerbEnumDto.GET_BY_ID ||
                mongodbMetaData.verb === VerbEnumDto.GET_BY_PARAMS
            ) &&
            this.winston.audit(this.util.fnGetObjectLog_SuccessWithUrlApi(timeInit, timeEnd, mongodbMetaData, response));

            (
                mongodbMetaData.verb === VerbEnumDto.DELETE_ONE ||
                mongodbMetaData.verb === VerbEnumDto.UPDATE_ONE ||
                mongodbMetaData.verb === VerbEnumDto.POST_ONE
            ) &&
            this.winston.audit(this.util.fnGetObjectLog_SuccessWithBody(timeInit, timeEnd, mongodbMetaData, response));
    }



    /**
     * 
     * @description
     * 
     * 
     * 
     * 
     */
    private logForErrorTransaction(
        mongodbMetaData: MongodbMetaDataDto,
        timeInit: number,
        timeEnd: number,
        fault: FaultDto): void{

            //
            (
                mongodbMetaData.verb === VerbEnumDto.DELETE_ONE ||
                mongodbMetaData.verb === VerbEnumDto.UPDATE_ONE ||
                mongodbMetaData.verb === VerbEnumDto.POST_ONE
            ) &&
            this.winston.audit(this.util.fnGetObjectLog_ErrorWithBody(timeInit, timeEnd, mongodbMetaData, fault));

            //
            (
                mongodbMetaData.verb === VerbEnumDto.GET_ALL ||
                mongodbMetaData.verb === VerbEnumDto.GET_BY_ID ||
                mongodbMetaData.verb === VerbEnumDto.GET_BY_PARAMS
            ) &&
            this.winston.audit(this.util.fnGetObjectLog_ErrorWithUrlApi(timeInit, timeEnd, mongodbMetaData, fault));
    }


    /**
     * 
     * @description
     * 
     * 
     * 
     * 
     */
    private fhThrowCustomFault(fault: FaultDto): void{

        //
        let code: number = fault.fault.httpStatusCode;
        switch(code){
            case(400):
                throw new BadRequestException(fault);
            case(500):
                throw new InternalServerErrorException(fault);
            case(503):
                throw new ServiceUnavailableException(fault);
            default:
                throw new InternalServerErrorException(fault);
        }
    }
}