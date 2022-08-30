import { Injectable } from "@nestjs/common";
import { CustomHttpHandlerExceptionDto } from "../dtos/CustomHttpHandlerException.dto";
import { CustomHttpHandlerException } from "../exceptions/CustomHttpHandlerException";
import { ConfigAppService } from "./ConfigApp.service";

@Injectable()
export class CircuitBreakerService {


    private _state: string;
    private _failureCount: number;
    private _successCount: number;
    private _nextAttempt: number;
    private _failureThreshold: number;
    private _successThreshold: number;
    private _timeOut: number;
    private _newTimeOut: boolean;
    private _customHttpHandlerException: CustomHttpHandlerExceptionDto;
     

    constructor(private configApp: ConfigAppService){

        this._state = this.configApp.circuitBreakerGreenState();
        this._failureCount = 0;
        this._successCount = 0;
        this._nextAttempt = Date.now();
        this._failureThreshold = this.configApp.circuitBreakerFailureThreshold();
        this._successThreshold = this.configApp.circuitBreakerSuccessThreshold();
        this._timeOut = this.configApp.circuitBreakerTimeout();
        this._newTimeOut = false;
     }
     

    public async exex(): Promise<void> {
        if(this._state === this.configApp.circuitBreakerRedState()){
            if(this._nextAttempt <= Date.now()){
                this._state = this.configApp.circuitBreakerYellowState();
                this._newTimeOut = false;
            }
            else{
                this._customHttpHandlerException = {
                    code: 503,
                    description: "CIRCUIT_BREAKER"
                };
                throw new CustomHttpHandlerException(this._customHttpHandlerException);
            }
        }
    }
 

    public async updateBreakerState(resultProcess: string): Promise<void> {
        if(resultProcess === "SUCCESS") this.success();
        if(resultProcess === "FAILURE") this.failure();
    }
 

    private async success(): Promise<void> {
        if(this._state === this.configApp.circuitBreakerYellowState()){
            this._successCount++;
            if(this._successCount > this._successThreshold){
                this._state = this.configApp.circuitBreakerGreenState();
                this._successCount = 0;
                this._failureCount = 0;
            }
        }
    }
 

    private async failure(): Promise<void> {
        this._failureCount++;
        if((this._failureCount > this._failureThreshold) && (this._newTimeOut === false)){
            this._state = this.configApp.circuitBreakerRedState();
            this._nextAttempt = Date.now() + this._timeOut;
            this._newTimeOut = true;
        }
    }
}