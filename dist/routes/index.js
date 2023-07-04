"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
let router = (0, express_1.Router)();
const objUsuarios = new controllers_1.default();
router.get('/usuarios', (req, res) => objUsuarios.traerUsuarios(req, res));
router.get('/usuario/:idUsuario', (req, res) => objUsuarios.traerUsuarioId(req, res));
router.post('/crearUsuario', (req, res) => objUsuarios.crearUsuario(req, res));
router.patch('/usuario/:idUsuario', (req, res) => objUsuarios.editarUsuario(req, res));
router.delete('/usuario/:idUsuario', (req, res) => objUsuarios.eliminarUsuario(req, res));
exports.default = router;
