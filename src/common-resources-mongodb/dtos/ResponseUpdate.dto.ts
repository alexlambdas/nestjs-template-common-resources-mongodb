import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class ResponseUpdateDto{

    @ApiPropertyOptional()
    @IsOptional()
    acknowledged: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    modifiedCount: number;

    @ApiPropertyOptional()
    @IsOptional()
    upsertedId: string;

    @ApiPropertyOptional()
    @IsOptional()
    upsertedCount: number;

    @ApiPropertyOptional()
    @IsOptional()
    matchedCount: number;
}