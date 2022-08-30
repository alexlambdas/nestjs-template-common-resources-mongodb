import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TransactionIdService } from "../../src/common-resources-mongodb/middleware/TransactionId.service";
import { CircuitBreakerModule } from "../../src/common-resources-mongodb/module-circuit-breaker/CircuitBreaker.module";
import { I_CRUD } from "../../src/common-resources-mongodb/module-mongodb/Crud.interface";
import { CrudService } from "../../src/common-resources-mongodb/module-mongodb/Crud.service";
import { I_MONGO_DB } from "../../src/common-resources-mongodb/module-mongodb/Mongodb.interface";
import { UtilitiesModule } from "../../src/common-resources-mongodb/module-utilities/Utilities.module";
import { WinstonLoggerModule } from "../../src/common-resources-mongodb/module-winston-logger/WinstonLogger.module";
import { ConfigAppService } from "./ConfigApp.service";
import { MockMongodbService } from "./MockMongodb.service";
import { TestObjectController } from "./TestObject.controller";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        WinstonLoggerModule.register(),
        UtilitiesModule.register(),
        CircuitBreakerModule.register(),
    ],
    providers: [
        {
            useClass: MockMongodbService,
            provide: I_MONGO_DB,
        },
        {
            useClass: CrudService,
            provide: I_CRUD,
        },
        ConfigAppService,
    ],
    controllers: [TestObjectController]
})
export class MockMongodbModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TransactionIdService)
            .forRoutes(TestObjectController)
    }
}