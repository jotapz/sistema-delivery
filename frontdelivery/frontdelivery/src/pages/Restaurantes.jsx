import { useState, useEffect } from 'react'
import axios from 'axios'

function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState([])

  // Busca os dados assim que a tela carrega
  useEffect(() => {
    axios.get('http://localhost:5001/restaurante')
      .then(response => {
        setRestaurantes(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar restaurantes:", error)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-8">
      <h1 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        🍽️ Restaurantes
      </h1>

      {restaurantes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">Nenhum restaurante cadastrado ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {restaurantes.map((restaurante) => (
            <div key={restaurante.restaurante_id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-purple-500">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex-1">{restaurante.nome}</h2>
                <span className="text-2xl">🏠</span>
              </div>
              <p className="text-purple-600 font-semibold mb-4">🍽️ {restaurante.tipo_cozinha}</p>
              <p className="text-gray-600 flex items-center gap-2 mt-4"><span className="text-lg">📞</span> {restaurante.telefone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Restaurantes;