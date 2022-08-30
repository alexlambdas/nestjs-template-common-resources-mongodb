import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";
import { VerbEnumDto } from "./VerbEnum.dto";

export class MongodbMetaDataDto{
    
    @IsDefined()
    @IsNotEmpty()
    applicationName: string;


    @IsDefined()
    @IsNotEmpty()
    methodName: string;


    @IsDefined()
    @IsNotEmpty()
    backEndUrl: string;


    @IsDefined()
    @IsNotEmpty()
    timeout: number;

    @IsDefined()
    @IsNotEmpty()
    timeoutCircuitBreaker: number;


    @IsDefined()
    @IsNotEmpty()
    uuidv4: string;


    @IsDefined()
    @IsNotEmpty()
    verb: VerbEnumDto;


    @IsDefined()
    @IsNotEmpty()
    mongooseModel: any;


    @IsDefined()
    @IsNotEmpty()
    urlApi: string;


    @IsDefined()
    @IsNotEmpty()
    dbUsername: string;


    @IsDefined()
    @IsNotEmpty()
    dbPassword: string;


    @IsDefined()
    @IsNotEmpty()
    dbServerSelectionTimeoutMS: number;


    @IsDefined()
    @IsNotEmpty()
    mongooseId?: string;


    @IsOptional()
    @IsNotEmpty()
    body?: string;

    
    @IsOptional()
    @IsNotEmpty()
    paramsObject?: string;
}