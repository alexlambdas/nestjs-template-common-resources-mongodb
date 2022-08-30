import { DynamicModule } from "@nestjs/common";
import { I_CIRCUIT_BREAKER } from "./CircuitBreaker.interface";
import { CircuitBreakerService } from "./CircuitBreaker.service";
import { ConfigAppService } from "./ConfigApp.service";

export class CircuitBreakerModule{
    static register(): DynamicModule {
        return {
            module: CircuitBreakerModule,
            providers: [
                {
                    useClass: CircuitBreakerService,
                    provide: I_CIRCUIT_BREAKER,
                },
                ConfigAppService,
            ],
            exports: [
                {
                    useClass: CircuitBreakerService,
                    provide: I_CIRCUIT_BREAKER,
                }
            ]
        }
    }
}