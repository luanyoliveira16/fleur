import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export type GestanteData = {
  nomeCompleto: string;
  dataNascimento: string;
  semanasGestacao: number;
  tipoGestacao: 'única' | 'gemelar';
  dataPrevistaParto?: string;
  nomesBebes?: string[];
  condicoesSaude?: string;
  hospital?: string;
};

export async function createGestante(uid: string, data: GestanteData) {
  await setDoc(doc(db, 'gestantes', uid), data);
}

export async function getGestante(uid: string) {
  const docSnap = await getDoc(doc(db, 'gestantes', uid));
  return docSnap.exists() ? docSnap.data() as GestanteData : null;
}

export async function updateGestante(uid: string, data: Partial<GestanteData>) {
  await updateDoc(doc(db, 'gestantes', uid), data);
}