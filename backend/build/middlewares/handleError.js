"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validation_1 = require("express-validation");
function handleError(error, req, res, next) {
    if (error instanceof express_validation_1.ValidationError) {
        return res.status(error.statusCode).json(error);
    }
    return res.status(500).json(error);
}
exports.default = handleError;
