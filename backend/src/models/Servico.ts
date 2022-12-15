import { Schema, model, Types } from "mongoose";

interface IServico {
  servico: string;
  preco: string;
  duracao: string;
}

const servicoSchema = new Schema<IServico>(
  {
    servico: { type: String, required: true },
    preco: { type: String, required: true },
    duracao: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "Servico",
  }
);

const servico = model<IServico>("Servico", servicoSchema);

export default servico;
