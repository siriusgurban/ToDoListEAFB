// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, set, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

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

let emailInp = document.querySelector("#emailInp");
let passInp = document.querySelector("#passwordInp");
let fnameInp = document.querySelector("#fnameInp");
let lnameInp = document.querySelector("#lnameInp");
let mainForm = document.querySelector("#mainForm");
let loginButton = document.querySelector(".login-button");

let RegisterUser = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, emailInp.value, passInp.value)
        .then((credentials) => {
            set(ref(db, 'UsersAuthList/' + credentials.user.uid),{
                firstname: fnameInp.value,
                lasttname: lnameInp.value,
            });

            alert("You registered! Please, Login")
           
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        })
        // window.location.href = './login.html';
}

let RegisterUserEnter = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
    createUserWithEmailAndPassword(auth, emailInp.value, passInp.value)
        .then((credentials) => {
            set(ref(db, 'UsersAuthList/' + credentials.user.uid),{
                firstname: fnameInp.value,
                lasttname: lnameInp.value,
            });

            alert("You registered! Please, Login")
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        })
}
// window.location.href = './login.html';
}

mainForm.addEventListener("submit", RegisterUser);
loginButton.addEventListener("keypress", RegisterUserEnter);

console.log("Hello Register");

fnameInp.addEventListener("input", ()=>{
    !fnameInp.value == "" ? fnameInp.classList.remove("login-name-bg-img") : fnameInp.classList.add("login-name-bg-img");  
})

lnameInp.addEventListener("input", ()=>{
    !lnameInp.value == "" ? lnameInp.classList.remove("login-name-bg-img") : lnameInp.classList.add("login-name-bg-img");  
})

emailInp.addEventListener("input", ()=>{
    !emailInp.value == "" ? emailInp.classList.remove("login-email-bg-img") : emailInp.classList.add("login-email-bg-img");  
})

passInp.addEventListener("input", ()=>{
    !passInp.value == "" ? passInp.classList.remove("login-password-bg-img") : passInp.classList.add("login-password-bg-img");  
})
