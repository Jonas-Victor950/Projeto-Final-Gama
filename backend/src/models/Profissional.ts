import { Schema, model, ObjectId, isValidObjectId } from "mongoose";

interface IProfissional {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  sexo: string;
}

const profissionalSchema = new Schema<IProfissional>(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    telefone: { type: String, required: true },
    sexo: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "Profissional",
  }
);

const Profissional = model<IProfissional>("Profissional", profissionalSchema);

export { Profissional, IProfissional };
