import { useState, useEffect } from 'react'
import axios from 'axios'
import fundoImg from '../assets/fundo.png'

function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState([])
  
  const [nome, setNome] = useState('')
  const [tipoCozinha, setTipoCozinha] = useState('')
  const [telefone, setTelefone] = useState('')
  
  const [editando, setEditando] = useState(null)

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
    <div 
      className="min-h-screen p-8 relative"
      style={{
        backgroundImage: `url(${fundoImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800/90 via-purple-600/80 to-purple-400/90 z-0"></div>

      <div className="relative z-10">
        <h1 className="text-4xl font-black text-center mb-12 text-white drop-shadow-md">
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
                {editando && (
                    <button type="button" onClick={cancelarEdicao} className="flex-1 bg-gray-400 text-white p-3 rounded-lg hover:shadow-lg font-bold transition duration-300 hover:scale-105">
                    Cancelar
                    </button>
                )}
              <button type="submit" className={`flex-1 text-white p-3 rounded-lg hover:shadow-lg font-bold transition duration-300 hover:scale-105 ${editando ? 'bg-orange-500' : 'bg-gradient-to-r from-purple-600 to-indigo-600'}`}>
                {editando ? "↻ Atualizar Restaurante" : "✓ Salvar Restaurante"}
              </button>
            </div>
          </form>
        </div>

        {restaurantes.length === 0 ? (
          <div className="text-center py-16 bg-white/10 rounded-xl backdrop-blur-sm max-w-2xl mx-auto">
            <p className="text-xl text-white font-semibold">Nenhum restaurante cadastrado ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {restaurantes.map((restaurante) => (
              <div key={restaurante.restaurante_id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-purple-500 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">{restaurante.nome}</h2>
                    <p className="text-gray-600 flex items-center gap-2 mt-2"><span className="text-lg">🍽️</span> {restaurante.tipo_cozinha || "Não informado"}</p>
                    <p className="text-gray-600 flex items-center gap-2 mt-2"><span className="text-lg">📞</span> {restaurante.telefone || "Não informado"}</p>
                </div>
                
                {/* aqui deixei igual o botao do cliente pq tava diferente*/}
                <div className="mt-6 flex justify-end gap-3 border-t pt-4">
                  <button 
                    onClick={() => editarRestaurante(restaurante)}
                    className="text-purple-600 font-bold hover:bg-purple-50 px-3 py-1 rounded transition"
                  >
                     ✎ Editar
                  </button>
                  <button 
                    onClick={() => deletarRestaurante(restaurante.restaurante_id)}
                    className="text-red-500 font-bold hover:bg-red-50 px-3 py-1 rounded transition"
                  >
                     ✕ Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Restaurantes;