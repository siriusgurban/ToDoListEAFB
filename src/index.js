//your code

import {initializeApp } from "firebase/app";
import {
  collection,
  onSnapshot,
  getFirestore,
  addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp
} from 'firebase/firestore';

document.addEventListener("DOMContentLoaded", () => {

const firebaseConfig = {
    apiKey: "AIzaSyCchalPMe4QFZXzkG8A7L1h1CtRXEZOook",
    authDomain: "todolisteafb.firebaseapp.com",
    projectId: "todolisteafb",
    storageBucket: "todolisteafb.appspot.com",
    messagingSenderId: "352113117273",
    appId: "1:352113117273:web:e438ea9c4d7d93cb678948"
  };


//   init firebase app
initializeApp(firebaseConfig);

//   init services
const db = getFirestore();

//collection ref
const colRef = collection(db, 'todos')

//queries
// const q = query(colRef, where("todo", "==", "ad"), orderBy('todo',"desc"))
const q = query(colRef, orderBy('createdAt'))

//real time collection data, 
onSnapshot(colRef, (snapshot)=>{ //colRef-in yerine q-nu yazsam q-deki query-de yazdigimi gosterecek
  let todos = [];
  // console.log(snapshot.docs);
  snapshot.docs.forEach((doc)=>{
    todos.push({...doc.data(), id: doc.id})
  })

  
  
  let datamap = todos.reverse().map(function (el, i) {
    console.log(el.id);
        return ` <div class="d-flex justify-content-between">
        <div class="bg-primary rounded-2 my-3">${el.todo}</div>
        <div class="d-flex justify-content-between g-2">

        <button id="del" class="bg-danger rounded-2 cursor-pointer" onclick="dele(${el.id})">Delete</button>

        <button class="bg-warning rounded-2 cursor-pointer" onclick="edit(${i})">Edit</button>
        
        </div>
        </div>`;
    }).join("");
    
    result.innerHTML = datamap;
    
    
    console.log(todos);
  })

  
  let btn = document.querySelector("#btn");
  let addPlace = document.querySelector("#addPlace");
  let inp = document.querySelector("#inp");
  
  
  btn.addEventListener("click", (e)=>{//add to collection
    e.preventDefault();
    
    addDoc(colRef, {
    todo: inp.value,
    createdAt: serverTimestamp()
  })
  .then(()=>{
    inp.value = "";
  })
  
})


let del = document.querySelector("#del");
let delInp = document.querySelector("#delInp");

// del.addEventListener("click", (e)=>{//delete button
//   e.preventDefault();

//   const docRef = doc(db, "todos", delInp.value)

//   deleteDoc(docRef);

// })

// del.addEventListener("click",  del(el) );

function dele(id){//delete button
  // e.preventDefault();
  
  const docRef = doc(db, "todos", id)
  
  deleteDoc(docRef);
  
}


// console.log("salam");

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
  
  
});