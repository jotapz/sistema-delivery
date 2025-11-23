import { Link } from 'react-router-dom';

function Home() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">JLDelivery</h1>
          <p className="text-2xl text-gray-700 mb-8 font-semibold">Sua plataforma completa de delivery</p>
          <p className="text-lg text-gray-600 mb-12">Gerencie restaurantes, clientes e pedidos com facilidade e estilo.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Link to="/restaurantes" className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold text-purple-600 mb-2">Restaurantes</h3>
              <p className="text-gray-600">Gerenciar seus restaurantes</p>
            </Link>
            
            <Link to="/clientes" className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-purple-600 mb-2">Clientes</h3>
              <p className="text-gray-600">Cadastrar e gerenciar clientes</p>
            </Link>
            
            <Link to="/pedidos" className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-4xl mb-4">🛵</div>
              <h3 className="text-xl font-bold text-purple-600 mb-2">Pedidos</h3>
              <p className="text-gray-600">Criar e acompanhar pedidos</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;