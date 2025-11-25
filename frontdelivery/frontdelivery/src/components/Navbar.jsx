import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario_logado'));

  const sair = () => {
    localStorage.removeItem('usuario_logado');
    navigate('/login');
  }

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="flex items-center gap-2">
            <span className="text-2xl">🛵</span>
            <h1 className="text-white text-2xl font-bold">Delivery App</h1>
        </div>

        <ul className="flex gap-6 text-white font-semibold items-center">
          <li><Link to="/" className="hover:text-purple-200 transition">Início</Link></li>
          <li><Link to="/restaurantes" className="hover:text-purple-200 transition">Restaurantes</Link></li>
          <li><Link to="/clientes" className="hover:text-purple-200 transition">Clientes</Link></li>
          <li><Link to="/pedidos" className="bg-white text-purple-700 px-4 py-1 rounded-full hover:bg-gray-100 transition shadow">Pedidos</Link></li>
        
          <li className="ml-4 border-l pl-4 border-purple-400 flex gap-3 items-center">
            <span className="text-xs font-normal text-purple-200">Olá, {usuario?.nome}</span>
            <button onClick={sair} className="text-red-200 hover:text-white hover:bg-red-500/50 px-2 py-1 rounded transition text-sm">
                Sair 
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;