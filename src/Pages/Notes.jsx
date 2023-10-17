import React,{useState,useEffect} from 'react' 
import DataContext from '../Context/DataContext' 
import { useContext } from 'react' 
import Note from '../Components/Note' 
import {BiSearchAlt2} from 'react-icons/bi' 
import {AiOutlineClose} from 'react-icons/ai' 
import {AiOutlinePlus} from 'react-icons/ai' 
import {Link} from 'react-router-dom'  
const Notes = () => {
    
  const {remark,search,setSearch,obtainedResults,isLoading} = useContext(DataContext); 
  const [actifInput,setActifInput] = useState(false); 
  return (
    <section>
           <header className="notes__header">
                    {!actifInput && <h2>Notes</h2>} 
                    {actifInput && <input type="text" required placeholder="Search a note..." autoFocus 
                    value={search} onChange={(e)=>{setSearch(e.target.value)}} /> }
                    <button className="btn" onClick={()=>{setActifInput(prev=>!prev)}}>
                        {actifInput && <AiOutlineClose />} 
                        {!actifInput && <BiSearchAlt2 />}
                    </button>
           </header>
           <div className={obtainedResults.length ? "notes__container":"notes__container-if-empty"}>
                {isLoading && <h3  style={{color:'orange',whiteSpace:'nowrap',textAlign:'center',marginTop:'12rem',fontSize:'1.1rem'}} className={obtainedResults.length ? null:('lessMargin')}>Notes are being loaded, please wait...</h3>}
                {
                   !isLoading && (obtainedResults.length ? (
                      obtainedResults.map(note=><Note key={note.id} note={note}/>)
                  ):
                  ((remark.length && search.length) ? (<h3 style={{color:'yellow',fontSize:'1rem'}}>{remark.length > 35 ? (`${remark.slice(0,35)}...`):(remark)}</h3>):(<h3 style={{color:'steelblue'}}>No items added yet </h3>)
                  )
                  
                  )
                }
           </div> 
           <Link className="btn add__btn" to="/newnote">
                  <AiOutlinePlus />  
           </Link>
    </section>
  )
}

export default Notes
