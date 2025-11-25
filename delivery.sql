CREATE DATABASE delivery;
USE delivery;

-- Criar tabela Cliente
CREATE TABLE Cliente(
    cliente_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(100) NOT NULL,
    endereco VARCHAR(100)
);

-- Criar tabela Restaurante
CREATE TABLE Restaurante(
    restaurante_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    tipo_cozinha VARCHAR(100),
    telefone VARCHAR(100)
);

-- Criar tabela Pedido
CREATE TABLE Pedido (
    pedido_id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT,
    restaurante_id INT,
    data_hora DATETIME,
    status_pedido VARCHAR(100),
    FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id) ON DELETE CASCADE,
    FOREIGN KEY (restaurante_id) REFERENCES Restaurante(restaurante_id) ON DELETE CASCADE
);

-- Criar Tabela ItemPedido
CREATE TABLE ItemPedido(
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT,
    descricao VARCHAR(100),
    quantidade INT,
    preco DECIMAL(10, 2),
    FOREIGN KEY (pedido_id) REFERENCES Pedido(pedido_id) ON DELETE CASCADE
);


-- Tabela para criação de funcionário
-- Pode criar um funcionario por script INSERT INTO ou EndPoints no Postman
CREATE TABLE Funcionario (
    funcionario_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100)  NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);


-- Ver as tabelas
SELECT*FROM Cliente;
SELECT*FROM Restaurante;
SELECT*FROM Pedido;
SELECT*FROM ItemPedido;
SELECT*FROM Funcionario;
