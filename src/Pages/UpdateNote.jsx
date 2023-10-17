import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom' 
import {FaSave} from 'react-icons/fa' 
import {AiFillDelete} from 'react-icons/ai' 
import {BiArrowBack} from 'react-icons/bi' 
import { useContext } from 'react' 
import DataContext from '../Context/DataContext'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns' 
import { useNavigate } from 'react-router-dom' 
import {MdWrongLocation} from 'react-icons/md'
const UpdateNote = () => {
  const navigate = useNavigate(); 
  const {data,setData} = useContext(DataContext); 
  const {id} = useParams(); 
  const concernedNote = data.find(note=>note.id == id); 
  const [newTitle,setNewTitle] = useState(''); 
  const [newBody,setNewBody] = useState(''); 
  useEffect(()=>
  {
      if(concernedNote) 
      {
          setNewTitle(concernedNote.title); 
          setNewBody(concernedNote.body); 
      } 
  },[]);  

  const handleUpdate = (id) => 
  {
      if(newTitle && newBody) 
      {
          const title = newTitle; 
          const body = newBody; 
          const date = format(new Date(),"MMMM ,dd yyyy pp");  
          const color = concernedNote.color;
          const updatedNote = {id,title,date,body,color}; 

          const updatedList = data.map(note=>note.id == id ? (updatedNote):(note)); 
          setData(updatedList);  
          navigate("/");   
      } 
      else 
      {
        return; 
      }
  } 
  const handleDelete = () => 
  {
     const updatedList = data.filter(note=>note.id != id); 
     setData(updatedList); 
     navigate("/"); 
  }
  return (
    <section>
            { concernedNote &&
            <>
            <header className="create-note__header">
              <Link className="btn lg" to="/">
                      <BiArrowBack />
              </Link> 
              <button form="creationForm" type="submit" className="btn primary lg" onClick={()=>{handleUpdate(concernedNote.id)}}>{<FaSave />}</button>   
              <button className="btn danger lg" onClick={handleDelete}>{<AiFillDelete />}</button>   
          </header> 
                <form id="creationForm" onSubmit={(e)=>{e.preventDefault()}} className="create-note__form">
                <input placeholder='Title' type="text" required 
                htmlFor="writing a title for the new note" 
                autoFocus 
                value={newTitle} 
                onChange={(e)=>
                {
                  setNewTitle(e.target.value); 
                }}/>
                <textarea placeholder='Body' required value={newBody} onChange={(e)=>{setNewBody(e.target.value)}}></textarea>
                </form>
              </> }
              
              {
                !concernedNote && 
                <div className="noPosts">
                        <span>{<MdWrongLocation />}
                        </span>
                        <h3>Something Went Wrong !! </h3>
                        <Link className="link" to="/"><h3>Back to Home Page</h3>
                        </Link>
                </div>
              }
          
    </section>
  )
}

export default UpdateNote
