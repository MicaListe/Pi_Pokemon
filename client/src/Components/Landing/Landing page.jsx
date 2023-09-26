import styles from "./landing.module.css"
// import pikachu from "../../assets/pikachu.jpg"
import { Link } from "react-router-dom"
import pikachu from "../../assets/pikachu.png"
import pika from "../../assets/pika.png"



export default function landing (){
    return(
        <div className={styles.pikachu}> 
            <div className={styles.marco}>
                <h1 className={styles.titulo}>Tarjetas Pokemon!</h1>
                <h2 className={styles.explicacion}> Conoce todos los personajes y sus habilidades</h2>
            </div>
            
            <div>
                <img className={styles.pokemonImg} src={pika} ></img> 
            </div>
           
            {/* <img className={styles.pokemonImg} src={pikachu} alt="Pokemon"></img> */}
            <button className={styles.boton}> <Link to={"/home"}>INGRESAR </Link>
            <span class="button-content"></span>
            </button>
        </div>  
    )
}