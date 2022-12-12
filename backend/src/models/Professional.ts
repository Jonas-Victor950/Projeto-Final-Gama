import { Schema, model} from "mongoose";

interface IProfessional {
    name: string;
    email: string;
    password: string;
}

const professionalSchema = new Schema<IProfessional>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
},
{
    timestamps: true
});

const Professional = model<IProfessional>('Professional', professionalSchema)

export default Professional