import { useState } from "react";
import styles from "./searchBar.module.css"

export default function SearchBar ({onSearch}){
    const [name,setName]= useState("")

    const handleChange=(event)=>{
        let value= event.target.value //Captura el valor ingresado
        setName(value) //Actualiza el estado
    }
    const handleSearch = () => {
        console.log("Valor de name:", name); // Agrega esta línea de depuración
        onSearch(name);
      }
    return(
        <div>
            <input className={styles.input} type="search" onChange={handleChange} value={name} placeholder="Buscar personaje"></input>
            <button className={styles.btn} onClick={handleSearch}>Buscar</button>
        </div>
    )
}