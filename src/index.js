// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu4xC1TyFSj5Iqpp2aNl2QVPrHBiJWpHo",
  authDomain: "test2-9a0cc.firebaseapp.com",
  projectId: "test2-9a0cc",
  storageBucket: "test2-9a0cc.appspot.com",
  messagingSenderId: "1061242781557",
  appId: "1:1061242781557:web:5b9eca21caaf2c930ddd3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();


  let btn = document.querySelector("#btn");
  let inp = document.querySelector("#inp");

renderTodos();

function writeUserData(userId, todo) {

const reference = ref(db, 'todos/' + userId);

    set(reference, {
      todo: todo,
    })
}


// writeUserData(Date.now(), "move on");

btn.addEventListener("click", function(){//add function
  writeUserData(Date.now(), inp.value)
  console.log("added");
  renderTodos()
})

const result = document.querySelector("#result");

function renderTodos() {
  const todos = ref(db, "todos");

  onValue(todos, (snapshot) => {
    const data = snapshot.val();

    
    let arr = Object.entries(data);
    console.log(arr);

    let arrMap = arr.map((el, index) => {
        return `
        <div class="d-flex justify-content-between">
        <div class="bg-primary rounded-2 my-3">${el[1].todo}</div>
        <input class="rounded-2 d-none inpClass" type="text" value="">

          <div class="d-flex justify-content-between g-2">

            <button  class="bg-danger rounded-2 cursor-pointer delClass" data-id="${el[0]}">Delete</button>

            <button class="bg-warning rounded-2 cursor-pointer editClass"  data-id="${el.id}" data-value="${el}">Edit</button>
          
          </div>
         </div>
        `;
      })
      .join(" ");

      result.innerHTML = arrMap;
    })}



const deleteBtn = document.querySelectorAll(".delClass");



    function deleteTodo(id) {
      console.log(id);
      let rmv = ref(db, "books/" + id);
  
      remove(rmv).then(() => console.log("Success"));

      renderTodos();
    }


    deleteTodo(1701458018094)













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


