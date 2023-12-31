// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCchalPMe4QFZXzkG8A7L1h1CtRXEZOook",
  authDomain: "todolisteafb.firebaseapp.com",
  databaseURL: "https://todolisteafb-default-rtdb.firebaseio.com",
  projectId: "todolisteafb",
  storageBucket: "todolisteafb.appspot.com",
  messagingSenderId: "352113117273",
  appId: "1:352113117273:web:e438ea9c4d7d93cb678948"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const userCreds = JSON.parse(sessionStorage.getItem("user-creds"));
const userInfo = JSON.parse(sessionStorage.getItem("user-info"));

console.log(userCreds.uid);

const signOutBtn = document.querySelector("#signoutbutton");
const greetUser = document.querySelector("#greetUser");

let btn = document.querySelector("#btn");
let inp = document.querySelector("#inp");


let signOut = () => {
  sessionStorage.removeItem("user-creds");
  sessionStorage.removeItem("user-info");
  window.location.href = "../src/assets/pages/login.html"
}

let CheckCred = () => {
  if(!sessionStorage.getItem("user-creds")){
    window.location.href = "../src/assets/pages/login.html";
  }
  else{
    greetUser.innerHTML = `Welcome, ${userInfo.firstname}`;
  }
}


window.addEventListener("DOMContentLoaded", CheckCred);
signOutBtn.addEventListener("click", signOut);

renderTodos();

function writeUserData(userId, todo) {

  const reference = ref(db, 'UsersAuthList/' + userCreds.uid+ "/"+ "todos/" + userId);//add function
      set(reference, {
        todo: todo,
      })
}


btn.addEventListener("click", function(){//add function called
  writeUserData(Date.now(), inp.value)
  console.log("added");
  inp.value = "";
  renderTodos()
  
})

const result = document.querySelector("#result");

function renderTodos() {
  const todos = ref(db, 'UsersAuthList/' + userCreds.uid + "/" + "todos");

  onValue(todos, (snapshot) => {
    const data = snapshot.val();

    
    let arr = Object.entries(data);
    // console.log(arr);

    let arrMap = arr.map((el, index) => {
        return `
        <div class="d-flex justify-content-between align-items-center">
        <div class=" my-3 h4">${el[1].todo}</div>
        <input class="rounded-2 d-none inpClass" type="text" value="">

          <div class="d-flex justify-content-between g-2">

            <button class="index-delete del index-button" data-id='${el[0]}'>Delete</button>

            <button class="index-edit editClass index-button" data-id="${el[0]}" data-value="${el[1].todo}">Edit</button>
          
          </div>
         </div>
        `;
      })
      .join("");

      result.innerHTML = arrMap;

      let delClass = document.querySelectorAll(".del");
      
      delClass.forEach(delBtn=>{
          delBtn.addEventListener("click", ()=>{//delete function called
            deleteTodo(delBtn.dataset.id);
      })})

      let editClass = document.querySelectorAll(".editClass");
      
      editClass.forEach(editBtn=>{
          editBtn.addEventListener("click", ()=>{//edit function called
            editTodo(editBtn.dataset.id, editBtn.dataset.value);
      })})
      
      })

      function deleteTodo(id) {//delete function
      let rmv = ref(db, 'UsersAuthList/' + userCreds.uid + "/" + "todos/" + id);
  
      remove(rmv).then(() => console.log("Success"));

      renderTodos();
    
    }

    function editTodo(id, value) {// edit function
      const todos = ref(db, 'UsersAuthList/' + userCreds.uid + "/" + "todos");

      onValue(todos, (snapshot) => {
        const data = snapshot.val();
    
        
        let arr = Object.entries(data);
    
        let arrMap = arr.map((el, index) => {
          if(id == el[0]){
            return `
            <div class="d-flex justify-content-between align-items-center">
            <div class=" my-3 h4">${el[1].todo}</div>
            <input class="inpClass" type="text" value="${el[1].todo}" >
    
              <div class="d-flex justify-content-between g-2">
    
                <button class="index-delete del index-button" data-id='${el[0]}'>Delete</button>
    
                <button class="index-update updateClass index-button"  data-id="${el[0]}" data-value="${el[1].todo}">Update</button>
              
              </div>
             </div>
            `;
          }else{
            return `
            <div class="d-flex justify-content-between align-items-center">
            <div class=" my-3 h4">${el[1].todo}</div>
    
              <div class="d-flex justify-content-between g-2">
    
                <button class="index-delete del index-button" data-id='${el[0]}'>Delete</button>
    
                <button class="index-edit editClass index-button"  data-id="${el[0]}" data-value="${el[1].todo}">Edit</button>
              
              </div>
             </div>
            `;
          }
          
          })
          .join("");

 
    
          result.innerHTML = arrMap;


          let updateClass = document.querySelector(".updateClass");
          let inpClass = document.querySelector(".inpClass");
            updateClass.addEventListener("click", ()=>{
              updateTodo(updateClass.dataset.id, inpClass.value)//update function called
            })
    })
    
  

    function updateTodo(id, value) {
      console.log("update function");
      const reference = ref(db, 'UsersAuthList/' + userCreds.uid + "/" + 'todos/' + id);//update function

        set(reference, {
          todo: value,
        })

        renderTodos();
      
}}

    }
    


