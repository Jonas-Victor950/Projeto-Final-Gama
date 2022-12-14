import { Schema, model, Types} from "mongoose";

interface IAgenda {
    profissionalServico: Types.ObjectId;
    cliente: Types.ObjectId;
    data: Date
}

const agendaSchema = new Schema<IAgenda>({
    profissionalServico: {type: Schema.Types.ObjectId, required: true, ref: "ProfissionalServico"},
    cliente: {type: Schema.Types.ObjectId, required: true, ref: "Cliente"},
    data: {type: Date, required: true},
}, {
    timestamps: true,
    collection: "Agenda"
})

const Agenda = model<IAgenda>('Agenda', agendaSchema)

export default Agenda