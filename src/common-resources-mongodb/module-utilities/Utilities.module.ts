import { DynamicModule, Module } from "@nestjs/common";
import { ConfigAppService } from "./ConfigApp.service";
import { UtilitiesService } from "./Utilities.service";

@Module({})
export class UtilitiesModule{
    static register(): DynamicModule{
        return {
            module: UtilitiesModule,
            providers: [UtilitiesService, ConfigAppService],
            exports: [UtilitiesService],
        }
    }
}