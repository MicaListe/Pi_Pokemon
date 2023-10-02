import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Filtros.module.css"
import { filterType, filterOrigin, orderAsc, orderDesc } from "../../Redux/actions"

export default function Filtered({ types, setTypes }) {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.filteredPokemons); // Usar los pokemons filtrados

  const [selectedType, setSelectedType] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');


  // Obtiene los tipos válidos desde las propiedades
  useEffect(() => {
    if (types && types.length > 0) {
      setTypes(types);
    }
  }, [types]);

  const handleTypeChange = async (type) => {
    setSelectedType(type);
    try {
        await dispatch(filterType(type)); // Usar la acción filterType en lugar de filteredPokemonsByType
    } catch (error) {
      console.error(error);
    }
  };

  const handleOriginChange = async (origin) => {
    setSelectedOrigin(origin);
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
      console.log("fuciona")
      await dispatch(orderDesc());

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.filtro} >
      <div className={styles.filtrar}>
        <label className={styles.sub}>Filtrar por Tipo:</label>
        <select  value={selectedType} onChange={(e) => handleTypeChange(e.target.value)}>
          <option value="">Todos</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filt}>
        <label className={styles.subtitulo}>Filtrar por Origen:</label>
        <select  value={selectedOrigin} onChange={(e) => handleOriginChange(e.target.value)}>
          <option value="">Todos</option>
          <option value="API">API</option>
          <option value="DB">Base de Datos</option>
        </select>
      </div>
      
      
      <div className={styles.boton}>
        <button className={styles.asc} onClick={handleOrderAsc}> Ascendente</button>
        <button className={styles.desc} onClick={handleOrderDesc}>Descendente</button>
      </div>
    </div>
  );
}