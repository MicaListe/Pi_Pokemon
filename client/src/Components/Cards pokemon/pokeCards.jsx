import Card from "../Card pokemon/Card"

export default function PokeCards({characters, onClose}){
    return(
        <div >
        {characters.map(element=>(
            <Card
            key={element.id}
            id={element.id}
            name={element.name}
            attack={element.attack}
            defense={element.defense}
            speed={element.speed}
            types={element.types}
            height={element.height}
            weight={element.weight}
            image={element.image}
            onClose={()=>onClose(element.id)}
            />
        ))}
        </div>
    )
}