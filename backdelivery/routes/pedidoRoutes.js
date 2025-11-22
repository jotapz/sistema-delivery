import express from 'express';
import { createPedido, getAllPedidos, updateStatus } from '../controller/pedidoController.js';

const router = express.Router();

router.post("/", createPedido);
router.get("/", getAllPedidos);
router.put("/:id/status", updateStatus);

export default router;