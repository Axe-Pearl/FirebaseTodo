import React from 'react';
import {useState, useEffect} from 'react';
import {doc, collection, query, onSnapshot, orderBy, deleteDoc, updateDoc} from "firebase/firestore"
import {db} from '../../firebase';
import { createContext } from 'react';
import AddTodo from '../AddTodo/AddTodo';
const Allitems = createContext();

function ShowTodo() {
  const [ allItems, setallItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('index','asc'))
    onSnapshot(q, (querySnapshot) => {
      setallItems(querySnapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data().item,
        index: doc.data().index
      })))
    })
  },[]);
  console.log("AllItems are: ", allItems);

  const handleDelete = async (event) => {
    const id = event.target.id;
    console.log("id:", id);
    const targetDelete = doc(db, 'todos', id);
    console.log(targetDelete)
    try{
      await deleteDoc(targetDelete)
    } catch (err) {
      alert(err)
    }
  }

  const shift = async (type , item) => {
    const current_id = item.id;
    const current_index = item.index;
    let targetid, targetindex;
    if(type === "up"){
      targetid = allItems[current_index - 1].id;
      targetindex = allItems[current_index - 1].index;
    }
    else{
      targetid = allItems[current_index + 1].id;
      targetindex = allItems[current_index + 1].index;
    }

      const currentTarget = doc(db, "todos", current_id);  
      const Target = doc(db, "todos", targetid);
      
      try{
        await updateDoc(Target,{
          index: current_index
        })
      }catch(err){
        console.log("Error2:", err);
      }
      try{
        await updateDoc(currentTarget,{
          index: targetindex
        })
      }catch(err){
        console.log("Error1: ", err)
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
                  <button  value = "up" index = {allItem.index} onClick = {()=> shift("up",allItem) }  disabled ={index === 0}>Up</button>
                  <button  value = "down" index = {allItem.index} onClick = {()=> shift("down",allItem) } disabled ={index === ((allItems.length) - 1)}>Down</button>
                </div>
              )
            })
        }
        <Allitems.Provider value= {allItems.length}>
             <AddTodo />
        </Allitems.Provider>
    </div>
  )
}

export default ShowTodo;
export { Allitems };