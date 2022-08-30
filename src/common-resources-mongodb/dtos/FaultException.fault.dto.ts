import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";
import { DetailFaultDto } from "./Detail.fault.dto";

export class FaultExceptionDto {
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    transactionId?: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    timeStamp: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    httpStatusCode: number;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    message: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    layer: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    path: string;

    @ApiProperty({ type: DetailFaultDto })
    @IsDefined()
    @IsNotEmpty()
    detail: DetailFaultDto;
}