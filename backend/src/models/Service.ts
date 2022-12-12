import { Schema, model, Types} from "mongoose";

interface IService {
    professional: Types.ObjectId;
    client: Types.ObjectId;
    service: string;
}

const serviceSchema = new Schema<IService>({
    professional: {type: Schema.Types.ObjectId, required: true, ref: "Professional"},
    client: {type: Schema.Types.ObjectId, required: true, ref: "Client"},
    service: {type: String, required: true}
})