import { Link } from 'react-router-dom';
import logoJL from '../assets/jlvdd.png';
import restauranteImg from '../assets/restaurantes.png';
import clienteImg from '../assets/clientevdd.png';
import pedidosImg from '../assets/pedidos.png';
import fundoImg from '../assets/fundo.png';

function Home() {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center px-4 relative"
        style={{
            backgroundImage: `url(${fundoImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/90 via-purple-600/80 to-purple-400/90 z-0"></div>

        <div className="text-center max-w-4xl relative z-10">
          
          <img 
            src={logoJL} 
            alt="Logo JL Delivery" 
            className="w-80 mx-auto mb-2 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          />
          
          <p className="text-2xl text-white mb-8 font-semibold drop-shadow-md">Sua plataforma completa de delivery</p>
          <p className="text-lg text-purple-100 mb-12 drop-shadow-sm">Gerencie restaurantes, clientes e pedidos com facilidade e estilo.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Link to="/restaurantes" className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-72 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-4 group border border-purple-400/30">
              <img src={restauranteImg} alt="Restaurantes" className="h-32 w-auto object-contain mb-4 drop-shadow-md group-hover:scale-110 transition-transform duration-300"/>
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">Restaurantes</h3>
            </Link>
            
            <Link to="/clientes" className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-72 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-4 group border border-purple-400/30">
              <img src={clienteImg} alt="Clientes" className="h-32 w-auto object-contain mb-4 drop-shadow-md group-hover:scale-110 transition-transform duration-300"/>
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">Clientes</h3>
            </Link>
            
            <Link to="/pedidos" className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-72 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-4 group border border-purple-400/30">
              <img src={pedidosImg} alt="Pedidos" className="h-32 w-auto object-contain mb-4 drop-shadow-md group-hover:scale-110 transition-transform duration-300"/>
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">Pedidos</h3>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;