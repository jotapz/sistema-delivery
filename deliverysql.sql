CREATE DATABASE delivery;

USE delivery;

SELECT*FROM Restaurante;
SELECT*FROM Cliente;
SELECT*FROM Pedido;
SELECT*FROM ItemPedido;



CREATE TABLE Cliente(
cliente_id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
telefone VARCHAR(100) NOT NULL,
endereco VARCHAR(100)
);

CREATE TABLE Restaurante(
restaurante_id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
tipo_cozinha VARCHAR(100),
telefone VARCHAR(100)
);

CREATE TABLE Pedido (
pedido_id INT PRIMARY KEY AUTO_INCREMENT,
cliente_id INT,
restaurante_id INT,
data_hora DATETIME,
status_pedido VARCHAR(100),
FOREIGN KEY (cliente_id) REFERENCES cliente(cliente_id),
FOREIGN KEY (restaurante_id) REFERENCES restaurante(restaurante_id)
);

CREATE TABLE ItemPedido(
item_id INT PRIMARY KEY AUTO_INCREMENT,
pedido_id INT,
descricao VARCHAR(100),
quantidade INT,
preco DECIMAL(10, 2),
FOREIGN KEY (pedido_id) REFERENCES pedido(pedido_id)
);