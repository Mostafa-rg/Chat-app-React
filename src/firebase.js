import firebase from 'firebase/app'
import 'firebase/auth'

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyAyXLXy82hEDrxoLh8rwELDqmXSPihPrKU",
    authDomain: "my-messager-af931.firebaseapp.com",
    projectId: "my-messager-af931",
    storageBucket: "my-messager-af931.appspot.com",
    messagingSenderId: "1000671640819",
    appId: "1:1000671640819:web:51846ee6d8b6e2cb460b86"
  }).auth();