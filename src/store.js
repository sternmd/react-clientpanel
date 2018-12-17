import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
// Reducers
// import settingsReducer from './reducers/settingsReducer' 

const firebaseConfig = {
    apiKey: "AIzaSyAotmvrdYwyPpUwkeym8CmM_uNLsJh1xR0",
    authDomain: "react-clientpanel-4c8f0.firebaseapp.com",
    databaseURL: "https://react-clientpanel-4c8f0.firebaseio.com",
    projectId: "react-clientpanel-4c8f0",
    storageBucket: "react-clientpanel-4c8f0.appspot.com",
    messagingSenderId: "823518878665"
};


const rrfConfig = { userProfile: 'users' } // react-redux-firebase config

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
//   notify: notifyReducer,
//   settings: settingsReducer
});

// Check for settings in localStorage
if (localStorage.getItem('settings') == null) {
  // Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  // Set to localStorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
  )
);

export default store;
