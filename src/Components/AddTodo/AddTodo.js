import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase.js';
import "./AddTodo.css";

function AddTodo() {
  const [item, setItem] = useState();
  const handleSubmit = async()=>{
     if(item !== ""){
        await addDoc(collection(db, "todos"),{
           item
        });
     }
     else{
       alert("Item can not be empty");
     }
     setItem("");
  }
  return (
    <div className=''>
         <div className='addItem'>
          <input type= "text" placeholder = "Add Item" className='item' onChange={(e)=> setItem(e.target.value)} value = {item}></input>
          <button onClick={ handleSubmit }>Add Item</button>
         </div>
    </div>
  )
}

export default AddTodo