
import { initializeApp } from "firebase/app";
import {
  collection,
  onSnapshot,
  getFirestore,
  addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, updateDoc
} from 'firebase/firestore';


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
  onSnapshot(colRef, (snapshot) => { //colRef-in yerine q-nu yazsam q-deki query-de yazdigimi gosterecek
    let todos = [];
    // console.log(snapshot.docs);
    snapshot.docs.forEach((doc) => {
      todos.push({ ...doc.data(), id: doc.id })
    })

    let datamap = todos.reverse().map(function (el, i) {
      // console.log(el.id);
      return ` <div class="d-flex justify-content-between">
        <div class="bg-primary rounded-2 my-3">${el.todo}</div>
          <div class="d-flex justify-content-between g-2">

            <button  class="bg-danger rounded-2 cursor-pointer delClass" data-id="${el.id}">Delete</button>

            <button class="bg-warning rounded-2 cursor-pointer editClass"  data-id="${el.id}" data-value="${el.todo}">Edit</button>
          
          </div>
        </div>`;
    }).join("");

    result.innerHTML = datamap;
    deleteElement();
    editElement();

    console.log(todos);
  })

  let btn = document.querySelector("#btn");
  let inp = document.querySelector("#inp");

  btn.addEventListener("click", (e) => {//add to collection
    e.preventDefault();

    console.log("click");

    addDoc(colRef, {
      todo: inp.value,
      createdAt: serverTimestamp()

    })
      .then(() => {
        inp.value = "";
      })

  })


function deleteElement() {                                // delete function
  let delClass = document.querySelectorAll(".delClass");
  delClass.forEach((delBtn)=>{
    delBtn.addEventListener("click", function(){
      deleteItem(delBtn.dataset.id);
    })
  })
}

function deleteItem(id) {
  console.log("deleted");

    const docRef = doc(db, "todos", id)
      deleteDoc(docRef);
}


function editElement() {
  let editClass = document.querySelectorAll(".editClass");
    editClass.forEach((editBtn)=>{
      editBtn.addEventListener("click", function () {       // edit funksiyasi
        editItem(editBtn.dataset.id)
  })
})
}

function editItem(id){

  onSnapshot(colRef, (snapshot) => { 
    let todos = [];
    snapshot.docs.forEach((doc) => {
      todos.push({ ...doc.data(), id: doc.id })

      console.log(doc.id);
      console.log(id);
      console.log(todos);
      
    })

    const docRef = doc(db, "todos", id)

    updateDoc(docRef);
    
    console.log(docRef+"docRef ");

    let datamap = todos.map(function (el, i) {

      if(id == doc.id) {
                return `<div class="d-flex justify-content-between">
                <div class="bg-primary rounded-2 my-3">${el.todo}</div>
                <input class="rounded-2" type="text" value="">
    
                  <div class="d-flex justify-content-between g-2">
        
                    <button class="bg-danger rounded-2 cursor-pointer delClass" data-id="${el.id}">Delete</button>
        
                    <button class="bg-warning rounded-2 cursor-pointer editClass" data-id="${el.id}" data-value="${el.todo}">Update</button>
                  
                  </div>
                </div>`;
            }else{
              return `<div class="d-flex justify-content-between">
                <div class="bg-primary rounded-2 my-3">${el.todo}</div>
    
                  <div class="d-flex justify-content-between g-2">
        
                    <button class="bg-danger rounded-2 cursor-pointer delClass" data-id="${el.id}">Delete</button>
        
                    <button class="bg-warning rounded-2 cursor-pointer editClass" data-id="${el.id}" data-value="${el.todo}">Edit</button>
                  
                  </div>
                </div>`;
            }
          }).join("");
    
        result.innerHTML = datamap;

  })
}
      

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


