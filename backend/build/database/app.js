"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Conection_1 = __importDefault(require("./Conection"));
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', true);
/*mongoose.connect(
 `mongodb+srv://${authDB.user}:${authDB.pass}@cluster0.ve0zm2e.mongodb.net/?retryWrites=true&w=majority`
);
const mongoDB = new Conection(
  `mongodb+srv://${authDB.user}:${authDB.pass}@cluster0.ve0zm2e.mongodb.net/?retryWrites=true&w=majority`
);*/
var mongoDB = new Conection_1.default('mongodb://127.0.0.1:27017/beleza_na_agenda');
exports.default = mongoDB;
