"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conection_1 = __importDefault(require("./Conection"));
const mongoose_1 = __importDefault(require("mongoose"));
//import authDB from './default';
mongoose_1.default.set('strictQuery', true);
/*mongoose.connect(
  `mongodb+srv://${authDB.user}:${authDB.pass}@cluster0.mbitszy.mongodb.net/?retryWrites=true&w=majority`
);
const mongoDB = new Conection(
  `mongodb+srv://${authDB.user}:${authDB.pass}@cluster0.mbitszy.mongodb.net/?retryWrites=true&w=majority`
);*/
const mongoDB = new Conection_1.default("mongodb://localhost:27017/beleza_na_agenda");
exports.default = mongoDB;
