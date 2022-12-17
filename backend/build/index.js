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
// ENV variable
require("dotenv").config();
const handleError_1 = __importDefault(require("./middlewares/handleError"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app_1 = __importDefault(require("./database/app"));
const routes_1 = __importDefault(require("./routes"));
const logger_1 = __importDefault(require("./database/logger"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const port = 3000;
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use(routes_1.default);
        app.use(handleError_1.default);
        app.listen(port, () => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`🚀 Projeto rodando no endereço: http://127.0.0.1:${port}`);
            app_1.default.createConection();
        }));
    });
}
main().catch((error) => {
    logger_1.default.error("🥵 Erro!");
    logger_1.default.error(error);
});
