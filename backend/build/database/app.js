"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Conection_1 = __importDefault(require("./Conection"));
var mongoose_1 = __importDefault(require("mongoose"));
var default_1 = __importDefault(require("./default"));
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect("mongodb+srv://".concat(default_1.default.user, ":").concat(default_1.default.pass, "@cluster0.ve0zm2e.mongodb.net/?retryWrites=true&w=majority"));
var mongoDB = new Conection_1.default("mongodb+srv://".concat(default_1.default.user, ":").concat(default_1.default.pass, "@cluster0.ve0zm2e.mongodb.net/?retryWrites=true&w=majority"));
// const mongoDB = new Conection('mongodb://127.0.0.1:27017/beleza_na_agenda');
exports.default = mongoDB;
