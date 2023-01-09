import { Schema, model, Types } from "mongoose";

interface IProfissionalServico {
  profissional: Types.ObjectId;
  servico: Types.ObjectId;
}

const profissionalServicoSchema = new Schema<IProfissionalServico>(
  {
    profissional: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Profissional",
    },
    servico: { type: Schema.Types.ObjectId, required: true, ref: "Servico" },
  },
  {
    timestamps: true,
    collection: "ProfissionalServico",
  }
);

const profissionalServico = model<IProfissionalServico>(
  "ProfissionalServico",
  profissionalServicoSchema
);

export { profissionalServico, IProfissionalServico };
