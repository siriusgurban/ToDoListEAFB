// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, get, ref, child, onValue } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyAu4xC1TyFSj5Iqpp2aNl2QVPrHBiJWpHo",
    authDomain: "test2-9a0cc.firebaseapp.com",
    projectId: "test2-9a0cc",
    storageBucket: "test2-9a0cc.appspot.com",
    messagingSenderId: "1061242781557",
    appId: "1:1061242781557:web:5b9eca21caaf2c930ddd3c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);

let emailInp = document.querySelector("#emailInp");
let passInp = document.querySelector("#passwordInp");
let mainForm = document.querySelector("#mainForm");

let SignInUser = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, emailInp.value, passInp.value)
        .then((credentials) => {
            get(child(dbref, 'UsersAuthList/' + credentials.user.uid)).then((snapshot)=>{
                if(snapshot.exists){
                    sessionStorage.setItem("user-info", JSON.stringify({
                        firstname: snapshot.val().firstname,
                        lastname: snapshot.val().lastname
                    }))

                    sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                    window.location.href = '../dist/index.html';
                }
            })
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        })
}

mainForm.addEventListener("submit", SignInUser);

console.log("Hello Register");