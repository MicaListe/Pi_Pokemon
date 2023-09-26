import { useState } from "react"
import styles from "./Form.module.css"

export default function Form(){

    

    const [data, setData]= useState({
        name:"",
        image:"",
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0
    })

    const [errors, setErrors]= useState({
        name:"",
        image:"",
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0
    })

    const handleChange= (event)=>{
        const property= event.target.name;
        const value= event.target.value;
        setErrors(validation({...data,[property]:value}))
        setData({...data,[property]:value})
    }


    return(
        <form onSubmit={handleSubmit}>
            <div>
                <input required="true" placeholder="Nombre" type="text" name="name" value={""} onChange={handleChange}></input>
                <span>{""}</span>
            </div>
            <div>
                <input required="true" placeholder="Imagen" type="file" name="image" value={""} onChange={handleChange}></input>
                <span>{""}</span>
            </div>
            <div>
                <input required="true" placeholder="Hp" type="number" name="hp" value={""} onChange={handleChange}></input>
                <span>{""}</span>
            </div>
            <div>
                <input required="true" placeholder="Ataque" type="number" name="attack" value={""} onChange={handleChange}></input>
                <span>{""}</span>
            </div>
            <div>
                <input required="true" placeholder="Defensa" type="number" name="defense" value={""} onChange={handleChange}></input>
                <span>{""}</span>
            </div>
            <div>
                <input required="true" placeholder="Velocidad" type="number" name="speed" value={""} onChange={handleChange}></input>
                <span>{""}</span>
            </div>
            <div>
                <input required="true" placeholder="Altura" type="number" name="height" value={""} onChange={handleChange}></input>
                <span>{""}</span>
            </div>
            <div>
                <input required="true" placeholder="Peso" type="number" name="height" value={""} onChange={handleChange}></input>
                <span>{""}</span>
            </div>
            
            <button type="submit">Crear</button>
        </form>
    )
}