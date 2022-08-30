import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfigAppService{

    constructor(private configService: ConfigService){}

    public circuitBreakerFailureThreshold(): number {
        return parseInt(this.configService.get<string>('NODE_ENV_CIRCUIT_BREAKER_FAILURE_THRESHOLD'));
    }

    public circuitBreakerSuccessThreshold(): number {
        return parseInt(this.configService.get<string>('NODE_ENV_CIRCUIT_BREAKER_SUCCESS_THRESHOLD'));
    }

    public circuitBreakerTimeout(): number {
        return parseInt(this.configService.get<string>('NODE_ENV_CIRCUIT_BREAKER_TIMEOUT'));
    }
    
    public circuitBreakerGreenState(): string {
        return "GREEN";
    }

    public circuitBreakerRedState(): string {
        return "RED";
    }

    public circuitBreakerYellowState(): string {
        return "YELLOW";
    }
}