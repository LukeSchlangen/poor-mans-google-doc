// Initialize Firebase
var config = {
    apiKey: "AIzaSyBFUzWta0A7n9ZYp9Piv25RAAtPKZFj-8Y",
    authDomain: "prime-fun.firebaseapp.com",
    databaseURL: "https://prime-fun.firebaseio.com",
    storageBucket: "prime-fun.appspot.com",
};
firebase.initializeApp(config);

// Authentication Logic
var signInButton = document.getElementById('signInButton');
var signOutButton = document.getElementById('signOutButton');
var header = document.getElementById('header');
var playground = document.getElementById('playground');
var provider = new firebase.auth.GoogleAuthProvider();

var dbRef = firebase.database().ref().child('header');
dbRef.on('value', function (snap) {
    header.innerText = snap.val();
});

var playgroundRef = firebase.database().ref().child('playground');
playgroundRef.on('value', function (snap) {
    playground.innerText = snap.val();
});

signInButton.addEventListener('click', function (e) {
    firebase.auth().signInWithPopup(provider);
});

firebase.auth().onAuthStateChanged(function (firebaseUser) {
    if (firebaseUser) {
        console.log('The current user is: ', firebaseUser);
    } else {
        header.innerText = 'Log in using Google!';
        playground.innerText = '';
        console.log('not logged in');
    }
});

signOutButton.addEventListener('click', function (e) {
    firebase.auth().signOut();
});

playground.addEventListener('keyup', function () {
    playgroundRef.set(playground.value);
});

