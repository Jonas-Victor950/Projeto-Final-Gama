"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
var mongoose_1 = require("mongoose");
var adminSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
}, {
    timestamps: true,
    collection: "Admin",
});
var Admin = (0, mongoose_1.model)("Admin", adminSchema);
exports.Admin = Admin;
