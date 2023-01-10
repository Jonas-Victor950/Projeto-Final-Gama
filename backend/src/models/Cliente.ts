import { Schema, model } from "mongoose";

interface ICliente {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  aniversario: string;
  sexo: string;
}

const clienteSchema = new Schema<ICliente>(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    telefone: { type: String, required: true },
    aniversario: { type: String, required: true },
    sexo: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "Cliente",
  }
);

const Cliente = model<ICliente>("Cliente", clienteSchema);

export { Cliente, ICliente };
