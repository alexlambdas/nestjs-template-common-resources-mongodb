import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomHttpExceptionFilter } from './common-resources-mongodb/exceptions/CustomHttpExceptionFilter';

async function bootstrap() {

    /**
	 * 
	 * @author alexLambdas
	 * @description
	 * 
	 */
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new CustomHttpExceptionFilter());


    /**
	 * 
	 * @author alexLambdas
	 * @description
	 * 
	 */
    await app.listen(3000);
}
bootstrap();
