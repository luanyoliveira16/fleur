import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export type BebesData = {
  nome: string;
  peso: number;
  comprimento: number;
};

export type GestacaoControleData = {
  uid: string;
  dataUltimaMenstruacao: string;
  dataConsulta: string;
  idadeGestacionalConsulta: string;
  observacoesConsulta?: string;
  bebes: BebesData[];
};

export async function createGestacaoControle(uid: string, data: GestacaoControleData) {
  await setDoc(doc(db, 'gestacaoControle', uid), data);
}

export async function getGestacaoControle(uid: string) {
  const docSnap = await getDoc(doc(db, 'gestacaoControle', uid));
  return docSnap.exists() ? docSnap.data() as GestacaoControleData : null;
}

export async function updateGestacaoControle(uid: string, data: Partial<GestacaoControleData>) {
  await updateDoc(doc(db, 'gestacaoControle', uid), data);
}