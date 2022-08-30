import { DynamicModule, Module } from "@nestjs/common";
import { CircuitBreakerModule } from "../module-circuit-breaker/CircuitBreaker.module";
import { UtilitiesModule } from "../module-utilities/Utilities.module";
import { WinstonLoggerModule } from "../module-winston-logger/WinstonLogger.module";
import { I_CRUD } from "./Crud.interface";
import { CrudService } from "./Crud.service";
import { I_MONGO_DB } from "./Mongodb.interface";
import { MongodbService } from "./Mongodb.service";

@Module({})
export class MongodbModule{
    static register(): DynamicModule{
        return{
            module: MongodbModule,
            imports: [
                WinstonLoggerModule.register(),
                UtilitiesModule.register(),
                CircuitBreakerModule.register()
            ],
            providers: [
                {
                    useClass: MongodbService,
                    provide: I_MONGO_DB,
                },
                {
                    useClass: CrudService,
                    provide: I_CRUD,
                }
            ],
            exports: [
                {
                    useClass: CrudService,
                    provide: I_CRUD,
                }
            ]
        }
    }
}