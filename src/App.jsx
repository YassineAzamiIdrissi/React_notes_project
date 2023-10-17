import CreateNote from './Pages/CreateNote' 
import Notes from './Pages/Notes' 
import UpdateNote from './Pages/UpdateNote'
import {Routes,Route} from 'react-router-dom'
import { DataProvider } from './Context/DataContext' 
function App() {
  return (
    <div id="app">
      <DataProvider>
          <Routes>
                <Route path="/" element={<Notes />} />
                <Route path="/newnote" element={<CreateNote />}/> 
                <Route path="/updatenote/:id" element={<UpdateNote />}/>
          </Routes> 
      </DataProvider>     
    </div>
  );
}

export default App;
