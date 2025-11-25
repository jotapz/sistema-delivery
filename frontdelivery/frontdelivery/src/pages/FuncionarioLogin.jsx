import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import fundoImg from '../assets/fundo.png'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    axios.post('http://localhost:5001/funcionario/login', { email, senha })
      .then(response => {
        localStorage.setItem('usuario_logado', JSON.stringify(response.data.funcionario))
        alert(`Bem-vindo, ${response.data.funcionario.nome}!`)
        navigate('/')
        window.location.reload()
      })
      .catch(error => {
        if (error.response) {
            alert(error.response.data.message)
        } else {
            alert("Erro ao conectar com o servidor")
        }
      })
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${fundoImg})`,
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/90 to-indigo-900/90 z-0"></div>

      <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-purple-500">
        <h1 className="text-3xl font-black text-center text-gray-800 mb-2">🛵 Delivery App</h1>
        <p className="text-center text-gray-500 mb-1">Área Restrita para Funcionários</p>
        <p className="text-center text-purple-500 font-bold mb-2">Funcionários criado pelo Postman</p>



        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none transition"
              placeholder="ex: admin@delivery.com"
              value={email} onChange={e => setEmail(e.target.value)} required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Senha</label>
            <input 
              type="password" 
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none transition"
              placeholder="••••••"
              value={senha} onChange={e => setSenha(e.target.value)} required
            />
          </div>

          <button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:scale-105 transition shadow-lg mt-4">
            Entrar no Sistema ➔
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login