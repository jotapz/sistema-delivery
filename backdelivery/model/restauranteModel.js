import db from '../config/db.js'; 


export const createService = async (nome, tipo_cozinha, telefone) => {
    const sql = "INSERT INTO Restaurante (nome, tipo_cozinha, telefone) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [nome, tipo_cozinha, telefone]);
    return result.insertId;
};


export const findAllService = async () => {
    const sql = "SELECT * FROM Restaurante";
    const [rows] = await db.query(sql);
    return rows;
};


export const findByIdService = async (id) => {
    const sql = "SELECT * FROM Restaurante WHERE restaurante_id = ?";
    const [rows] = await db.query(sql, [id]);
    return rows[0]; 
};


export const updateService = async (id, nome, tipo_cozinha, telefone) => {
    const sql = "UPDATE Restaurante SET nome = ?, tipo_cozinha = ?, telefone = ? WHERE restaurante_id = ?";
    const [result] = await db.query(sql, [nome, tipo_cozinha, telefone, id]);
    return result.affectedRows > 0;
};


export const deleteByIdService = async (id) => {
    const sql = "DELETE FROM Restaurante WHERE restaurante_id = ?";
    const [result] = await db.query(sql, [id]);
    return result.affectedRows > 0;
};

