import SearchBar from "../Search/SearchBar"
import {Link} from "react-router-dom"
import styles from "./NavBar.module.css"

 export default function NavBar({onSearch}){
    return(
        <div className={styles.menu}>
        <nav>
            <SearchBar onSearch={onSearch}></SearchBar>
            <ul>
                <button className={styles.botonHome}><Link to="/home">Home</Link></button>
            </ul>
            <ul >
                <button className={styles.botonForm}><Link to="/form">Create Pokemon</Link></button>
            </ul>
        </nav>
        </div>
    )
 }