import db from '../config/db.js';


export const findByEmail = async (email) => {
    const sql = "SELECT * FROM Funcionario WHERE email = ?";
    const [rows] = await db.query(sql, [email]);
    return rows[0];
};

export const createFuncionario = async (nome, email, senha) => {
    const sql = "INSERT INTO Funcionario (nome, email, senha) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [nome, email, senha]);
    return result.insertId;
};