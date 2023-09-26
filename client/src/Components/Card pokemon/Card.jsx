import {Link} from "react-router-dom"
import styles from "./Card.module.css"


export default function Card({name,types,image,id}){
    return(
        <div className={styles.container}>
            <div className={styles.box}>
            <Link to={`/detail/${id}`}><h1 className={styles.title}>{name}</h1></Link>
            <img className={styles.img} src={image} alt={"Not found"}/>
            <h2 className={styles.h2}>{types}</h2>
            </div>
        </div>
    )
}