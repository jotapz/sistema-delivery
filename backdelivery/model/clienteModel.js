import db from '../config/db.js'; 


export const createService = async (nome, telefone, endereco) => {
    const sql = "INSERT INTO Cliente (nome, telefone, endereco) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [nome, telefone, endereco]);
    return result.insertId;
};


export const findAllService = async () => {
    const sql = "SELECT * FROM Cliente";
    const [rows] = await db.query(sql);
    return rows;
};


export const findByIdService = async (id) => {
    const sql = "SELECT * FROM Cliente WHERE cliente_id = ?";
    const [rows] = await db.query(sql, [id]);
    return rows[0]; 
};


export const updateService = async (id, nome, telefone, endereco) => {
    const sql = "UPDATE Cliente SET nome = ?, telefone = ?, endereco = ? WHERE cliente_id = ?";
    const [result] = await db.query(sql, [nome, telefone, endereco, id]);
    return result.affectedRows > 0;
};


export const deleteByIdService = async (id) => {
    const sql = "DELETE FROM Cliente WHERE cliente_id = ?";
    const [result] = await db.query(sql, [id]);
    return result.affectedRows > 0;
};