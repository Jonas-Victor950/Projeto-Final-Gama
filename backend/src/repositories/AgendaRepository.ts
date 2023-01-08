import mongoose, { ObjectId } from 'mongoose';
import { Agenda, IAgenda } from '../models/Agenda';

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
    return Agenda.findByIdAndUpdate(id, {
      $set: {
        profissionalServico: dados.profissionalServico,
        cliente: dados.cliente,
        data: dados.data,
      },
    });
  }

  deletarAgendar(id: mongoose.Types.ObjectId) {
    return Agenda.findByIdAndDelete(id);
  }

  agendaProfissionais() {
    return Agenda.aggregate([
      {
        $lookup: {
          from: 'ProfissionalServico',
          localField: 'profissionalServico',
          foreignField: '_id',
          as: 'Profissionais_Servico',
        },
      },
      {
        $unwind: '$Profissionais_Servico',
      },

      {
        $lookup: {
          from: 'Servico',
          localField: 'Profissionais_Servico.servico',
          foreignField: '_id',
          as: 'Servicos',
        },
      },
      {
        $unwind: '$Servicos',
      },

      {
        $lookup: {
          from: 'Cliente',
          localField: 'cliente',
          foreignField: '_id',
          as: 'Clientes',
        },
      },
      {
        $unwind: '$Clientes',
      },

      {
        $lookup: {
          from: 'Profissional',
          localField: 'Profissionais_Servico.profissional',
          foreignField: '_id',
          as: 'Profissionais',
        },
      },
    ]);
  }
}

export default new AgendaRepository();
