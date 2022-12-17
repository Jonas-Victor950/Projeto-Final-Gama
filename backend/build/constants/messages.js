"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MESSAGE = {
    ERROR: {
        PROFISSIONAIS: {
            NONE_PROFSSIONAL_UNTIL_NOW: "✖️ Nenhum profissional até o momento",
            PROFISSIONAL_NOT_FOUND: "✖️ Profissional não encontrado!"
        },
        SERVICOS: {
            NONE_SERVICO_UNTIL_NOW: "✖️ Nenhum serviço cadastrado até o momento",
            SERVICO_NOT_FOUND: "✖️ Serviço não encontrado!"
        },
        ERROR_CATCH: "✖️ Ops, deu ruim!",
        NOT_VALID_ID: "✖️ Eita! Informe um ID válido!"
    },
    SUCCESS: {
        PROFISSIONAIS: {
            PROFISSIONALS_FOUND: "✔️ Profissionais encontrados com sucesso!",
            PROFISSIONAL_FOUND: "✔️ Profissional encontrado com sucesso!",
            PROFISSIONAL_SENDING: "Mandando o profissional que foi pedido!",
            PROFISSIONAL_CREATED: "✔️ Profissional criado com sucesso!",
            PROFISSIONAL_UPDATED: "✔️ Profissional atualizado com sucesso!",
            PROFISSIONAL_DELETED: "✔️ Profissional excluído com sucesso!"
        },
        SERVICO: {
            SERVICO_SENDING: "Serviço atualizado com sucesso!",
            SERVICO_DELETED: "✔️ Serviço excluído com sucesso!"
        }
    }
};
exports.default = MESSAGE;
