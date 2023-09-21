import SearchBar from "../Search/SearchBar"
import {Link} from "react-router-dom"
import styles from "./NavBar.module.css"

 export default function NavBar({onSearch}){
    return(
        <div className={styles.menu}>
        <nav>
            <SearchBar onSearch={onSearch}></SearchBar>
            <ul className={styles.botonHome}>
                <li><Link to="/home">Home</Link></li>
            </ul>
            <ul className={styles.botonForm}>
                <li><Link to="/form">Form</Link></li>
            </ul>
        </nav>
        </div>
    )
 }