import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty } from "class-validator";

export class TestObjectDto {

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    baseForm: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    pastSimple: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    pastParticiple: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    traduction: string;
}