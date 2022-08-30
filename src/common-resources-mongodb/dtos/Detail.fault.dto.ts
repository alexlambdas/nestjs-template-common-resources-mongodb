import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty } from "class-validator";

export class DetailFaultDto {
    
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    systemErrorHandler: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    originSystemError: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    originSystemErrorCode: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    originSystemErrorMessage: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    originSystemErrorDescription: any;
}