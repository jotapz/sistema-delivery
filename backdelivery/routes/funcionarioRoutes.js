import express from 'express';
import { login, registrar } from '../controller/funcionarioController.js';

const router = express.Router();


router.post("/login", login);
router.post("/registrar", registrar);

export default router;