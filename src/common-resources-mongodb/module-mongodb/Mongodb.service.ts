import * as mongoose from "mongoose";
import { CreateDbConnectionDto } from "../dtos/CreateDbConnection.dto";
import { CustomHttpHandlerException } from "../exceptions/CustomHttpHandlerException";
import { MongodbInterface } from "./Mongodb.interface";


/**
 * 
 * @author alexLambdas
 * @description
 * 
 * 
 */
export class MongodbService implements MongodbInterface{


    /**
     * 
     * @description  
     * 
     * 
     * 
     */
    async customGetConnection(dbUrl: string, createDbConnectionDto: CreateDbConnectionDto): Promise<void>{
        try{
            await mongoose.connect(dbUrl, {...createDbConnectionDto});
        }
        catch(errConnection){
            throw new CustomHttpHandlerException({ code: 500, description: errConnection });
        }
    }


    /**
     * 
     * @description  
     * 
     * 
     * 
     */
    async customCloseConnection(): Promise<void>{
        try{
            await mongoose.connection.close();
        }
        catch(errCloseConnection){
            throw new CustomHttpHandlerException({ code: 500, description: errCloseConnection });
        }
    }
    

    /**
     * 
     * @description  
     * 
     * 
     * 
     */
    async customFind(mongooseModel: any ): Promise<string> {
        try{
            return JSON.stringify(await mongooseModel.find());
        }
        catch(errCustomFind){
            throw new CustomHttpHandlerException({ code: 500, description: errCustomFind });
        }
    }


    /**
     * 
     * @description  
     * 
     * 
     * 
     */
    async customFindByParams(mongooseModel: any, paramsObjectDto: string): Promise<string> {
        try{
            return JSON.stringify(await mongooseModel.find(JSON.parse(paramsObjectDto)));
        }
        catch(errCustomFindByParams){
            throw new CustomHttpHandlerException({ code: 400, description: errCustomFindByParams});
        }
    }


    /**
     * 
     * @description  
     * 
     * 
     * 
     */
    async customFindOne(bodyDto: string, mongooseModel: any): Promise<string>{
        try{

            //
            const body: any = JSON.parse(bodyDto);

            //
            return JSON.stringify(await mongooseModel.findOne(body));
        }
        catch(errCustomFindOne){
            throw new CustomHttpHandlerException({ code: 400, description: errCustomFindOne });
        }
    }


    /**
     * 
     * @description  
     * 
     * 
     * 
     */
    async customSave(bodyDto: string, mongooseModel: any): Promise<string>{
        try{
            const body: any = JSON.parse(bodyDto);
            const doc = new mongooseModel({...body});
            return JSON.stringify(await doc.save());
        }
        catch(errCustomSave){
            throw new CustomHttpHandlerException({ code: 400, description: errCustomSave });
        }
    }


    /**
     * 
     * @description  
     * 
     * 
     * 
     */
    async customDeleteOne(id: string, mongooseModel: any): Promise<string>{
        try{
            const response: any = await mongooseModel.deleteOne({_id: id});
            if(response.deletedCount === 0) {
                throw new Error( `Doesn't exists id: ${id}`);
            }

            //
            return JSON.stringify(response);
        }
        catch(errCustomDelete){
            throw new CustomHttpHandlerException({ code: 400, description: errCustomDelete });
        }
    }


    /**
     * 
     * @description  
     * 
     * 
     * 
     */
    async customUpdateOne(id: string, bodyDto: string, mongooseModel: any): Promise<string>{
        try{
            const body: any = JSON.parse(bodyDto);
            const response: any = await mongooseModel.updateOne({_id: id}, {...body});
            if(response.modifiedCount === 0) {
                throw new Error( `Wrong update: ${id}. Doesn't exists the "id" or the "Body" hasn't changed`);
            }
            else{
                return JSON.stringify(response);
            }
        }
        catch(errCustomUpdateOne){
            throw new CustomHttpHandlerException({ code: 400, description: errCustomUpdateOne });
        }
    }

    
    /**
     * 
     * @description  
     * 
     * 
     * 
     */
    async customFindById(id: string, mongooseModel: any): Promise<string>{
        try{
            return JSON.stringify(await mongooseModel.findById(id));
        }
        catch(errCustomFindById){
            throw new CustomHttpHandlerException({ code: 400, description: errCustomFindById });
        }
    }
}