import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty } from "class-validator";
import { FaultExceptionDto } from "./FaultException.fault.dto";

export class FaultDto {
    
    @ApiProperty({ type: FaultExceptionDto })
    @IsDefined()
    @IsNotEmpty()
    fault: FaultExceptionDto;
}