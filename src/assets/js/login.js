// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, get, ref, child, onValue } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyCchalPMe4QFZXzkG8A7L1h1CtRXEZOook",
    authDomain: "todolisteafb.firebaseapp.com",
    databaseURL: "https://todolisteafb-default-rtdb.firebaseio.com",
    projectId: "todolisteafb",
    storageBucket: "todolisteafb.appspot.com",
    messagingSenderId: "352113117273",
    appId: "1:352113117273:web:e438ea9c4d7d93cb678948"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);

let emailInp = document.querySelector("#emailInp");
let passInp = document.querySelector("#passwordInp");
let mainForm = document.querySelector("#mainForm");
let loginButton = document.querySelector(".login-button");

let SignInUser = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, emailInp.value, passInp.value)
        .then((credentials) => {
            get(child(dbref, 'UsersAuthList/' + credentials.user.uid)).then((snapshot) => {
                if (snapshot.exists) {
                    sessionStorage.setItem("user-info", JSON.stringify({
                        firstname: snapshot.val().firstname,
                        lastname: snapshot.val().lastname
                    }))

                    sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                    window.location.href = '../../../dist/index.html';
                    // console.log(window.location.href);
                }
            })
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        })
}

let SignInUserEnter = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
        signInWithEmailAndPassword(auth, emailInp.value, passInp.value)
            .then((credentials) => {
                get(child(dbref, 'UsersAuthList/' + credentials.user.uid)).then((snapshot) => {
                    if (snapshot.exists) {
                        sessionStorage.setItem("user-info", JSON.stringify({
                            firstname: snapshot.val().firstname,
                            lastname: snapshot.val().lastname
                        }))

                        sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                        window.location.href = '../../../dist/index.html';
                    }
                })
            })
            .catch((error) => {
                alert(error.message);
                console.log(error.code);
                console.log(error.message);
            })
    }
}

mainForm.addEventListener("submit", SignInUser);
loginButton.addEventListener("keypress", SignInUserEnter);

console.log("Hello Register");



emailInp.addEventListener("input", () => {
    !emailInp.value == "" ? emailInp.classList.remove("login-email-bg-img") : emailInp.classList.add("login-email-bg-img");
})

passInp.addEventListener("input", () => {
    !passInp.value == "" ? passInp.classList.remove("login-password-bg-img") : passInp.classList.add("login-password-bg-img");
})

