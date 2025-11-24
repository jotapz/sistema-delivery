import { Link } from 'react-router-dom';
import logoJL from '../assets/jlvdd.png'; 

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <img src={logoJL} alt="Logo JL" className="h-10 w-auto object-contain drop-shadow-md"/>
          
          <h1 className="text-white text-2xl font-bold">JLDelivery</h1>
        </Link>

        <ul className="flex gap-8 text-white font-semibold">
          <li><Link to="/" className="hover:text-purple-200 transition duration-300">Home</Link></li>
          <li><Link to="/restaurantes" className="hover:text-purple-200 transition duration-300">Restaurantes</Link></li>
          <li><Link to="/clientes" className="hover:text-purple-200 transition duration-300">Clientes</Link></li>
          <li><Link to="/pedidos" className="transition duration-300 bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-purple-100 font-bold shadow-md hover:shadow-lg">Fazer Pedido</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;