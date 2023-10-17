import { createContext,useState,useEffect } from "react"; 
const DataContext = createContext({}); 
export const DataProvider = ({children})=> 
{
    const [isLoading,setIsLoading] = useState(true); 
    const [remark,setRemark] = useState(''); 
    useEffect((()=>
    {
        setTimeout(()=>
        {
            setIsLoading(false); 
        },[3500]); 
    }),[]);    
    const [data,setData] = useState(JSON.parse(localStorage.getItem("notes")) || []);  
    useEffect(()=>  
    {
        localStorage.setItem("notes",JSON.stringify(data)); 
    },[data]); 
    const randomizeColor = () => 
    {
        const r = Math.random()*200 +15; 
        const g = Math.random()*200 +16; 
        const b = Math.random()*200 +17; 
        
        return `rgb(${r},${g},${b})`; 
    } 
    const [search,setSearch] = useState('');
    const [obtainedResults,setObtainedResults] = useState(''); 
    useEffect(()=>
    {
        const filteredResults = data.filter(note=>note.title.toLowerCase().includes(search.toLowerCase())); 
        setObtainedResults(filteredResults);  

        if(!filteredResults.length) 
        {
            setRemark(`No notes corresponding to ${search}`);
        }
    },[search,data]); 
    return (<DataContext.Provider value={{data,setData,randomizeColor,search,setSearch,obtainedResults,setObtainedResults,isLoading,setIsLoading,remark,setRemark}}>
            {children}
     </DataContext.Provider>)
} 
export default DataContext 