import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import 'firebase/auth';
import 'firebase/firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBg2hE54GMsIyv1V-8JXsgkHkq825p7TDM',
  authDomain: 'genealogical-tree-72ebc.firebaseapp.com',
  databaseURL: 'https://genealogical-tree-72ebc-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'genealogical-tree-72ebc',
  storageBucket: 'genealogical-tree-72ebc.appspot.com',
  messagingSenderId: '330291048377',
  appId: '1:330291048377:web:1e2ae6370373c6d647d068',
};
console.log(process.env);
export const app = initializeApp(firebaseConfig);
// firebase.firestore();
// Initialize Firebase
const db = getFirestore(app);
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};
export const auth = getAuth(app);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
