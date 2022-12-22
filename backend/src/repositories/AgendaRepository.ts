import mongoose, { ObjectId } from "mongoose";
import { Agenda, IAgenda } from "../models/Agenda";

class AgendaRepository {
    criarAgenda(dados: IAgenda) {
        return Agenda.create(dados);
    }

    listarAgenda() {
        return Agenda.find();
    }

    listarAgendaId(id: mongoose.Types.ObjectId) {
        return Agenda.findById(id);
    }

    atualizarAgenda(id: mongoose.Types.ObjectId, dados: IAgenda) {
        return Agenda.findByIdAndUpdate(
            id,
            {
                $set: {
                    profissionalServico: dados.profissionalServico,
                    cliente: dados.cliente,
                    data: dados.data,
                }
            }
        );
    }

    deletarAgendar(id: mongoose.Types.ObjectId) {
        return Agenda.findByIdAndDelete(id);
    }

}

export default new AgendaRepository();