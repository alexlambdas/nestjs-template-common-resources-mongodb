import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfigAppService{


    constructor(private configService: ConfigService){}

    public loggerInfo(): string {
        return "info";
    }

    public loggerError(): string {
        return "error";
    }

    public controllerLayer(): string {
        return "CONTROLLER_LAYER";
    }

    public successMessage(): string {
        return "successful mongodb call"
    }

    public getApplicationName(): string {
        return this.configService.get<string>('NODE_ENV_APPLICATION_NAME');
    }

    public getMethodName(): string {
        return this.configService.get<string>('NODE_ENV_METHOD_NAME');
    }

    public getTimeOutMongoDb(): number {
        return parseInt(this.configService.get<string>('NODE_ENV_TIMEOUT_MONGO_DB'));
    }

    public getTimeOutCircuitBreaker(): number {
        return parseInt(this.configService.get<string>('NODE_ENV_CIRCUIT_BREAKER_TIMEOUT'));
    }

    public getUserMongodb(): string {
        return this.configService.get<string>('NODE_ENV_USER_MONGO_DB');
    }

    public getPasswordMongodb(): string {
        return this.configService.get<string>('NODE_ENV_PASS_MONGO_DB');
    }

    public getUrlMongodb(): string {
        return this.configService.get<string>('NODE_ENV_URL_MONGO_DB');
    }
}