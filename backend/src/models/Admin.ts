import { Schema, model} from "mongoose";

interface IAdmin {
    name: string;
    email: string;
    password: string;
}

const adminSchema = new Schema<IAdmin> ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
},
{
    timestamps: true,
});

const Admin = model<IAdmin>('Admin', adminSchema)

export default Admin