// -----------------------------------------------------

// renderTodos();

// function writeUserData(userId, todo) {

// const reference = ref(db, 'todos/' + userId);//add function

//     set(reference, {
//       todo: todo,
//     })
// }


// // writeUserData(Date.now(), "move on");

// btn.addEventListener("click", function(){//add function called
//   writeUserData(Date.now(), inp.value)
//   console.log("added");
//   renderTodos()
// })

// const result = document.querySelector("#result");

// function renderTodos() {
//   const todos = ref(db, "todos");

//   onValue(todos, (snapshot) => {
//     const data = snapshot.val();

    
//     let arr = Object.entries(data);
//     console.log(arr);

//     let arrMap = arr.map((el, index) => {
//         return `
//         <div class="d-flex justify-content-between">
//         <div class="bg-primary rounded-2 my-3">${el[1].todo}</div>
//         <input class="rounded-2 d-none inpClass" type="text" value="">

//           <div class="d-flex justify-content-between g-2">

//             <button class="bg-danger rounded-2 cursor-pointer del" data-id='${el[0]}'>Delete</button>

//             <button class="bg-warning rounded-2 cursor-pointer editClass"  data-id="${el[0]}" data-value="${el[1].todo}">Edit</button>
          
//           </div>
//          </div>
//         `;
//       })
//       .join("");

//       result.innerHTML = arrMap;

//       let delClass = document.querySelectorAll(".del");
//       console.log(delClass);
      
//       delClass.forEach(delBtn=>{
//         console.log(delBtn, "btn");
//           delBtn.addEventListener("click", ()=>{//delete function called
//             console.log(delBtn.dataset.id);
//             deleteTodo(delBtn.dataset.id);
//       })})

//       let editClass = document.querySelectorAll(".editClass");
//       console.log(editClass);
      
//       editClass.forEach(editBtn=>{
//         console.log(editBtn, "edit btn");
//           editBtn.addEventListener("click", ()=>{//edit function called
//             console.log(editBtn.dataset.value);
//             editTodo(editBtn.dataset.id, editBtn.dataset.value);
//       })})
      
//       })

//       function deleteTodo(id) {//delete function
//         console.log(id);
//       let rmv = ref(db, "todos/" + id);
  
//       remove(rmv).then(() => console.log("Success"));

//       renderTodos();
    
//     }

//     function editTodo(id, value) {// edit function
//       const todos = ref(db, "todos");

//       onValue(todos, (snapshot) => {
//         const data = snapshot.val();
    
        
//         let arr = Object.entries(data);
//         console.log(arr);
    
//         let arrMap = arr.map((el, index) => {
//           if(id == el[0]){
//             return `
//             <div class="d-flex justify-content-between">
//             <div class="bg-primary rounded-2 my-3">${el[1].todo}</div>
//             <input class="rounded-2 inpClass" type="text" value="${el[1].todo}" >
    
//               <div class="d-flex justify-content-between g-2">
    
//                 <button class="bg-danger rounded-2 cursor-pointer del" data-id='${el[0]}'>Delete</button>
    
//                 <button class="bg-warning rounded-2 cursor-pointer updateClass"  data-id="${el[0]}" data-value="${el[1].todo}">Update</button>
              
//               </div>
//              </div>
//             `;
//           }else{
//             return `
//             <div class="d-flex justify-content-between">
//             <div class="bg-primary rounded-2 my-3">${el[1].todo}</div>
    
//               <div class="d-flex justify-content-between g-2">
    
