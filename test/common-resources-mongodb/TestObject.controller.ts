import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request } from "express";
import { MongodbMetaDataDto } from "../../src/common-resources-mongodb/dtos/MongodbMetaData.dto";
import { ResponseDeleteDto } from "../../src/common-resources-mongodb/dtos/ResponseDelete.dto";
import { VerbEnumDto } from "../../src/common-resources-mongodb/dtos/VerbEnum.dto";
import { CustomHttpExceptionFilter } from "../../src/common-resources-mongodb/exceptions/CustomHttpExceptionFilter";
import { CrudInterface, I_CRUD } from "../../src/common-resources-mongodb/module-mongodb/Crud.interface";
import { ConfigAppService } from "./ConfigApp.service";
import { TestObjectDto } from "./dtos/TestObject.dto";
import { TestObjectQueryDto } from "./dtos/TestObjectQuery.dto";
import TestObjectModel from "./schemas/TestObjectModel.schema";



/**
 * 
 * @author alexLambdas
 * @description
 * 
 */
@Controller("/microservice/template/mongodb/crud")
export class TestObjectController{

    constructor(
        private configApp: ConfigAppService,
        @Inject(I_CRUD) private mongo: CrudInterface){}


    
    @Get("/GET_ALL")
    @UseFilters(CustomHttpExceptionFilter)
    @UsePipes(ValidationPipe)
    public async getAll(@Req() requestExpress: Request): Promise<TestObjectDto[]>{

        //
        let requestUrl = requestExpress.url.toString();
        let transactionId = String(requestExpress.headers.transactionid);
        let mongodbMetaData: MongodbMetaDataDto;
        let response: TestObjectDto[];

        //
        mongodbMetaData = {
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            backEndUrl: this.configApp.getUrlMongodb(),
            timeout: this.configApp.getTimeOutMongoDb(),
            timeoutCircuitBreaker: this.configApp.getTimeOutCircuitBreaker(),
            uuidv4: transactionId,
            verb: VerbEnumDto.GET_ALL,
            mongooseModel: TestObjectModel,
            urlApi: requestUrl,
            dbUsername: this.configApp.getUserMongodb(),
            dbPassword: this.configApp.getPasswordMongodb(),
            dbServerSelectionTimeoutMS: this.configApp.getTimeOutMongoDb(),
        };

        //
        response = JSON.parse(await this.mongo.crud(mongodbMetaData));

        //
        if(response.length === 0) response = [...response, {
            baseForm: undefined, 
            pastSimple: undefined,
            pastParticiple: undefined,
            traduction: undefined,
        }];

        //
        return response;
    }


    @Get("/GET_BY_ID/:id")
    @UseFilters(CustomHttpExceptionFilter)
    @UsePipes(ValidationPipe)
    public async getById(@Req() requestExpress: Request, @Param("id") id: string): Promise<TestObjectDto>{

        //
        let requestUrl = requestExpress.url.toString();
        let transactionId = String(requestExpress.headers.transactionid);
        let mongodbMetaData: MongodbMetaDataDto;
        let response: TestObjectDto;

        //
        mongodbMetaData = {
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            backEndUrl: this.configApp.getUrlMongodb(),
            timeout: this.configApp.getTimeOutMongoDb(),
            timeoutCircuitBreaker: this.configApp.getTimeOutCircuitBreaker(),
            uuidv4: transactionId,
            verb: VerbEnumDto.GET_BY_ID,
            mongooseModel: TestObjectModel,
            urlApi: requestUrl,
            dbUsername: this.configApp.getUserMongodb(),
            dbPassword: this.configApp.getPasswordMongodb(),
            dbServerSelectionTimeoutMS: this.configApp.getTimeOutMongoDb(),
            mongooseId: id,
        };

        //
        response = JSON.parse(await this.mongo.crud(mongodbMetaData));
        
        //
        if(response === null){
            response = {
                baseForm: undefined, 
                pastSimple: undefined,
                pastParticiple: undefined,
                traduction: undefined,
            }
        }
        
        //
        return response;
    }


