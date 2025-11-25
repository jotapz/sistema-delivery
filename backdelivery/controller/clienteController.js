import { createService, findAllService, findByIdService, updateService, deleteByIdService } from "../model/clienteModel.js";

export const createCliente = async (req, res) => {
    try {
        const { nome, telefone, endereco } = req.body;

        if (!nome || !telefone || !endereco) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        if(/[0-9]/.test(nome)){
            return res.status(400).json({message: "Erro: o nome não pode conter números!"})
        }

        if(/[a-zA-Z]/.test(nome)){
            return res.status(400).json ({message: "Erro: o telefone não pode conter letras!"})
        }

        const novoId = await createService(nome, telefone, endereco);

        res.status(201).json({ 
            message: "Cliente criado com sucesso!", 
            id: novoId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar cliente." });
    }
};

export const getAllClientes = async (req, res) => {
    try {
        const clientes = await findAllService();
        res.status(200).json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar clientes." });
    }
};

export const getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await findByIdService(id);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado!" });
        }

        res.status(200).json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar cliente." });
    }
};

export const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, telefone, endereco } = req.body;

        if(/[0-9]/.test(nome)){
            return res.status(400).json({message: "Erro: nome não pode conter números!"})
        }

        if(/[a-zA-Z]/.test(telefone)){
            return res.status(400).json({message: "Erro: telefone não pode conter letras!"})
        }

        const alterou = await updateService(id, nome, telefone, endereco);

        if (!alterou) {
            return res.status(404).json({ message: "Cliente não encontrado para atualizar." });
        }

        res.status(200).json({ message: "Cliente atualizado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar cliente." });
    }
};

export const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const removeu = await deleteByIdService(id);

        if (!removeu) {
            return res.status(404).json({ message: "Cliente não encontrado para deletar." });
        }

        res.status(200).json({ message: "Cliente removido com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao deletar cliente." });
    }
};