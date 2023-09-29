import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import Card from "../Card pokemon/Card";
import styles from "./pokeCards.module.css"
import Filtered from "../Filtros/Filtros";
import { filterType, filterOrigin, orderAsc, orderDesc, FETCH_POKEMONS } from "../../Redux/actions"

export default function PokeCards(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [types, setTypes] = useState([]);
  const pokemons = useSelector((state) => state.filteredPokemons);
  const dispatch = useDispatch();

  
  useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`http://localhost:3001/pokemons?page=${currentPage}`);
          dispatch({ type: FETCH_POKEMONS, payload: response.data });
          setData(response.data);
          setLoading(false);
        } catch (error) {
          window.alert(error.message);
          setLoading(false);
        }
      }
    async function fetchTypes() {
      try {
        const response = await axios.get("http://localhost:3001/types");
        setTypes(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData(); // Carga la primera página al inicio
    fetchTypes()

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

  const handleTypeChange = async (type) => {
    try {
      await dispatch(filterType(type));
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleOriginChange = async (origin) => {
    try {
      await dispatch(filterOrigin(origin));
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleOrderAsc = async () => {
    try {
      await dispatch(orderAsc());
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleOrderDesc = async () => {
    try {
      await dispatch(orderDesc());
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <div className={styles.loader}/>;
  }

  return (
    <div className={styles.FlexContainer}>
     <Filtered types={types} setTypes={setTypes}></Filtered>
      {data.map((element) => (
        <Card
          key={element.id}
          id={element.id}
          name={element.name}
          image={element.image}
          types={element.types}
          
        />
      ))}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}
