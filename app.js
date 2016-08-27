// Initialize Firebase

// You will need to paste your web code here
// var config = {
//     apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxx",
//     authDomain: "XXXXXXXXXX.firebaseapp.com",
//     databaseURL: "https://XXXXXXX.firebaseio.com",
//     storageBucket: "XXXXXXXX.appspot.com",
// };
// firebase.initializeApp(config);

function updateState() {
    var header = document.getElementById('header');
    var dbRef = firebase.database().ref().child('header');
    dbRef.on('value', function(snap) {
        header.innerText = snap.val();
    });
}

// Authentication Logic
var emailText = document.getElementById('emailText');
var passwordText = document.getElementById('passwordText');
var loginButton = document.getElementById('loginButton');
var signUpButton = document.getElementById('signUpButton');
var signOutButton = document.getElementById('signOutButton');

loginButton.addEventListener('click', function(e){
    var email = emailText.value;
    var password = passwordText.value;
    var auth = firebase.auth();

    var promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(function(e){
        console.log(e.message);
    })
})

signUpButton.addEventListener('click', function(e){
    var email = emailText.value;
    var password = passwordText.value;
    var auth = firebase.auth();

    var promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(function(e){
        console.log(e.message);
    })
})

firebase.auth().onAuthStateChanged(function(firebaseUser){
    if(firebaseUser){
        updateState();
        console.log(firebaseUser);
    } else {
        console.log('not logged in');
    }
});

signOutButton.addEventListener('click', function(e){
    firebase.auth().signOut();
});

var playground = document.getElementById('playground');
var playgroundRef = firebase.database().ref().child('playground');
playgroundRef.on('value', function(snap) {
    playground.innerText = snap.val();
});

playground.addEventListener('keyup', function(){
    playgroundRef.set(playground.value);
})

