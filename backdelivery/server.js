import express from 'express';
import cors from 'cors';
import restauranteRoutes from './routes/restauranteRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js'
import pedidoRoutes from './routes/pedidoRoutes.js'
import funcionarioRoutes from './routes/funcionarioRoutes.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


app.use("/restaurante", restauranteRoutes);
app.use("/cliente", clienteRoutes);
app.use("/pedido", pedidoRoutes);
app.use("/funcionario", funcionarioRoutes);



app.listen(port, () => {
    console.log(`Ta rodando no localhost ${port}`);
});