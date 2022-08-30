import { CreateDbConnectionDto } from "../dtos/CreateDbConnection.dto";

export const I_MONGO_DB = "I_MONGO_DB";

export interface MongodbInterface {
    customGetConnection(dbUrl: string, createDbConnectionDto: CreateDbConnectionDto): Promise<void>;
    customCloseConnection(): Promise<void>;
    customFind(mongooseModel: any): Promise<string>;
    customFindByParams(mongooseModel: any, paramsObjectDto: string): Promise<string>;
    customFindOne(bodyDto: string, mongooseModel: any): Promise<string>;
    customFindById(id: string, mongooseModel: any): Promise<string>;
    customSave(bodyDto: string, mongooseModel: any): Promise<string>;
    customDeleteOne(id: string, mongooseModel: any): Promise<string>;
    customUpdateOne(id: string, bodyDto: string, mongooseModel: any): Promise<string>;
}