import { Schema, model} from "mongoose";

interface IClient {
    name: string;
    email: string;
    password: string;
}

const clientSchema = new Schema<IClient>({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
}, 
{
    timestamps: true,
});

const Client = model<IClient>('Client', clientSchema)

export default Client