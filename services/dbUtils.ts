import { db } from './firebase';
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  DocumentData,
} from 'firebase/firestore';

export async function salvarDocumento(
  colecao: string,
  docId: string,
  dados: object,
  merge = true
): Promise<{ sucesso: boolean; erro?: any }> {
  try {
    await setDoc(doc(db, colecao, docId), dados, { merge });
    return { sucesso: true };
  } catch (erro) {
    console.error('Erro ao salvar documento:', erro);
    return { sucesso: false, erro };
  }
}

export async function buscarDocumento(
  colecao: string,
  docId: string
): Promise<{ sucesso: boolean; dados?: DocumentData; erro?: any }> {
  try {
    const docRef = doc(db, colecao, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { sucesso: true, dados: docSnap.data() };
    } else {
      return { sucesso: false, erro: 'Documento não encontrado' };
    }
  } catch (erro) {
    console.error('Erro ao buscar documento:', erro);
    return { sucesso: false, erro };
  }
}

export async function removerDocumento(
  colecao: string,
  docId: string
): Promise<{ sucesso: boolean; erro?: any }> {
  try {
    await deleteDoc(doc(db, colecao, docId));
    return { sucesso: true };
  } catch (erro) {
    console.error('Erro ao remover documento:', erro);
    return { sucesso: false, erro };
  }
}

export async function buscarTodosDocumentos(
  colecao: string
): Promise<{ sucesso: boolean; dados?: DocumentData[]; erro?: any }> {
  try {
    const colRef = collection(db, colecao);
    const querySnapshot = await getDocs(colRef);
    const docs: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    return { sucesso: true, dados: docs };
  } catch (erro) {
    console.error('Erro ao buscar documentos:', erro);
    return { sucesso: false, erro };
  }
}

export async function adicionarBebe(
  usuarioId: string,
  nomeBebe: string
): Promise<{ sucesso: boolean; erro?: any }> {
  try {
    await addDoc(collection(db, 'bebes'), { usuarioId, nomeBebe });
    return { sucesso: true };
  } catch (erro) {
    console.error('Erro ao adicionar bebê:', erro);
    return { sucesso: false, erro };
  }
}

export async function buscarBebesPorUsuario(
  usuarioId: string
): Promise<{ sucesso: boolean; dados?: DocumentData[]; erro?: any }> {
  try {
    const q = query(collection(db, 'bebes'), where('usuarioId', '==', usuarioId));
    const snapshot = await getDocs(q);
    const bebes: DocumentData[] = [];
    snapshot.forEach((doc) => {
      bebes.push({ id: doc.id, ...doc.data() });
    });
    return { sucesso: true, dados: bebes };
  } catch (erro) {
    console.error('Erro ao buscar bebês:', erro);
    return { sucesso: false, erro };
  }
}

export async function removerBebesPorUsuario(
  usuarioId: string
): Promise<{ sucesso: boolean; erro?: any }> {
  try {
    const q = query(collection(db, 'bebes'), where('usuarioId', '==', usuarioId));
    const snapshot = await getDocs(q);
    for (const bebeDoc of snapshot.docs) {
      await deleteDoc(doc(db, 'bebes', bebeDoc.id));
    }
    return { sucesso: true };
  } catch (erro) {
    console.error('Erro ao remover bebês:', erro);
    return { sucesso: false, erro };
  }
} 