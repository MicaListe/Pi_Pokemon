import axios from "axios"
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import styles from "./Detail.module.css"


export default function Detail(){
    
       const {id} = useParams() 
       const [character, setCharacter]= useState([])
       const [loading, setLoading]= useState(true)

       useEffect(()=>{
            axios.get(`http://localhost:3001/pokemons/${id}`).then(({data})=>{
                if(data.name){
                    setCharacter(data)
                }else{
                    window.alert("No hay personajes con ese id")
                }   
            })

            .catch((error)=>{
                console.error(error)
                window.alert("Error del servicio")
            })

            .finally(()=>{
                setLoading(false)
            })

        },[id])
        
        return(
        <div >
            {loading ? (
                <p></p>
            ):
            character.name && (
                <div>
                <h2>{character.name}</h2>
                <p><b>Attack: </b>{character.attack}</p>
                <p><b>Defense: </b>{character.defense}</p>
                <p><b>Speed: </b>{character.speed}</p>
                <p><b>Height: </b>{character.height}</p>
                <p><b>Weight: </b>{character.weight}</p>
                <img src={character.image}></img>
                </div>
            )}
        </div>
    ) 
}