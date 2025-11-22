import express from 'express';
import { createRestaurante, getAllRestaurante, getRestauranteById, updateRestaurante, deleteRestaurante} from '../controller/restauranteController.js'

const router = express.Router();

router.post("/", createRestaurante);
router.get("/", getAllRestaurante);
router.get("/:id", getRestauranteById);
router.put("/:id", updateRestaurante);
router.delete("/:id", deleteRestaurante);

export default router;