    @Get("/GET_BY_PARAMS/")
    @UseFilters(CustomHttpExceptionFilter)
    @UsePipes(ValidationPipe)
    public async getByParams(@Req() requestExpress: Request, @Query() queryParams: TestObjectQueryDto): Promise<TestObjectDto>{

        //
        let requestUrl = requestExpress.url.toString();
        let transactionId = String(requestExpress.headers.transactionid);
        let mongodbMetaData: MongodbMetaDataDto;
        let response: TestObjectDto;

        //
        mongodbMetaData = {
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            backEndUrl: this.configApp.getUrlMongodb(),
            timeout: this.configApp.getTimeOutMongoDb(),
            timeoutCircuitBreaker: this.configApp.getTimeOutCircuitBreaker(),
            uuidv4: transactionId,
            verb: VerbEnumDto.GET_BY_PARAMS,
            mongooseModel: TestObjectModel,
            urlApi: requestUrl,
            dbUsername: this.configApp.getUserMongodb(),
            dbPassword: this.configApp.getPasswordMongodb(),
            dbServerSelectionTimeoutMS: this.configApp.getTimeOutMongoDb(),
            paramsObject: JSON.stringify(queryParams),
        };

        //
        response = JSON.parse(await this.mongo.crud(mongodbMetaData));

        //
        return response;
    }

    @Post("/POST")
    @UseFilters(CustomHttpExceptionFilter)
    @UsePipes(ValidationPipe)
    public async postOne(@Req() requestExpress: Request, @Body() bodyDto: TestObjectDto): Promise<TestObjectDto>{

        //
        let requestUrl = requestExpress.url.toString();
        let transactionId = String(requestExpress.headers.transactionid);
        let mongodbMetaData: MongodbMetaDataDto;
        let response: TestObjectDto;

        //
        mongodbMetaData = {
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            backEndUrl: this.configApp.getUrlMongodb(),
            timeout: this.configApp.getTimeOutMongoDb(),
            timeoutCircuitBreaker: this.configApp.getTimeOutCircuitBreaker(),
            uuidv4: transactionId,
            verb: VerbEnumDto.POST_ONE,
            mongooseModel: TestObjectModel,
            urlApi: requestUrl,
            dbUsername: this.configApp.getUserMongodb(),
            dbPassword: this.configApp.getPasswordMongodb(),
            dbServerSelectionTimeoutMS: this.configApp.getTimeOutMongoDb(),
            body: JSON.stringify(bodyDto),
        };

        //
        response = JSON.parse(await this.mongo.crud(mongodbMetaData));

        //
        return response;
    }

    @Delete("/DELETE_ONE/:id")
    @UseFilters(CustomHttpExceptionFilter)
    @UsePipes(ValidationPipe)
    public async delOne(@Req() requestExpress: Request, @Param("id") id: string): Promise<ResponseDeleteDto>{

        //
        let requestUrl = requestExpress.url.toString();
        let transactionId = String(requestExpress.headers.transactionid);
        let mongodbMetaData: MongodbMetaDataDto;
        let response: ResponseDeleteDto;

        //
        mongodbMetaData = {
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            backEndUrl: this.configApp.getUrlMongodb(),
            timeout: this.configApp.getTimeOutMongoDb(),
            timeoutCircuitBreaker: this.configApp.getTimeOutCircuitBreaker(),
            uuidv4: transactionId,
            verb: VerbEnumDto.DELETE_ONE,
            mongooseModel: TestObjectModel,
            urlApi: requestUrl,
            dbUsername: this.configApp.getUserMongodb(),
            dbPassword: this.configApp.getPasswordMongodb(),
            dbServerSelectionTimeoutMS: this.configApp.getTimeOutMongoDb(),
            mongooseId: id,
        };

        //
        response = JSON.parse(await this.mongo.crud(mongodbMetaData));
        
        //
        return response;
    }


    @Put("UPDATE_ONE/:id")
    @UseFilters(CustomHttpExceptionFilter)
    @UsePipes(ValidationPipe)
    public async updateOne(@Req() requestExpress: Request, @Param("id") id: string, @Body() bodyDto: TestObjectDto): Promise<TestObjectDto>{

        //
        let requestUrl = requestExpress.url.toString();
        let transactionId = String(requestExpress.headers.transactionid);
        let mongodbMetaData: MongodbMetaDataDto;
        let response: TestObjectDto;

        //
        mongodbMetaData = {
            applicationName: this.configApp.getApplicationName(),
            methodName: this.configApp.getMethodName(),
            backEndUrl: this.configApp.getUrlMongodb(),
            timeout: this.configApp.getTimeOutMongoDb(),
            timeoutCircuitBreaker: this.configApp.getTimeOutCircuitBreaker(),
            uuidv4: transactionId,
            verb: VerbEnumDto.UPDATE_ONE,
            mongooseModel: TestObjectModel,
            urlApi: requestUrl,
            dbUsername: this.configApp.getUserMongodb(),
            dbPassword: this.configApp.getPasswordMongodb(),
            dbServerSelectionTimeoutMS: this.configApp.getTimeOutMongoDb(),
            body: JSON.stringify(bodyDto),
            mongooseId: id,
        };

        //
        response = JSON.parse(await this.mongo.crud(mongodbMetaData));

        //
        return response;
    }
    
}