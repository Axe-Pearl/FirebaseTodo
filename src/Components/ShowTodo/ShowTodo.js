import React from 'react';
import {useState, useEffect} from 'react'
import {doc, collection, query, onSnapshot, deleteDoc} from "firebase/firestore"
import {db} from '../../firebase';

function ShowTodo() {
  const [ allItems, setallItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'todos'))
    onSnapshot(q, (querySnapshot) => {
      setallItems(querySnapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data().item
      })))
    })
  },[]);
  console.log("AllItems are: ", allItems);

  const handleDelete = async (event) => {
    const id = event.target.id;
    console.log("id:", id);
    const targetDelete = doc(db, 'todos', id);
    try{
      await deleteDoc(targetDelete)
    } catch (err) {
      alert(err)
    }
  }
  return (
    <div className='items-container'>
        {
            allItems.map((allItem, index) => {
              return(
                <div className='item'>
                  <span>{allItem.item}</span>
                  <button  id={allItem.id} onClick={handleDelete}>Delete</button> 
                </div>
              )
            })
        }
       <div>
         <span></span>
       </div>
    </div>
  )
}

export default ShowTodo