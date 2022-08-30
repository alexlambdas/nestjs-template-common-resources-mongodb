import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class ResponseDeleteDto{

    @ApiPropertyOptional()
    @IsOptional()
    acknowledged: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    deletedCount: number;
}