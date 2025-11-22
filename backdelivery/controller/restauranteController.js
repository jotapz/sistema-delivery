import { createService, findAllService, findByIdService, updateService, deleteByIdService } from "../model/restauranteModel.js"


export const createRestaurante = async (req, res) => {
    try {
        const { nome, tipo_cozinha, telefone } = req.body;

        if (!nome) {
            return res.status(400).json({ message: "O nome é obrigatório!" });
        }

        const novoId = await createService(nome, tipo_cozinha, telefone);

        res.status(201).json({ 
            message: "Restaurante criado com sucesso!", 
            id: novoId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar restaurante." });
    }
};


export const getAllRestaurante = async (req, res) => {
    try {
        const restaurantes = await findAllService();
        res.status(200).json(restaurantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar restaurantes." });
    }
};


export const getRestauranteById = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurante = await findByIdService(id);

        if (!restaurante) {
            return res.status(404).json({ message: "Restaurante não encontrado!" });
        }

        res.status(200).json(restaurante);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar restaurante." });
    }
};


export const updateRestaurante = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, tipo_cozinha, telefone } = req.body;

        const alterou = await updateService(id, nome, tipo_cozinha, telefone);

        if (!alterou) {
            return res.status(404).json({ message: "Restaurante não encontrado para atualizar." });
        }

        res.status(200).json({ message: "Restaurante atualizado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar restaurante." });
    }
};


export const deleteRestaurante = async (req, res) => {
    try {
        const { id } = req.params;

        const removeu = await deleteByIdService(id);

        if (!removeu) {
            return res.status(404).json({ message: "Restaurante não encontrado para deletar." });
        }

        res.status(200).json({ message: "Restaurante removido com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao deletar restaurante." });
    }
};

