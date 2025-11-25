import { createPedidoService, findAllPedidosService, updateStatusService } from "../model/pedidoModel.js";

export const createPedido = async (req, res) => {
    try {
        const dadosPedido = req.body;

        if (!dadosPedido.cliente_id || !dadosPedido.restaurante_id || !dadosPedido.itens || dadosPedido.itens.length === 0) {
            return res.status(400).json({ message: "Dados incompletos. Informe cliente, restaurante e itens." });
        }

        const novoId = await createPedidoService(dadosPedido);

        res.status(201).json({ 
            message: "Pedido realizado com sucesso!", 
            pedido_id: novoId 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar pedido." });
    }
};

export const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await findAllPedidosService();
        res.status(200).json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar pedidos." });
    }
};


export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 

        const alterou = await updateStatusService(id, status);

        if (alterou) {
            res.status(200).json({ message: `Status atualizado para ${status}` });
        } else {
            res.status(404).json({ message: "Pedido não encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar status" });
    }
};