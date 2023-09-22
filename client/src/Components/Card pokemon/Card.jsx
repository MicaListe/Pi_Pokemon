import {Link} from "react-router-dom"


export default function Card({name,types,image,onClose,id}){
    return(
        <div>
            <Link to={`/detail/${id}`}><h1>{name}</h1></Link>
            <img src={image} alt={"Not found"}/>
            <h2>{types}</h2>
        </div>
    )
}