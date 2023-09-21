import Card from "../Card pokemon/Card"
import axios from "axios"
import { useState, useEffect } from "react"



    export default function PokeCards({ onClose }) {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
      
        useEffect(() => {
          async function fetchData() {
            try {
              const response = await axios.get("http://localhost:3001/pokemons");
              setData(response.data); //Actualiza data
              setLoading(false); //Cambia el estado de "loading" como falso
            } catch (error) {
              window.alert(error.message);
              setLoading(false);
            }
          }
      
          fetchData(); //Ejecuta la funcion declarada
        }, []);
      
        if (loading) { //si response carga resultados
          return(
          <div> 
          <p>Cargando...</p>
        
          </div>
          )
        }
      
        return (
          <div>
            {data.map((element) => (
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
                onClose={() => onClose(element.id)}
              />
            ))}
          </div>
        );
  }
    
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "../Card pokemon/Card";

// export default function PokeCards({ onClose }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [nextPage, setNextPage] = useState(null);
//   const [prevPage, setPrevPage] = useState(null);
//   const [offset, setOffset] = useState(0);

//   useEffect(() => {
//     async function fetchData(offsetValue) {
//       try {
//         let url = "http://localhost:3001/pokemons";

//         if (offsetValue) {
//           url = `http://localhost:3001/pokemons?offset=${offsetValue}&limit=20`;
//         }

//         const response = await axios.get(url);

//         setData(response.data.results);
//         setNextPage(response.data.next);
//         setPrevPage(response.data.previous);
//         setLoading(false);
//       } catch (error) {
//         window.alert(error.message);
//         setLoading(false);
//       }
//     }

//     fetchData(offset);

//     return () => {
//       setNextPage(null);
//       setPrevPage(null);
//     };
//   }, [offset]);

//   const handleNextPage = () => {
//     if (nextPage) {
//       if (offset + 20 <= 240) {
//         setOffset(offset + 20);
//       } else {
//         window.alert("No se pueden cargar más de 240 Pokémones.");
//       }
//     }
//   };

//   const handlePrevPage = () => {
//     if (prevPage) {
//       const newOffset = offset - 20;
//       if (newOffset < 0) {
//         setOffset(0);
//       } else {
//         setOffset(newOffset);
//       }
//     }
//   };

//   if (loading) {
//     return <div>Cargando...</div>;
//   }

//   return (
//     <div>
//       {data.map((element) => (
//         <Card
//           key={element.name}
//           id={element.url}
//           name={element.name}
//           onClose={() => onClose(element.id)}
//         />
//       ))}
//       <div>
//         <button onClick={handlePrevPage} disabled={!prevPage}>
//           Página Anterior
//         </button>
//         <button onClick={handleNextPage} disabled={!nextPage}>
//           Página Siguiente
//         </button>
//       </div>
//     </div>
//   );
// }