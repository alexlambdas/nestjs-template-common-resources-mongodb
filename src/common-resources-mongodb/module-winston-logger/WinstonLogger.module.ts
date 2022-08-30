import { DynamicModule, Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { WinstonLoggerService } from "./WinstonLogger.service";
import * as winston from "winston";

@Module({})
export class WinstonLoggerModule{
    static register(): DynamicModule{
        return {
            module: WinstonLoggerModule,
            imports: [
                WinstonModule.forRoot({
                    transports: [
                        new winston.transports.Console({ format: winston.format.json() }),
                        //new winston.transports.File({filename: 'logs/example.log'})
                    ]
                })
            ],
            providers: [WinstonLoggerService],
            exports: [WinstonLoggerService],
        }
    }
}