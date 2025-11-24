import { useState, useEffect } from 'react'
import axios from 'axios'

function Clientes() {
  const [clientes, setClientes] = useState([])
  
  // estados form
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')

  // buscar 
  const carregarClientes = () => {
    axios.get('http://localhost:5001/cliente')
      .then(response => setClientes(response.data))
      .catch(error => console.error("Erro:", error))
  }

  useEffect(() => {
    carregarClientes()
  }, [])

  // cadastrar
  const cadastrarCliente = (event) => {
    event.preventDefault()

    axios.post('http://localhost:5001/cliente', {
      nome: nome,
      telefone: telefone,
      endereco: endereco
    })
    .then(() => {
      alert("Cliente cadastrado!")
      setNome('')
      setTelefone('')
      setEndereco('')
      carregarClientes()
    })
    .catch(error => console.error("Erro:", error))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-purple-100 to-purple-200 p-8">
      <h1 className="text-4xl font-black text-center mb-12 text-white">
        👥 Gerenciar Clientes
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-12 border-t-4 border-purple-500">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Novo Cliente</h2>
        <form onSubmit={cadastrarCliente} className="flex flex-col gap-5">
          <input 
            type="text" placeholder="Nome Completo" className="p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition font-semibold"
            value={nome} onChange={e => setNome(e.target.value)} required
          />
          <input 
            type="text" placeholder="Telefone" className="p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition font-semibold"
            value={telefone} onChange={e => setTelefone(e.target.value)}
          />
          <input 
            type="text" placeholder="Endereço Completo" className="p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition font-semibold"
            value={endereco} onChange={e => setEndereco(e.target.value)} required
          />
          <button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-lg hover:shadow-lg font-bold transition duration-300 hover:scale-105">
            ✓ Salvar Cliente
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {clientes.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <p className="text-xl text-gray-500">Nenhum cliente cadastrado ainda.</p>
          </div>
        ) : (
          clientes.map((cliente) => (
            <div key={cliente.cliente_id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-purple-500">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{cliente.nome}</h2>
              <p className="text-gray-600 flex items-center gap-2 mt-2"><span className="text-lg">📍</span> {cliente.endereco}</p>
              <p className="text-gray-600 flex items-center gap-2 mt-2"><span className="text-lg">📞</span> {cliente.telefone}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Clientes