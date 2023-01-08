"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnauthorizedError_1 = require("express-jwt/dist/errors/UnauthorizedError");
var express_validation_1 = require("express-validation");
function handleError(error, req, res, next) {
    if (error instanceof express_validation_1.ValidationError) {
        return res.status(error.statusCode).json(error);
    }
    if (error instanceof UnauthorizedError_1.UnauthorizedError) {
        return res.status(error.status).json(error);
    }
    return res.status(500).json(error);
}
exports.default = handleError;
