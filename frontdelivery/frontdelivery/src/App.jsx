import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Restaurantes from './pages/Restaurantes';
import Clientes from './pages/Clientes';
import Pedidos from './pages/Pedidos';
import Login from './pages/FuncionarioLogin';


const ApenasLogado = ({ children }) => {
  const usuario = localStorage.getItem('usuario_logado');
  return usuario ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/*" element={
          <ApenasLogado>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurantes" element={<Restaurantes />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/pedidos" element={<Pedidos />} />
            </Routes>
          </ApenasLogado>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;