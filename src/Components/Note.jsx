import React from 'react' 
import {Link} from 'react-router-dom'
const Note = ({note}) => {
  return (
    <Link className="note" to={`/updatenote/${note.id}`}style={{backgroundColor:note.color}}>
            <h4>{note.title.length>10 ? (`${note.title.slice(0,10)}...`):(note.title)}</h4> 
            <p>{note.date}</p>
    </Link>
  )
}

export default Note
