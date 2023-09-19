import { useState } from 'react'
import './App.css'
import axios from "axios"
import { Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import Form from "../src/Components/Form/Form"
import Detail from "../src/Components/Detail/Detail" 
import PokeCards from './Components/Cards pokemon/pokeCards'
import Landing from "../src/Components/Landing/Landing page"
import NavBar from '../src/Components/NavBar/Navbar'


function App() {
  const location= useLocation()
  const[characters, setCharacters] = useState([])
  async function onSearch(name){
    try{
        const {data}= await axios(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        if(data.name === name.toLowerCase()){
          // const personajeExist= personaje.find((perso)=>perso.name === data.name)
          // return personajeExist
          // if (!personajeExist){
          //   setPersonaje((personaje)=>[...personaje,data])
          // }else{
          //   window.alert("El personaje ya fue agregado")
          // }
          return data
        }else{
          window.alert("No existe el personaje con ese nombre")
        }
      }catch(error){
      window.alert(error.response.data) 
    }
  }
  
  function onClose(id){
    const {data}= axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
    setCharacters(characters.filter((characters)=>characters.id !== data.id))
  }

  return (
    <div>
      {location.pathname!=="/" && <NavBar onSearch={onSearch}/>}
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<PokeCards characters={characters} onClose={onClose}/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/form" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App
