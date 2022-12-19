"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const logger_1 = __importDefault(require("./logger"));
class Conection {
    constructor(db_conection_string) {
        this.db_conection_string = db_conection_string;
    }
    createConection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, mongoose_1.connect)(this.db_conection_string);
                logger_1.default.info('😄 Conectado com sucesso ao banco de dados!');
            }
            catch (error) {
                logger_1.default.error('😕 Falha ao conectar ao banco de dados.');
            }
        });
    }
}
exports.default = Conection;
// import { Sequelize } from "sequelize";
// import authDB from "./default";
// export const db: Sequelize = new Sequelize(
// authDB.database,
// authDB.user,
// authDB.pass,
// {
//     host: authDB.host,
//     dialect: 'mysql',
//     logging: console.log
// }
// );
