import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCha8mmSWOFxOk1uPu2YpVMutsKWHbNmRE",
  authDomain: "leiloesta.firebaseapp.com",
  databaseURL: "https://leiloesta.firebaseio.com",
  projectId: "leiloesta",
  storageBucket: "leiloesta.appspot.com",
  messagingSenderId: "939583755513",
  appId: "1:939583755513:web:796049fbb9dcc04010be28"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));