//                 <button class="bg-danger rounded-2 cursor-pointer del" data-id='${el[0]}'>Delete</button>
    
//                 <button class="bg-warning rounded-2 cursor-pointer editClass"  data-id="${el[0]}" data-value="${el[1].todo}">Edit</button>
              
//               </div>
//              </div>
//             `;
//           }
          
//           })
//           .join("");

 
    
//           result.innerHTML = arrMap;


//           let updateClass = document.querySelector(".updateClass");
//           let inpClass = document.querySelector(".inpClass");
//             updateClass.addEventListener("click", ()=>{
//               updateTodo(updateClass.dataset.id, inpClass.value)//update function called
//             })
//     })
    
  

//     function updateTodo(id, value) {
//       console.log("update function");
//       const reference = ref(db, 'todos/' + id);//update function

//         set(reference, {
//           todo: value,
//         })

//         renderTodos();
      
// }}

//     }
    



// -----------------------------------------------------






//! Firebae Firestroe add and delete methods works

// import { initializeApp } from "firebase/app";
// import { onValue, getDatabase,  ref,  set,  push,  remove } from "firebase/database";
// import {
//   collection,
//   onSnapshot,
//   getFirestore,
//   addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, updateDoc
// } from 'firebase/firestore';


//   const firebaseConfig = {
//     apiKey: "AIzaSyCchalPMe4QFZXzkG8A7L1h1CtRXEZOook",
//     authDomain: "todolisteafb.firebaseapp.com",
//     projectId: "todolisteafb",
//     storageBucket: "todolisteafb.appspot.com",
//     messagingSenderId: "352113117273",
//     appId: "1:352113117273:web:e438ea9c4d7d93cb678948"
//   };

//  // console.log(Object.entries(arrayLike)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

//   //   init firebase app
//   initializeApp(firebaseConfig);

//   //   init services
//   const db = getFirestore();

//   //collection ref
//   const colRef = collection(db, 'todos')
//   // console.log(colRef,"colRef");

//   //queries
//   // const q = query(colRef, where("todo", "==", "ad"), orderBy('todo',"desc"))
//   const q = query(colRef, orderBy('createdAt'))

//   //real time collection data, 
//   onSnapshot(colRef, (snapshot) => { //colRef-in yerine q-nu yazsam q-deki query-de yazdigimi gosterecek
//     let todos = [];
//     // console.log(snapshot.docs);
//     snapshot.docs.forEach((doc) => {
//       todos.push({ ...doc.data(), id: doc.id })
//     })

//     let datamap = todos.reverse().map(function (el, i) {
//       // console.log(el.id);
//       return `<div class="d-flex justify-content-between">
//         <div class="bg-primary rounded-2 my-3">${el.todo}</div>
//         <input class="rounded-2 d-none inpClass" type="text" value="">

//           <div class="d-flex justify-content-between g-2">

//             <button  class="bg-danger rounded-2 cursor-pointer delClass" data-id="${el.id}">Delete</button>

//             <button class="bg-warning rounded-2 cursor-pointer editClass"  data-id="${el.id}" data-value="${el.todo}">Edit</button>
          
//           </div>
//         </div>`;
//     }).join("");

//     result.innerHTML = datamap;
//     deleteElement();
//     editElement();

//     console.log(todos);
//   })

//   let btn = document.querySelector("#btn");
//   let inp = document.querySelector("#inp");

//   btn.addEventListener("click", (e) => {        //add to collection
//     e.preventDefault();

//     console.log("click");

//     addDoc(colRef, {
//       todo: inp.value,
//       createdAt: serverTimestamp()

//     })
//       .then(() => {
//         inp.value = "";
//       })

//   })


// function deleteElement() {                                // delete function
//   let delClass = document.querySelectorAll(".delClass");
//   delClass.forEach((delBtn)=>{
//     delBtn.addEventListener("click", function(){
//       deleteItem(delBtn.dataset.id);
//     })
//   })
// }

// function deleteItem(id) {
//   console.log("deleted");

//     const docRef = doc(db, "todos", id)
//       deleteDoc(docRef);
// }


// function editElement() {
//   let editClass = document.querySelectorAll(".editClass");
//     editClass.forEach((editBtn)=>{
//       editBtn.addEventListener("click", function () {       // edit funksiyasi
//         editItem(editBtn.dataset.id)
//   })
// })
// }

