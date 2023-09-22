import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card pokemon/Card";

export default function PokeCards({ onClose }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/pokemons?page=${currentPage}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        window.alert(error.message);
        setLoading(false);
      }
    }

    fetchData(); // Carga la primera página al inicio

    // Limpia el estado cuando el componente se desmonta
    return () => {
      setData([]);
    };
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {data.map((element) => (
        <Card
          key={element.id}
          id={element.id}
          name={element.name}
          image={element.image}
          types={element.types}
          onClose={() => onClose(element.id)}
        />
      ))}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}
