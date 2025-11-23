import { useState, useEffect } from 'react'
import axios from 'axios'

function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState([])
  
  // Estados form
  const [nome, setNome] = useState('')
  const [tipoCozinha, setTipoCozinha] = useState('')
  const [telefone, setTelefone] = useState('')
  
  // Modo edição
  const [editando, setEditando] = useState(null)

  // Busca os dados assim que a tela carrega
  useEffect(() => {
    carregarRestaurantes()
  }, [])

  const carregarRestaurantes = () => {
    axios.get('http://localhost:5001/restaurante')
      .then(response => {
        setRestaurantes(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar restaurantes:", error)
      })
  }

  const cadastrarRestaurante = (event) => {
    event.preventDefault()

    if (!nome) {
      alert("Por favor, preencha o nome do restaurante!")
      return
    }

    if (editando) {
      // Atualizar
      axios.put(`http://localhost:5001/restaurante/${editando}`, {
        nome: nome,
        tipo_cozinha: tipoCozinha,
        telefone: telefone
      })
      .then(() => {
        alert("Restaurante atualizado!")
        setNome('')
        setTipoCozinha('')
        setTelefone('')
        setEditando(null)
        carregarRestaurantes()
      })
      .catch(error => console.error("Erro:", error))
    } else {
      // Criar
      axios.post('http://localhost:5001/restaurante', {
        nome: nome,
        tipo_cozinha: tipoCozinha,
        telefone: telefone
      })
      .then(() => {
        alert("Restaurante cadastrado!")
        setNome('')
        setTipoCozinha('')
        setTelefone('')
        carregarRestaurantes()
      })
      .catch(error => console.error("Erro:", error))
    }
  }

  const editarRestaurante = (restaurante) => {
    setNome(restaurante.nome)
    setTipoCozinha(restaurante.tipo_cozinha)
    setTelefone(restaurante.telefone)
    setEditando(restaurante.restaurante_id)
  }

  const cancelarEdicao = () => {
    setNome('')
    setTipoCozinha('')
    setTelefone('')
    setEditando(null)
  }

  const deletarRestaurante = (id) => {
    if (window.confirm("Tem certeza que deseja deletar este restaurante?")) {
      axios.delete(`http://localhost:5001/restaurante/${id}`)
        .then(() => {
          alert("Restaurante deletado!")
          carregarRestaurantes()
        })
        .catch(error => console.error("Erro:", error))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-8">
      <h1 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        🍽️ Restaurantes
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-12 border-t-4 border-purple-500">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editando ? "Editar Restaurante" : "Novo Restaurante"}
        </h2>
        <form onSubmit={cadastrarRestaurante} className="flex flex-col gap-5">
          <input 
            type="text" placeholder="Nome do Restaurante" className="p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition font-semibold"
            value={nome} onChange={e => setNome(e.target.value)} required
          />
          <input 
            type="text" placeholder="Tipo de Cozinha" className="p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition font-semibold"
            value={tipoCozinha} onChange={e => setTipoCozinha(e.target.value)}
          />
          <input 
            type="text" placeholder="Telefone" className="p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition font-semibold"
            value={telefone} onChange={e => setTelefone(e.target.value)}
          />
          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-lg hover:shadow-lg font-bold transition duration-300 hover:scale-105">
              {editando ? "✏️ Atualizar" : "✓ Salvar"}
            </button>
            {editando && (
              <button type="button" onClick={cancelarEdicao} className="flex-1 bg-gray-400 text-white p-3 rounded-lg hover:shadow-lg font-bold transition duration-300 hover:scale-105">
                ✕ Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {restaurantes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">Nenhum restaurante cadastrado ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {restaurantes.map((restaurante) => (
            <div key={restaurante.restaurante_id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-purple-500">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{restaurante.nome}</h2>
                  <p className="text-purple-600 font-semibold text-sm mt-2">🍽️ {restaurante.tipo_cozinha || "Não informado"}</p>
                </div>
                <span className="text-2xl">🏠</span>
              </div>
              <p className="text-gray-600 flex items-center gap-2 mt-4 mb-6"><span className="text-lg">📞</span> {restaurante.telefone || "Não informado"}</p>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => editarRestaurante(restaurante)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg font-bold transition duration-300 hover:shadow-lg hover:scale-105"
                >
                  ✏️ Editar
                </button>
                <button 
                  onClick={() => deletarRestaurante(restaurante.restaurante_id)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg font-bold transition duration-300 hover:shadow-lg hover:scale-105"
                >
                  🗑️ Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Restaurantes;