import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigAppService } from './business-logic-resources/controller/ConfigApp.service';
import { TestObjectController } from './business-logic-resources/controller/TestObject.controller';
import { TransactionIdService } from './common-resources-mongodb/middleware/TransactionId.service';
import { MongodbModule } from './common-resources-mongodb/module-mongodb/Mongodb.module';


@Module({
    imports: [
        ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
        MongodbModule.register(),
    ],
    providers: [ConfigAppService],
    controllers: [TestObjectController],

})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TransactionIdService)
            .forRoutes(TestObjectController)
    }
}
