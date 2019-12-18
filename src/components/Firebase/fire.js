import firebase from 'firebase'


var config = {
    apiKey: "AIzaSyC97J_aJvwG0eOcgVp0dEnmgVrHMkXQ4oc",
    authDomain: "jarvis-5b51a.firebaseapp.com",
    databaseURL: "https://jarvis-5b51a.firebaseio.com",
    projectId: "jarvis-5b51a",
    storageBucket: "jarvis-5b51a.appspot.com",
    messagingSenderId: "57523789256",
};
var fire = firebase.initializeApp(config);
export default fire;

