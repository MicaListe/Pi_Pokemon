import {Link} from "react-router-dom"


export default function Card({name,types,image,onClose,id}){
    return(
        <div>
            <button onClick={onClose}>X</button>
            <Link to={`/Detail/${id}`}><h2>{name}</h2></Link>
            <img src={image} alt={"Not found"}/>
            <h2>{types}</h2>
        </div>
    )
}