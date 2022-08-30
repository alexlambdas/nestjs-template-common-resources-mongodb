export const I_CIRCUIT_BREAKER = "I_CIRCUIT_BREAKER";

export interface CircuitBreakerInterface{
    exex(): Promise<void>;
    updateBreakerState(resultProcess: string): Promise<void>;
}