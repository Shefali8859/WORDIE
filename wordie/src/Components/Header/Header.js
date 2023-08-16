import React from 'react';
import './Header.css';
import categories from './data/category';
import { MenuItem, TextField, ThemeProvider,createTheme } from '@mui/material';
const Header=({setCategory,category,word,setWord,LightTheme})=>{
    const darkTheme = createTheme({
        palette: {
          primary:{
           main:LightTheme?"#000":"#fff",
          },
          type:LightTheme?"light" : "dark",
        },
      });
      const handleChange=(Language)=>{
               setCategory(Language);
               setWord("");
               
      };
      
    return(
        <div className='header'>
            <span className='title'>{word? word:'Wordie'}</span>
            <div className='inputs'>
            <ThemeProvider theme={darkTheme}>
                <TextField 
                className='search'
                label="Search a Word" 
                  value={word}
                  onChange={(e)=>setWord(e.target.value)}
                variant="standard"
                 />
                <TextField
                className='select'
          select
          label="Language"
          value={category}
          onChange={(e)=> handleChange(e.target.value)}
         
        >
            {categories .map((option)=>(
                 <MenuItem key={option.label} value={option.label}>{option.value}</MenuItem>
            ))}
        </TextField>
            </ThemeProvider>
            </div>
        </div>

    )

};
export default Header;