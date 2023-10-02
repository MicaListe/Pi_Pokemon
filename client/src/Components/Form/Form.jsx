import { useState } from "react"
import { useEffect } from "react"
import styles from "./Form.module.css"
import axios from "axios"
import validation from "./validations"
import ash from "../../assets/ash.png"
import burbuja from "../../assets/burbuja.png"

export default function Form(){

    const initialForm={
        name:"",
        image:null,
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0,
        hp:0,
        types:[]
    }
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get(`http://localhost:3001/types`);
            setData(response.data);
          } catch (error) {
            window.alert(error.message);
          }
        }
        fetchData();
    },[]);

    const [data, setData]= useState(initialForm)

    const [errors, setErrors]= useState({})
    const handleChange= (event)=>{
        const property= event.target.name;
        const value= event.target.value;
        console.log(property)
        console.log(value)
        setErrors(validation({...data,[property]:value}))
        setData({...data,[property]:value})
    }

    const [selectedType, setSelectedTypes]= useState([])
    const handleChangeSelect = (event)=>{
        const type= event.target.value;
        const checked= event.target.checked
        
        if(checked){
            setSelectedTypes([type, ...selectedType]) //Agrega los tipos seleccionados al array
           
        }else{
            setSelectedTypes(selectedType.filter((tipos)=> tipos !== type)) //Elimina del array los tipos
        }
    }
    console.log(data)

    const handleSubmit = async(event)=>{
        event.preventDefault()
        const updatedData = { types: selectedType, ...data }
        setData([updatedData])
        console.log(data)
        try{
            await axios.post(`http://localhost:3001/pokemons`, updatedData) 
        }catch(error){
           window.alert("Error al crear el personaje")
        }
    }

    return(
        <form className={styles.f} onSubmit={handleSubmit}>
            <div className={styles.formMarketing}>
                <h2 className={styles.titulo}>Pókemon</h2>
                <input className={styles.formInput} placeholder="Nombre" type="text" name="name" value={data.name} onChange={handleChange}></input>
                <span className={styles.span}>{errors.name}</span>
                
            </div>
            <div  className={styles.formMarketing}>
                <input className={styles.formInput} placeholder="Imagen" type="text" name="image" value={data.image} onChange={handleChange}></input>
                <span className={styles.span}>{errors.image}</span>
            </div>
            <div  className={styles.formMarketing}>
                <input className={styles.formInput} placeholder="Hp" type="number" name="hp" value={data.hp} onChange={handleChange}></input>
                <span className={styles.span}>{errors.hp}</span>
            </div>
            <div  className={styles.formMarketing}>
                <input className={styles.formInput} placeholder="Ataque" type="number" name="attack" value={data.attack} onChange={handleChange}></input>
                <span className={styles.span}>{errors.attack}</span>
            </div>
            <div  className={styles.formMarketing}>
                <input className={styles.formInput} placeholder="Defensa" type="number" name="defense" value={data.defense} onChange={handleChange}></input>
                <span className={styles.span}>{errors.defense}</span>
            </div>
            <div  className={styles.formMarketing}>
                <input className={styles.formInput} placeholder="Velocidad" type="number" name="speed" value={data.speed} onChange={handleChange}></input>
                <span className={styles.span}>{errors.speed}</span>
            </div>
            <div  className={styles.formMarketing}>
                <input className={styles.formInput} placeholder="Altura" type="number" name="height" value={data.height} onChange={handleChange}></input>
                <span className={styles.span}>{errors.height}</span>
            </div>
            <div className={styles.formMarketing}>
                <input className={styles.formInput} placeholder="Peso" type="number" name="weight" value={data.weight} onChange={handleChange}></input>
                <span className={styles.span}>{errors.weight}</span>
            </div>
            <div className={styles.form}>
                    <img className={styles.img} src={ash}></img>
            </div>
            <div className={styles.form}>
                    <img className={styles.bur} src={burbuja}></img>
                    <h2 className={styles.h2}>Create a Pókemon!</h2>
            </div>
            


            {/* <label className={styles.container}>
                <input type="checkbox" defaultChecked={false} value= "Normal" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Normal
            </label> */}
            {/* <label className={styles.container}>
                <input type="checkbox" defaultChecked={false} value= "Fighting" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Fighting
            </label> */}
            <label className={styles.cbx}>
                <input className={styles.inp} type="checkbox" defaultChecked={false} value= "Flying" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                <div className={styles.p}>Flying </div>
            </label>
            <label className={styles.cbx}>
                <input className={styles.inp} type="checkbox" defaultChecked={false}  value= "Poison" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                <div className={styles.p}>Poison </div>
            </label>
            {/* <label className={styles.container}>
                <input type="checkbox" defaultChecked={false}  value= "Ground" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Ground
            </label> */}
            {/* <label className={styles.container}>
                <input type="checkbox" defaultChecked={false}  value= "Rock" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Rock
            </label> */}
            <label className={styles.cbx}>
                <input className={styles.inp} type="checkbox" defaultChecked={false}  value= "Bug" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                <div className={styles.p}>Bug </div>
            </label>
            {/* <label className={styles.container}>
                <input type="checkbox" defaultChecked={false}  value= "Ghost" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Ghost
            </label>
            <label className={styles.container}>
                <input type="checkbox" defaultChecked={false}  value= "Steel" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Steel
            </label> */}
            {/* <label className={styles.container}>
                <input type="checkbox" defaultChecked={false}  value= "Fighting" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Fighting
            </label> */}
            <label className={styles.cbx}>
                <input className={styles.inp} type="checkbox" defaultChecked={false}  value= "Fire" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                <div className={styles.p}>Fire </div>
            </label>
            <label className={styles.cbx}>
                <input className={styles.inp} type="checkbox" defaultChecked={false} value= "Water" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                <div className={styles.p}>Water </div>
            </label>
            
            <label className={styles.cbx}>
                <input className={styles.inp} type="checkbox" defaultChecked={false} value= "Grass" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                <div className={styles.p}>Grass </div>
                
            </label>
            {/* <label className={styles.container}>
                <input type="checkbox" defaultChecked={false} value= "Electric" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Electric
            </label>
            <label className={styles.container}>
                <input type="checkbox" defaultChecked={false} value= "Psychic" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Psychic
            </label>
            <label className={styles.container}>
                <input type="checkbox" defaultChecked={false} value= "Ice" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Ice
            </label>
            <label className={styles.container}>
                <input type="checkbox" defaultChecked={false} value= "Dragon" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Dragon
            </label> */}
            {/* <label className={styles.container}>
                <input type="checkbox" defaultChecked={false} value= "Dark" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Dark
            </label>
            <label className={styles.container}>
                <input type="checkbox" defaultChecked={false} value= "Fairy" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Fairy
            </label> */}
            {/* <label className={styles.container}>
                <input type="checkbox" defaultChecked={false} value= "Unknown" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Unknown
            </label>
            <label className={styles.container}>
                <input type="checkbox" defaultChecked={false} value= "shadow" onChange={handleChangeSelect}></input>
                <div className={styles.checkmark}></div>
                Shadow
            </label> */}
            <button className={styles.boton} type="submit">Crear</button>
            
        </form>
    )
}