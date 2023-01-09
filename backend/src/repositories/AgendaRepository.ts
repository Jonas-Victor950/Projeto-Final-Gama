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
        $project: {
          _id: Number(0),
          A: '$$ROOT',
        },
      },
      {
        $lookup: {
          localField: 'A.profissionalServico',
          from: 'ProfissionalServico',
          foreignField: '_id',
          as: 'Ps',
        },
      },
      {
        $unwind: {
          path: '$Ps',
          preserveNullAndEmptyArrays: false,
        },
      },

      {
        $lookup: {
          localField: 'A.cliente',
          from: 'Cliente',
          foreignField: '_id',
          as: 'C',
        },
      },
      {
        $unwind: {
          path: '$C',
          preserveNullAndEmptyArrays: false,
        },
      },

      {
        $lookup: {
          localField: 'Ps.servico',
          from: 'Servico',
          foreignField: '_id',
          as: 'S',
        },
      },
      {
        $unwind: {
          path: '$S',
          preserveNullAndEmptyArrays: false,
        },
      },

      {
        $lookup: {
          localField: 'Ps.profissional',
          from: 'Profissional',
          foreignField: '_id',
          as: 'P',
        },
      },
      {
        $unwind: {
          path: '$P',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          'A._id': '$A._id',
          'A.data': '$A.data',
          'A.profissional': '$A.profissional',
          'A.cliente': '$A.cliente',
          'Ps.profissional': '$Ps.profissional',
          'Ps.servico': '$Ps.servico',
          'C._id': '$C._id',
          'C.nome': '$C.nome',
          'C.email': '$C.email',
          'C.telefone': '$C.telefone',
          'C.aniversaro': '$C.aniversaro',
          'C.sexo': '$C.sexo',
          'S._id': '$S._id',
          'S.servico': '$S.servico',
          'P._id': '$P._id',
          'P.nome': '$P.nome',
          'P.email': '$P.email',
          'P.telefone': '$P.telefone',
          _id: Number(0),
        },
      },
    ]);
  }
}

export default new AgendaRepository();

// agendaProfissionais() {
//     return Agenda.aggregate([
//       {
//         $lookup: {
//           from: 'ProfissionalServico',
//           localField: 'profissionalServico',
//           foreignField: '_id',
//           as: 'Profissionais_Servico',
//         },
//       },
//       {
//         $unwind: '$Profissionais_Servico',
//       },

//       {
//         $lookup: {
//           from: 'Servico',
//           localField: 'Profissionais_Servico.servico',
//           foreignField: '_id',
//           as: 'Servicos',
//         },
//       },
//       {
//         $unwind: '$Servicos',
//       },

//       {
//         $lookup: {
//           from: 'Cliente',
//           localField: 'cliente',
//           foreignField: '_id',
//           as: 'Clientes',
//         },
//       },
//       {
//         $unwind: '$Clientes',
//       },

//       {
//         $lookup: {
//           from: 'Profissional',
//           localField: 'Profissionais_Servico.profissional',
//           foreignField: '_id',
//           as: 'Profissionais',
//         },
//       },
//     ]);
//   }
// }
