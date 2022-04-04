import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from 'index';

export const setUserData = async (changes, name) => {
  const db = getFirestore(app);
  const cityRef = doc(db, 'state', name);
  await setDoc(cityRef, changes);
};
export const loadUserData = async (name) => {
  try {
    const db = getFirestore(app);
    const docRef = doc(db, 'state', name);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch {
    alert('Internet Disconnected');
  }
};
