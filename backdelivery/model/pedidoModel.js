import db from '../config/db.js';

export const createPedidoService = async (dadosPedido) => {

    const sqlPedido = `
        INSERT INTO Pedido (cliente_id, restaurante_id, data_hora, status_pedido) 
        VALUES (?, ?, NOW(), 'Em Preparo')
    `;
    
    const [resultPedido] = await db.query(sqlPedido, [dadosPedido.cliente_id, dadosPedido.restaurante_id]);
    
    const novoPedidoId = resultPedido.insertId;

    for (const item of dadosPedido.itens) {
        const sqlItem = `
            INSERT INTO ItemPedido (pedido_id, descricao, quantidade, preco)
            VALUES (?, ?, ?, ?)
        `;
        await db.query(sqlItem, [novoPedidoId, item.descricao, item.quantidade, item.preco]);
    }

    return novoPedidoId;
};

export const findAllPedidosService = async () => {
    const sql = `
        SELECT p.pedido_id, p.data_hora, p.status_pedido, 
               c.nome AS nome_cliente, r.nome AS nome_restaurante
        FROM Pedido p
        JOIN Cliente c ON p.cliente_id = c.cliente_id
        JOIN Restaurante r ON p.restaurante_id = r.restaurante_id
        ORDER BY p.pedido_id DESC
    `;
    const [rows] = await db.query(sql);
    return rows;
};


export const updateStatusService = async (id, novoStatus) => {
    const sql = "UPDATE Pedido SET status_pedido = ? WHERE pedido_id = ?";
    const [result] = await db.query(sql, [novoStatus, id]);
    return result.affectedRows > 0;
};