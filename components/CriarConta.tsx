import { FaEye, FaEyeSlash } from 'react-icons/fa'; // npm install react-icons
import React, { useState } from 'react';

const CriarConta: React.FC = () => {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
      
      {/* Campo senha com ícone */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type={mostrarSenha ? 'text' : 'password'}
          value={senha}
          onChange={e => setSenha(e.target.value)}
          placeholder="Senha"
          required
          style={{ flex: 1, paddingRight: 32 }}
        />
        <span
          onClick={() => setMostrarSenha(!mostrarSenha)}
          style={{ position: 'absolute', right: 8, cursor: 'pointer' }}
        >
          {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Campo confirmar senha com ícone */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type={mostrarConfirmarSenha ? 'text' : 'password'}
          value={confirmarSenha}
          onChange={e => setConfirmarSenha(e.target.value)}
          placeholder="Confirmar senha"
          required
          style={{ flex: 1, paddingRight: 32 }}
        />
        <span
          onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
          style={{ position: 'absolute', right: 8, cursor: 'pointer' }}
        >
          {mostrarConfirmarSenha ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button type="submit">Criar Conta</button>
    </form>
  );
};

export default CriarConta;
