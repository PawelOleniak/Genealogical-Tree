import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app, auth } from 'index';
import { Link } from 'react-router-dom';
import { SignWrapper } from './SignInCss';
import { Button } from 'components';
const signInWithGoogle = async () => {
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const SignIn = () => {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.push('/Tree');
  }, [user, loading]);
  return (
    <SignWrapper className="login">
      <div>In current Version app is only usable on desktop Browsers</div>
      <div>Signing up/in is necessary for future tree sharing mechanizm </div>
      <Button onClick={signInWithGoogle}>Login with Google</Button>
    </SignWrapper>
  );
};
export default SignIn;
