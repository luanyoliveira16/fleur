import React, { useState } from 'react';
import { salvarDocumento } from '../services/dbUtils';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthUser } from '../hooks/useAuthUser';

const CriarConta: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const { usuario, loading } = useAuthUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso(false);

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      const resultado = await salvarDocumento('usuarios', user.uid, {
        nomeCompleto: nome,
        email,
      });

      if (resultado.sucesso) {
        setSucesso(true);
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
      } else {
        setErro('Erro ao salvar dados no Firestore.');
      }
    } catch (error: any) {
      setErro(error.message || 'Erro ao criar conta.');
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
      <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome completo" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" type="email" required />
      <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" required />
      <input type="password" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} placeholder="Confirmar senha" required />
      <button type="submit">Criar Conta</button>
      {erro && <div style={{ color: 'red' }}>{erro}</div>}
      {sucesso && <div style={{ color: 'green' }}>Conta criada com sucesso!</div>}
    </form>
  );
};

export default CriarConta; 