import { useState, useEffect } from 'react'
import axios from 'axios'

function Pedidos() {
  const [listaClientes, setListaClientes] = useState([])
  const [listaRestaurantes, setListaRestaurantes] = useState([])
  const [pedidosRealizados, setPedidosRealizados] = useState([])

  const [clienteSelecionado, setClienteSelecionado] = useState('')
  const [restauranteSelecionado, setRestauranteSelecionado] = useState('')
  const [descricaoItem, setDescricaoItem] = useState('')
  const [qtdItem, setQtdItem] = useState(1)
  const [precoItem, setPrecoItem] = useState('')
  const [itensPedido, setItensPedido] = useState([])

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = () => {
    axios.get('http://localhost:5001/cliente').then(res => setListaClientes(res.data))
    axios.get('http://localhost:5001/restaurante').then(res => setListaRestaurantes(res.data))

    axios.get('http://localhost:5001/pedido').then(res => setPedidosRealizados(res.data))
  }

  const adicionarItem = (e) => {
    e.preventDefault()
    if (!descricaoItem || !precoItem) { alert("Preencha tudo!"); return }
    setItensPedido([...itensPedido, { descricao: descricaoItem, quantidade: qtdItem, preco: precoItem }])
    setDescricaoItem(''); setPrecoItem(''); setQtdItem(1)
  }

  const finalizarPedido = () => {
    if (!clienteSelecionado || !restauranteSelecionado || itensPedido.length === 0) {
        alert("Falta selecionar algo!"); return
    }
    
    axios.post('http://localhost:5001/pedido', {
        cliente_id: clienteSelecionado,
        restaurante_id: restauranteSelecionado,
        itens: itensPedido
    }).then(() => {
        alert("Pedido Criado!");
        setItensPedido([]); setClienteSelecionado(''); setRestauranteSelecionado('')
        carregarDados()
    })
  }

  const mudarStatus = (id, novoStatus) => {
    axios.put(`http://localhost:5001/pedido/${id}/status`, { status: novoStatus })
        .then(() => {
            carregarDados() 
        })
        .catch(err => console.error(err))
  }

  const getCorStatus = (status) => {
      if (status === 'Em Preparo') return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      if (status === 'A Caminho') return 'bg-purple-100 text-purple-800 border-purple-300'
      if (status === 'Entregue') return 'bg-green-100 text-green-800 border-green-300'
      return 'bg-gray-100'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-purple-100 to-purple-200 p-8">
      <h1 className="text-4xl font-black text-center mb-12 text-white">🛵 Gerenciar Pedidos</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg border-t-4 border-purple-500">
            <h2 className="font-bold text-2xl mb-6 text-gray-800">Novo Pedido</h2>
            <select className="w-full p-3 border-2 border-gray-200 rounded-lg mb-4 focus:border-purple-500 focus:outline-none transition font-semibold" value={clienteSelecionado} onChange={e => setClienteSelecionado(e.target.value)}>
                <option value="">👤 Selecione um Cliente...</option>
                {listaClientes.map(c => <option key={c.cliente_id} value={c.cliente_id}>{c.nome}</option>)}
            </select>
            <select className="w-full p-3 border-2 border-gray-200 rounded-lg mb-6 focus:border-purple-500 focus:outline-none transition font-semibold" value={restauranteSelecionado} onChange={e => setRestauranteSelecionado(e.target.value)}>
                <option value="">🍽️ Selecione um Restaurante...</option>
                {listaRestaurantes.map(r => <option key={r.restaurante_id} value={r.restaurante_id}>{r.nome}</option>)}
            </select>
            <div className="flex gap-3 mb-4">
                <input type="text" placeholder="Descrição do item" className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition font-semibold" value={descricaoItem} onChange={e => setDescricaoItem(e.target.value)} />
                <input type="number" min="1" placeholder="Qtd" className="w-20 p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition font-semibold" value={qtdItem} onChange={e => setQtdItem(e.target.value)} />
            </div>
            <div className="flex gap-3">
                <input type="number" placeholder="Preço (R$)" className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition font-semibold" value={precoItem} onChange={e => setPrecoItem(e.target.value)} />
                <button onClick={adicionarItem} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 rounded-lg font-bold transition duration-300 hover:shadow-lg hover:scale-105">➕ Adicionar</button>
            </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-500">
            <h2 className="font-bold text-2xl mb-6 text-gray-800">Carrinho ({itensPedido.length})</h2>
            <div className="max-h-64 overflow-y-auto mb-4">
                {itensPedido.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Nenhum item adicionado</p>
                ) : (
                    itensPedido.map((item, i) => (
                        <div key={i} className="flex justify-between border-b py-3 text-sm hover:bg-purple-50 px-2 rounded transition">
                            <span className="font-semibold">{item.quantidade}x {item.descricao}</span>
                            <span className="text-purple-600 font-bold">R$ {parseFloat(item.preco).toFixed(2)}</span>
                        </div>
                    ))
                )}
            </div>
            {itensPedido.length > 0 && (
                <button onClick={finalizarPedido} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-bold transition duration-300 hover:shadow-lg hover:scale-105">✓ Confirmar Pedido</button>
            )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-black mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Pedidos em Andamento</h2>
        
        {pedidosRealizados.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
                <p className="text-xl text-gray-500">Nenhum pedido realizado ainda</p>
            </div>
        ) : (
            <div className="grid gap-4">
                {pedidosRealizados.map((pedido) => (
                    <div key={pedido.pedido_id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        
                        <div className="flex-1">
                            <span className="text-gray-400 text-sm font-semibold">Pedido #{pedido.pedido_id}</span>
                            <h3 className="font-bold text-lg text-gray-800 mt-1">{pedido.nome_cliente}</h3>
                            <p className="text-sm text-purple-600 font-semibold mt-2">🍽️ {pedido.nome_restaurante}</p>
                            <p className="text-xs text-gray-500 mt-1">📅 {new Date(pedido.data_hora).toLocaleString('pt-BR')}</p>
                        </div>

                        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getCorStatus(pedido.status_pedido)}`}>
                                {pedido.status_pedido}
                            </span>

                            <div className="flex gap-2">
                                {pedido.status_pedido === 'Em Preparo' && (
                                    <button 
                                        onClick={() => mudarStatus(pedido.pedido_id, 'A Caminho')}
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg text-white text-sm px-4 py-2 rounded-lg font-bold transition duration-300 hover:scale-105"
                                    >
                                        🛵 Entregando
                                    </button>
                                )}
                                
                                {pedido.status_pedido === 'A Caminho' && (
                                    <button 
                                        onClick={() => mudarStatus(pedido.pedido_id, 'Entregue')}
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg text-white text-sm px-4 py-2 rounded-lg font-bold transition duration-300 hover:scale-105"
                                    >
                                        ✅ Entregue
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        )}
      </div>

    </div>
  )
}

export default Pedidos