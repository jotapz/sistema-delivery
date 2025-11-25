import { useState, useEffect } from 'react'
import axios from 'axios'
import fundoImg from '../assets/fundo.png'

function Clientes() {
  const [clientes, setClientes] = useState([])
  const [idEmEdicao, setIdEmEdicao] = useState(null)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')

  const carregarClientes = () => {
    axios.get('http://localhost:5001/cliente')
      .then(response => setClientes(response.data))
      .catch(error => console.error("Erro:", error))
  }

  useEffect(() => {
    carregarClientes()
  }, [])

  const salvarCliente = (event) => {
    event.preventDefault()

    if (/[0-9]/.test(nome)) {
        alert("Atenção: O Nome não pode conter números!")
        return
    }

    if (/[a-zA-Z]/.test(telefone)) {
        alert("Atenção: O Telefone não pode conter letras!")
        return
    }

    if (idEmEdicao) {
        axios.put(`http://localhost:5001/cliente/${idEmEdicao}`, {
            nome, telefone, endereco
        })
        .then(() => {
            alert("Cliente atualizado com sucesso!")
            limparFormulario()
            carregarClientes()
        })
        .catch(error => console.error("Erro ao atualizar:", error))
    } else {
        axios.post('http://localhost:5001/cliente', {
            nome, telefone, endereco
        })
        .then(() => {
            alert("Cliente cadastrado!")
            limparFormulario()
            carregarClientes()
        })
        .catch(error => console.error("Erro ao criar:", error))
    }
  }

  const editarCliente = (cliente) => {
      setIdEmEdicao(cliente.cliente_id)
      setNome(cliente.nome)
      setTelefone(cliente.telefone)
      setEndereco(cliente.endereco)
  }

  const excluirCliente = (id) => {
      if(confirm("Tem certeza que deseja excluir este cliente?")) {
          axios.delete(`http://localhost:5001/cliente/${id}`)
          .then(() => carregarClientes())
          .catch(error => console.error("Erro ao deletar:", error))
      }
  }

  const limparFormulario = () => {
      setIdEmEdicao(null)
      setNome('')
      setTelefone('')
      setEndereco('')
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
          👥 Clientes
        </h1>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-12 border-t-4 border-purple-500">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {idEmEdicao ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          
          <form onSubmit={salvarCliente} className="flex flex-col gap-5">
            <div>
                <input 
                  type="text" 
                  placeholder="Nome Completo" 
                  className={`w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition font-semibold bg-white}`}
                  value={nome} 
                  onChange={e => setNome(e.target.value)} required
                  />
            </div>

            <input 
              type="text" placeholder="Telefone" className="p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition font-semibold"
              value={telefone} onChange={e => setTelefone(e.target.value)} required
            />
            <input 
              type="text" placeholder="Endereço Completo" className="p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition font-semibold"
              value={endereco} onChange={e => setEndereco(e.target.value)} required
            />
            
            <div className="flex gap-3">
                {idEmEdicao && (
                    <button 
                        type="button" 
                        onClick={limparFormulario}
                        className="bg-gray-400 text-white p-3 rounded-lg hover:shadow-lg font-bold transition duration-300 hover:scale-105 flex-1"
                    >
                        Cancelar
                    </button>
                )}
                
                <button 
                    type="submit" 
                    className={`text-white p-3 rounded-lg hover:shadow-lg font-bold transition duration-300 hover:scale-105 flex-1 ${idEmEdicao ? 'bg-orange-500' : 'bg-gradient-to-r from-purple-600 to-indigo-600'}`}
                >
                    {idEmEdicao ? '↻ Atualizar Dados' : '✓ Salvar Cliente'}
                </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {clientes.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-xl text-white font-semibold">Nenhum cliente cadastrado ainda.</p>
            </div>
          ) : (
            clientes.map((cliente) => (
              <div key={cliente.cliente_id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-purple-500 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">{cliente.nome}</h2>
                    <p className="text-gray-600 flex items-center gap-2 mt-2"><span className="text-lg">📍</span> {cliente.endereco}</p>
                    <p className="text-gray-600 flex items-center gap-2 mt-2"><span className="text-lg">📞</span> {cliente.telefone}</p>
                </div>
                
                <div className="mt-6 flex justify-end gap-3 border-t pt-4">
                    <button 
                        onClick={() => editarCliente(cliente)}
                        className="text-purple-600 font-bold hover:bg-purple-50 px-3 py-1 rounded transition"
                    >
                        ✎ Editar
                    </button>
                    <button 
                        onClick={() => excluirCliente(cliente.cliente_id)}
                        className="text-red-500 font-bold hover:bg-red-50 px-3 py-1 rounded transition"
                    >
                        ✕ Excluir
                    </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Clientes