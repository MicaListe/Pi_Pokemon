import styles from "./landing.module.css"
import pikachu from "../../assets/pikachu.jpg"
import { Link } from "react-router-dom"
// import animal from "../../assets/x.jpg"


export default function landing (){
    return(
        <div className={styles.pikachu}>
            <img className={styles.pokemonImg} src={pikachu} alt="Pokemon"></img>
            <button className={styles.boton}> <Link to={"/home"}>INGRESAR </Link></button>
        </div>  
    )
}