import { Router } from "express";
import Usuarios from "../controllers";

let router = Router();
const objUsuarios = new Usuarios();

router.get('/usuarios', (req, res) => objUsuarios.traerUsuarios(req, res));
router.get('/usuario/:idUsuario', (req, res) => objUsuarios.traerUsuarioId(req, res));
router.post('/crearUsuario', (req, res) => objUsuarios.crearUsuario(req, res));
router.patch('/usuario/:idUsuario', (req, res) => objUsuarios.editarUsuario(req,res));
router.delete('/usuario/:idUsuario', (req, res) => objUsuarios.eliminarUsuario(req, res));

export default router;