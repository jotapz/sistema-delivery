import { findByEmail, createFuncionario } from "../model/funcionarioModel.js";


export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const funcionario = await findByEmail(email);
        if (!funcionario || funcionario.senha !== senha) {
            return res.status(401).json({ message: "Email ou senha incorretos!" });
        }

        res.status(200).json({ 
            message: "Login realizado com sucesso!", funcionario: { 
                id: funcionario.funcionario_id, nome: funcionario.nome, email: funcionario.email 
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
};



// registrei funcionarios pelo postman pra nao criar um registrar funcionario no site
export const registrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: "Preencha todos os campos!" });
        }

        if(/[0-9]/.test(nome)){
            return res.status(400),sjon({ message: "Erro: não pode ter número no nome!"});
        }

        const jaExiste = await findByEmail(email);
        if (jaExiste) {
            return res.status(409).json({ message: "Este email já está em uso!" });
        }
        const novoId = await createFuncionario(nome, email, senha);

        res.status(201).json({ 
            message: "Funcionário cadastrado com sucesso!",
            id: novoId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao cadastrar funcionário" });
    }
};