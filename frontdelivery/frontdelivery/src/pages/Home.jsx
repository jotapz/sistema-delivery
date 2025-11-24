import { Link } from 'react-router-dom';

function Home() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-600 via-purple-100 to-purple-200 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-black bg-gradient-to-r from-white to-white bg-clip-text text-transparent mb-6">JLDelivery</h1>
          <p className="text-2xl text-gray-700 mb-8 font-semibold">Sua plataforma completa de delivery</p>
          <p className="text-lg text-gray-600 mb-12">Gerencie restaurantes, clientes e pedidos com facilidade e estilo.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Link to="/restaurantes" className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-56 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
              <h3 className="text-3xl font-bold text-white drop-shadow-lg">Restaurantes</h3>
            </Link>
            <Link to="/clientes" className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-56 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
              <h3 className="text-3xl font-bold text-white drop-shadow-lg">Clientes</h3>
            </Link>
            <Link to="/pedidos" className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-56 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
              <h3 className="text-3xl font-bold text-white drop-shadow-lg">Pedidos</h3>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;