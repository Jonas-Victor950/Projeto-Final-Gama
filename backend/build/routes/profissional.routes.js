"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ProfissionalController_1 = __importDefault(require("../controllers/ProfissionalController"));
var create_1 = __importDefault(require("../validations/profissionais/create"));
var routerProf = express_1.default.Router();
routerProf.get("/profissionais", ProfissionalController_1.default.allProfissionais);
routerProf.get("/profissionais/:id", ProfissionalController_1.default.getOneProfissional);
routerProf.post("/profissionais", create_1.default, ProfissionalController_1.default.createProfissional);
routerProf.put("/profissionais/:id", ProfissionalController_1.default.updateOneProfissional);
routerProf.delete("/profissionais/:id", ProfissionalController_1.default.deleteOneProfissional);
exports.default = routerProf;
