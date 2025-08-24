import { db } from './firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export type HumorData = {
  uid: string;
  data: string;
  humor: string;
};

export async function saveHumor(data: HumorData) {
  await addDoc(collection(db, 'humor'), data);
}

export async function getHumor(uid: string) {
  const q = query(collection(db, 'humor'), where('uid', '==', uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as HumorData);
}