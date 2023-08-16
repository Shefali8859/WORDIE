import { Container, Switch } from '@mui/material';
import {withStyles} from '@mui/styles';
import './App.css';
import axios from 'axios';
import {useEffect,useState} from 'react';
import Header from './Components/Header/Header';
import Definitions from './Components/Header/Definitions/Definitions';
import { grey } from '@mui/material/colors';

function App() {
    const[word,setWord]=useState("");
    const[meanings,setMeanings] = useState([]);
    const [category,setCategory] = useState("en");
    const [LightTheme, setLightTheme] = useState(false);

    const DarkMode = withStyles({
      switchBase: {
        color: grey[50],
        "&$checked": {
          color: grey[900],
        },
        "&$checked + $track": {
          backgroundColor: grey[500],
        },
      },
      checked: {},
      track: {},
    })(Switch);

    const dictionaryApi =async()=>{
         try{
            const data=await axios.get(
               `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
            );
           
            setMeanings(data.data);
         }catch(error){
               console.log(error);
         }
    };
    //console.log(meanings);

    useEffect(()=>{
      dictionaryApi();
    }, [word,category]);


  return <div className="App"
   style={{height:'100vh',
   backgroundColor:LightTheme?"#0C356A":"#279EFF",
   color:LightTheme?"#40F8FF":"#40F8FF",
   transition:"all 0.5s linear",
  }}
   >
    <Container 
    maxWidth='md'
     styel={{display:"flex",flexDirection:"column",height:'100vh',justifyContent:"space-evenly"}}
     >
      <div 
      style={{position:"absolute",top:0,right:15,padding:10}}
      >
        <span>{LightTheme?"Dark":"Light"}</span>
        <DarkMode checked={LightTheme}
         onChange={()=>setLightTheme(!LightTheme)}
         />

      </div>
         <Header 
         category={category} 
         setCategory={setCategory} 
         word={word}
         setMeanings={setMeanings}
         setWord={setWord}
         LightTheme={LightTheme}
          />
    {meanings &&(
    <Definitions
     word={word}
      meanings={meanings} 
      LightTheme={LightTheme}
      category={category}/>
    )}
    </Container>
  </div>;
}

export default App;
