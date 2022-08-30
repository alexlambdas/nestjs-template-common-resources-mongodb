import { MongodbMetaDataDto } from "../dtos/MongodbMetaData.dto";

export const I_CRUD = "I_CRUD";

export interface CrudInterface {
    crud(mongodbMetaData: MongodbMetaDataDto): Promise<string>;
}