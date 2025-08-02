import React, { useState } from 'react';
import { adicionarBebe } from '../services/dbUtils';
import { useAuthUser } from '../hooks/useAuthUser';

const CadastrarBebe: React.FC = () => {
  const usuario = useAuthUser();
  const [nomeBebe, setNomeBebe] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdicionar = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');
    if (!usuario) {
      setMensagem('Usuário não autenticado.');
      return;
    }
    setLoading(true);
    const resultado = await adicionarBebe(usuario.uid, nomeBebe);
    setLoading(false);
    if (resultado.sucesso) {
      setMensagem('Bebê cadastrado com sucesso!');
      setNomeBebe('');
    } else {
      setMensagem('Erro ao cadastrar bebê.');
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <form onSubmit={handleAdicionar} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
      <input value={nomeBebe} onChange={e => setNomeBebe(e.target.value)} placeholder="Nome do bebê" required />
      <button type="submit">Adicionar Bebê</button>
      {mensagem && <div>{mensagem}</div>}
    </form>
  );
};

export default CadastrarBebe;