"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Agenda_1 = require("../models/Agenda");
var AgendaRepository = /** @class */ (function () {
    function AgendaRepository() {
    }
    AgendaRepository.prototype.criarAgenda = function (dados) {
        return Agenda_1.Agenda.create(dados);
    };
    AgendaRepository.prototype.listarAgenda = function () {
        return Agenda_1.Agenda.find();
    };
    AgendaRepository.prototype.listarAgendaId = function (id) {
        return Agenda_1.Agenda.findById(id);
    };
    AgendaRepository.prototype.atualizarAgenda = function (id, dados) {
        return Agenda_1.Agenda.findByIdAndUpdate(id, {
            $set: {
                profissionalServico: dados.profissionalServico,
                cliente: dados.cliente,
                data: dados.data,
            },
        });
    };
    AgendaRepository.prototype.deletarAgendar = function (id) {
        return Agenda_1.Agenda.findByIdAndDelete(id);
    };
    AgendaRepository.prototype.agendaProfissionais = function () {
        return Agenda_1.Agenda.aggregate([
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
    };
    //A URL para esta função é assim
    //http://127.0.0.1:3000/agendaprofissionaisdata/d1/'2022-12-20'/d2/'2023-01-30'
    //d1 é data inicial, d2 é a data final
    AgendaRepository.prototype.agendaProfissionaisData = function (d1, d2) {
        return Agenda_1.Agenda.aggregate([
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
                $match: {
                    $and: [
                        {
                            'A.data': {
                                $gte: d1,
                            },
                        },
                        {
                            'A.data': {
                                $lte: d2,
                            },
                        },
                    ],
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
    }; //Fim da agendaProfissionaisData
    //A URL para esta função é assim
    //http://127.0.0.1:3000/agendaclientesdata/d1/'2022-12-20'/d2/'2023-01-30'/cliId/63a629eb16f3bbe8d605eafd
    //d1 é data inicial, d2 é a data final, cliID é o ID do cliente que esta logado no sistema
    AgendaRepository.prototype.agendaClienteData = function (d1, d2, cliId) {
        return Agenda_1.Agenda.aggregate([
            {
                $project: {
                    _id: Number(0),
                    Ag: '$$ROOT',
                },
            },
            {
                $lookup: {
                    localField: 'Ag.cliente',
                    from: 'Cliente',
                    foreignField: '_id',
                    as: 'Cli',
                },
            },
            {
                $unwind: {
                    path: '$Cli',
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                $lookup: {
                    localField: 'Ag.profissionalServico',
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
                    localField: 'Ps.servico',
                    from: 'Servico',
                    foreignField: '_id',
                    as: 'Se',
                },
            },
            {
                $unwind: {
                    path: '$Se',
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                $lookup: {
                    localField: 'Ps.profissional',
                    from: 'Profissional',
                    foreignField: '_id',
                    as: 'Pr',
                },
            },
            {
                $unwind: {
                    path: '$Pr',
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                $match: {
                    $and: [
                        {
                            'Ag.data': {
                                $gte: d1,
                            },
                        },
                        {
                            'Ag.data': {
                                $lte: d2,
                            },
                        },
                        {
                            'Ag.cliente': cliId,
                        },
                    ],
                },
            },
            {
                $project: {
                    'Ag.cliente': '$Ag.cliente',
                    'Ag.profissionalServico': '$Ag.profissionalServico',
                    'Ag.data': '$Ag.data',
                    'Cli.nome': '$Cli.nome',
                    'Cli.email': '$Cli.email',
                    'Cli.telefone': '$Cli.telefone',
                    'Cli.aniversario': '$Cli.aniversario',
                    'Cli.sexo': '$Cli.sexo',
                    'Se.servico': '$Se.servico',
                    'Pr.nome': '$Pr.nome',
                    'Pr.telefone': '$Pr.telefone',
                    _id: Number(0),
                },
            },
        ]);
    };
    return AgendaRepository;
}());
exports.default = new AgendaRepository();
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
// return Agenda.find(
//       {
//         $and: [
//           {
//             data: {
//               $gte: d1,
//             },
//           },
//           {
//             data: {
//               $lte: d2,
//             },
//           },
//         ],
//       },
//       {
//         _id: '$_id',
//         cliente: '$cliente',
//         profissionalServico: '$profissionalServico',
//         data: '$data',
//       }
//     })
