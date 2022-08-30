import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class LoggerDto {

    @IsDefined()
    @IsNotEmpty()
    applicationName: string;

    @IsDefined()
    @IsNotEmpty()
    methodName: string;

    @IsDefined()
    @IsNotEmpty()
    verb: string;

    @IsDefined()
    @IsNotEmpty()
    transactionId: string;

    @IsDefined()
    @IsNotEmpty()
    level: string;

    @IsDefined()
    @IsNotEmpty()
    layer: string;

    @IsDefined()
    @IsNotEmpty()
    message: string;

    @IsDefined()
    @IsNotEmpty()
    processingTime: number;

    @IsDefined()
    @IsNotEmpty()
    timestamp: string;

    @IsDefined()
    @IsNotEmpty()
    urlApi: string;

    @IsDefined()
    @IsNotEmpty()
    request: string;

    @IsDefined()
    @IsNotEmpty()
    response: string;

    @IsOptional()
    @IsNotEmpty()
    type?: string;
}