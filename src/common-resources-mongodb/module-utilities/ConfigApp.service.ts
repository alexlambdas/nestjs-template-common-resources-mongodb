import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigAppService {

    public loggerInfo(): string {
        return "info";
    }

    public loggerError(): string {
        return "error";
    }

    public connectionLayer(): string {
        return "CONNECTION_LAYER";
    }

    public successMessage(): string {
        return "successful mongodb call"
    }

    public errorMessage(): string {
        return "error mongodb";
    }

    public errorDescriptionCircuitBreaker(timeOutLimit: number): string {
        return `try again after ${timeOutLimit/1000} seconds`
    }

    public error(): string {
        return "error";
    }

    public systemErrorHandler(): string {
        return "openshift";
    }

    public originSystemError(origyn: string): string {
        if(origyn.toLowerCase() === "oc") return "openshift";
        if(origyn.toLowerCase() == "mongo") return "mongodb";
        return origyn.toLowerCase();
    }
}