import {initializeApp} from '@firebase/app';
import {getStorage} from '@firebase/storage'
import {getFirestore } from '@firebase/firestore'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC0MMT8bU0svEuBmbSLta6Ued16yJb_iNQ',
  authDomain: 'studentprojectportal-b7252.firebaseapp.com',
  projectId: 'studentprojectportal-b7252',
  storageBucket: 'studentprojectportal-b7252.appspot.com',
  messagingSenderId: '678803154849',
  appId: '1:678803154849:web:f1613079825468c8038de0',
  measurementId: 'G-3YQVBWVC8P',
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );
const imgDB = getStorage( app )
const txtDB = getFirestore( app )

export {imgDB, txtDB};
