import React,{useState} from 'react'
import {Link} from 'react-router-dom' 
import {BiArrowBack} from 'react-icons/bi'
import {format} from 'date-fns' 
import { useContext } from 'react' 
import DataContext from '../Context/DataContext'
import { useNavigate } from 'react-router-dom'
const CreateNote = () => { 
  const {data,setData,randomizeColor} = useContext(DataContext); 
  const navigate = useNavigate(); 
  const [title,setTitle] = useState(''); 
  const [body,setBody] = useState('');  
  const [titleWitness,setTitleWitness] = useState(false); 
  const [bodyWitness,setBodyWitness] = useState(false);  
  const handleAdd = (e)=> 
  {
      e.preventDefault(); 
      if(title && body) 
      {
           const id = data.length ? ((data[0].id)+1) : 1; 
           const date = format(new Date(),"MMMM ,dd yyyy pp"); 
           const color = randomizeColor();  
           const newNote = {id,title,date,body,color};  
           const updatedList = [newNote,...data]; 
           setData(updatedList);              
           navigate("/");
      } 
       else 
       {
          if(!title.length)
          setTitleWitness(true); 

          if(!body.length)
          setBodyWitness(true);  
       }
  }
  return (
    <section>
          <header className="create-note__header">
              <Link className="btn lg" to="/">
                      <BiArrowBack />
              </Link> 
              <button form="creationForm" onClick={handleAdd} type="submit" className="btn primary lg">Add</button>   
          </header> 
          <form id="creationForm" className="create-note__form">
                <input placeholder='Title' type="text" required 
                htmlFor="writing a title for the new note" 
                autoFocus
                value={title} 
                style={titleWitness && !title.length ? {border:'red 2px dashed'}:null}
                onChange={(e)=>
                {
                  setTitle(e.target.value)
                }}/>
                <textarea placeholder='Body' style={bodyWitness && !body.length ? {border:"red 2px dashed "}:null} required value={body}onChange={(e)=>{setBody(e.target.value)}}></textarea>
          </form>
    </section>
  )
}

export default CreateNote
