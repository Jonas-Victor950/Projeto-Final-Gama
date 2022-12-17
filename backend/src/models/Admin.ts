import { Schema, model } from "mongoose";

interface IAdmin {
  nome: string;
  email: string;
  senha: string;
}

const adminSchema = new Schema<IAdmin>(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "Admin",
  }
);

const Admin = model<IAdmin>("Admin", adminSchema);

export default Admin;
