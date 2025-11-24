import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Restaurantes from './pages/Restaurantes';
import Clientes from './pages/Clientes';
import Pedidos from './pages/Pedidos';

function App() {
  return (
    <BrowserRouter>
      {}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;