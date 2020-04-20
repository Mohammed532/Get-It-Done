import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBYLuPtMAiI1yw97z8dmwtOnUP0q9wC97A",
    authDomain: "get-it-done-app.firebaseapp.com",
    databaseURL: "https://get-it-done-app.firebaseio.com",
    projectId: "get-it-done-app",
    storageBucket: "get-it-done-app.appspot.com",
    messagingSenderId: "750469377580",
    appId: "1:750469377580:web:f6c6837e8870b6ba422b89",
    measurementId: "G-806CSP4C7R"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

//Exports firebase authentication and firestore as seperate variables
export const auth = firebase.auth();
export const db = firebase.firestore();


export default firebase