import express from "express";
import { createCliente, getAllClientes, getClienteById, deleteCliente, updateCliente} from "../controller/clienteController.js";

const router = express.Router();

router.post("/", createCliente);
router.get("/", getAllClientes);
router.get("/:id", getClienteById);
router.put("/:id", updateCliente);
router.delete("/:id", deleteCliente);

export default router;