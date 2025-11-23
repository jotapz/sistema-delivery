# 🛵 Delivery App - Full Stack Project

Um sistema completo de delivery de comida desenvolvido para gerenciar restaurantes, clientes e pedidos. O projeto foi estruturado para simular o fluxo real de um aplicativo de entregas, permitindo o cadastro de parceiros, criação de pedidos com múltiplos itens e o gerenciamento de status em tempo real.

## 🛠️ Tecnologias Utilizadas

### Frontend (Client-side)
* **React + Vite**: Framework para construção de interfaces rápidas e reativas.
* **Tailwind CSS**: Estilização moderna e responsiva.
* **Axios**: Cliente HTTP para comunicação com o Backend.
* **React Router Dom**: Gerenciamento de rotas e navegação (SPA).

### Backend (Server-side)
* **Node.js**: Ambiente de execução JavaScript.
* **Express**: Framework para criação da API REST.
* **MySQL (mysql2)**: Banco de dados relacional.
* **Arquitetura MVC**: Organização do código em Model, View e Controller.
* **Dotenv**: Gerenciamento de variáveis de ambiente.
* **Cors**: Configuração de segurança para acesso cross-origin.

---

## ✨ Funcionalidades

* ✅ **Gestão de Restaurantes:** Cadastro e listagem de parceiros e tipos de cozinha.
* ✅ **Gestão de Clientes:** Registro de usuários com endereço de entrega.
* ✅ **Criação de Pedidos**
* ✅ **Controle de Status**

---

## 📱 Guia de Uso (Passo a Passo)

Para testar o fluxo completo da aplicação, siga estas etapas na interface:

1.  **Cadastros Iniciais:**
    * Vá na aba **Restaurantes** e cadastre um novo estabelecimento.
    * Vá na aba **Clientes** e cadastre um cliente.

2.  **Realizar Pedido:**
    * Acesse a aba **Fazer Pedido**.
    * Selecione o Cliente e o Restaurante que você criou.
    * Adicione itens ao carrinho.
    * Clique em **Finalizar Pedido**.

3.  **Gerenciar Status:**
    * Após finalizar, o pedido aparecerá na lista "Pedidos em Andamento" com status **Em Preparo** (Amarelo).
    * Clique no botão **"Mandar Entregar"** para mudar o status para **A Caminho** (Azul).
    * Clique no botão **"Confirmar Entrega"** para finalizar como **Entregue** (Verde).

---

## 🗄️ Configuração do Banco de Dados

O projeto utiliza **MySQL**. Antes de rodar a aplicação, execute o script delivery.sql no seu MySQL Workbench ou terminal para criar a estrutura

---

### 👨‍💻 Autores

- **João Pedro Soares Franco** - [LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-pedro-franco-545436221/) - [GitHub](https://github.com/jotapz)
- **Lara Stephanny** - [LinkedIn](https://www.linkedin.com/in/lara-stephanny-0317a82b5/) - [GitHub](https://github.com/LaraSLGomes)


