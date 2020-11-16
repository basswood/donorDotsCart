import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDVQppPJFLYRA8jN8rQEJ9gDqvRQjLcvQY",
  authDomain: "ddtest2020bob.firebaseapp.com",
  databaseURL: "https://ddtest2020bob.firebaseio.com",
  projectId: "ddtest2020bob",
  storageBucket: "ddtest2020bob.appspot.com",
  messagingSenderId: "604346720650",
  appId: "1:604346720650:web:b10a73e6c427015a24e873"
}

firebase.initializeApp(config);

export function firebaseListener(func) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // console.log("User log in success", user);
      func(true, user)
    } else {
      // console.log("User log in failed", user);
      func(false)
    }
  }, function(error) {
    console.log(error)
  });
}

export const ref = firebase.database().ref();
export const db = firebase.firestore();
export const firebaseAuth = firebase.auth;
