import { useState } from 'react'
import './App.css'
import axios from "axios"
import { Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import Form from "../src/Components/Form/Form"
import Detail from "../src/Components/Detail/Detail" 
import PokeCards from './Components/Cards pokemon/pokeCards'
import Landing from "../src/Components/Landing/Landing page"
import NavBar from '../src/Components/NavBar/Navbar'
import Filtros from "../src/Components/Filtros/Filtros"


function App() {
  const location= useLocation()
  const navigate= useNavigate()
  const[characters, setCharacters] = useState([])

  async function onSearch(name){
     
    try{
        const minuscula= name.toLowerCase()
        const response= await axios.get(`http://localhost:3001/pokemons-name?name=${minuscula}`)
  
        if(response.data && response.data.name){
          const pokemonName= response.data.name.toLowerCase()
          const personajeExist= characters.some((character)=>character.name === pokemonName)
          if (response.data && response.data.id) { 
            navigate(`/Detail/${response.data.id}`)
          }
          if (!personajeExist){
            setCharacters((char)=>[...char, { name: pokemonName }])
          }else{
            window.alert("El personaje ya fue agregado")
          }
          
        }else{
          window.alert("No existe el personaje con ese nombre")
        }
      }catch(error){
      window.alert("Error del servidor") 
    }
  }
  
  
  // function onClose(id){
  //   const {data}= axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
  //   setCharacters(characters.filter((characters)=>characters.id !== data.id))
  // }

  return (
    <div>
      {location.pathname!=="/" && <NavBar onSearch={onSearch}/>}
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<PokeCards characters={characters}  />}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/form" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App
