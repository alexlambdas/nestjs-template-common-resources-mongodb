import * as mongoose from "mongoose";

interface TestObjectInterfaceSchema extends mongoose.Document {
    baseForm: string,
    pastSimple: string,
    pastParticiple: string,
    traduction: string,
}

const TestObjectSchema = new mongoose.Schema(
    {
        baseForm: { type: String, required: true },
        pastSimple: { type: String, required: true },
        pastParticiple: { type: String, required: true },
        traduction: { type: String, required: true },
    },
    {
        collection: "TestObjectCollection"
    }
);

const TestObjectModel = mongoose.model<TestObjectInterfaceSchema>("IrregularVerbs", TestObjectSchema);

export default TestObjectModel;