// function editItem(id){
//   let inpClass = document.querySelector(".inpClass");
  
//     onValue(colRef, (snapshot) => {
//       console.log(snapshot.val());

//       // const data = snapshot.val();
//       // if (!data) {
//       //   booksDetailTable.classList.add("d-none");
//       //   return;
//       // }
//       // booksDetailTable.classList.remove("d-none");

//       // let arr = Object.entries(data);
//       const docRef = doc(db, "todos", id)

//     // updateDoc(docRef);

//       inpClass.classList.contains("d-none") ? inpClass.classList.remove("d-none") : inpClass.classList.add("d-none") 

//   })};


//! Firebae Firestroe add and delete methods works


    // onSnapshot(colRef, (snapshot) => { //colRef-in yerine q-nu yazsam q-deki query-de yazdigimi gosterecek
  //   let todos = [];
  //   snapshot.docs.forEach((doc) => {
    //     todos.push({ ...doc.data(), id: doc.id })
    //   })
    //   console.log(todos);
    // })

   // del.addEventListener("click", (e)=>{//delete button
  //   e.preventDefault();

  //   const docRef = doc(db, "todos", delInp.value)

  //   deleteDoc(docRef);

  // })


  // function del(i) {   /// silme funksiyasi

  //     data.splice(i, 1);

  //     let datamap = data.reverse().map(function (el, i) {
  //         return ` <div class="d-flex justify-content-between">
  //         <div class="bg-primary rounded-2 my-3">${el}</div>
  //         <div class="d-flex justify-content-between g-2">

  //             <button class="bg-danger rounded-2 cursor-pointer" onclick="del(${i})">Delete</button>
  //             <button class="bg-warning rounded-2 cursor-pointer" onclick="edit(${i})">Edit</button>

  //         </div>
  //     </div>`;
  //     }).join("");

  //     result.innerHTML = datamap;
  // }



  // function update(e) {    //update funksiyasi

  //     console.log(e);

  //     // data.splice(index, 1, elem[0]);

  //     let datamap = data.map(function (el, i) {

  //         return ` <div class="d-flex justify-content-between">  

  //         <div class="bg-primary rounded-2 my-3">${el}</div>

  //             <div  class="d-flex justify-content-between g-2">

  //                 <button class="bg-danger rounded-2 cursor-pointer" onclick="del(${i})">Delete</button>
  //                 <button class="bg-warning rounded-2 cursor-pointer" onclick="edit(${i})">Edit</button>
  //                 </div>

  //             </div>`;
  //     }).join("");

  //     result.innerHTML = datamap;
  // }



  // function edit(index) {   /// edit funksiyasi

  //     let datamap = data.map(function (el, i) {

  //         if (index == i) {

  //             return ` <div class="d-flex justify-content-between"> 
  //             <input id="inp1" class="rounded-2" type="text" value onchange="update(${i})"/>
  //             <div  class="d-flex justify-content-between g-2">

  //                 <button class="bg-danger rounded-2 cursor-pointer" onclick="del(${i})">Delete</button>
  //                 <button class="bg-warning rounded-2 cursor-pointer" onclick="update(${i})">Update</button>
  //                 </div>

  //             </div>`;
  //         } else {
  //             return ` <div class="d-flex justify-content-between">  <div  class="bg-primary rounded-2 my-3">${el}</div>
  //             <div  class="d-flex justify-content-between g-2">

  //                 <button class="bg-danger rounded-2 cursor-pointer" onclick="del(${i})">Delete</button>
  //                 <button class="bg-warning rounded-2 cursor-pointer" onclick="edit(${i})">Edit</button>
  //                 </div>

  //             </div>`;
  //         }

  //     }).join("");

  //     result.innerHTML = datamap;
  // }







  // btn.addEventListener("click", function () { //Add funksiyasi

  //     data.push(inp.value);
  //     console.log(data);

  //     let datamap = data.reverse().map(function (el, i) {
  //         return ` <div class="d-flex justify-content-between">
  //         <div class="bg-primary rounded-2 my-3">${el}</div>
  //         <div class="d-flex justify-content-between g-2">

  //             <button class="bg-danger rounded-2 cursor-pointer" onclick="del(${i})">Delete</button>
  //             <button class="bg-warning rounded-2 cursor-pointer" onclick="edit(${i})">Edit</button>

  //         </div>
  //     </div>`;
  //     }).join("");

  //     result.innerHTML = datamap;
  // })


