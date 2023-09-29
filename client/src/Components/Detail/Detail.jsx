import axios from "axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import styles from "./Detail.module.css"

export default function Detail() {
  const { id } = useParams()
  const [character, setCharacter] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:3001/pokemons/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setCharacter(data)
        } else {
          window.alert("No hay personajes con ese id")
        }
      })
      .catch((error) => {
        console.error(error)
        window.alert("Error del servicio")
      })
      .finally(() => {
        setLoading(false)
      })

  }, [id])

  return (
    <div className={styles.container}>
      <img className={styles.img} src={character.image} alt={character.name} />
      <div className={styles.progress}>
        {loading ? (
          <p>Cargando...</p>
        ) : character.name && (
          <div className={styles.progressBar}>
            <h2 className={styles.name}>{character.name}</h2>
            <div className={styles.skill}>
              <p><b>Hp:</b></p>
              <div className={styles.progressBarContainer}>
                <div className={styles.progressBarFill} style={{ width: `${character.hp}%` }}></div>
                <div className={styles.porcentaje}>{character.hp +"%"}</div>
              </div>
            </div>
            <div className={styles.skill}>
              <p><b>Attack: </b></p>
              <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: `${character.attack}%` }}/>
                  <div className={styles.porcentaje}>{character.attack +"%"}</div>
              </div>
            </div>
            <div className={styles.skill}>
              <p><b>Defense: </b></p>
              <div className={styles.progressBarContainer}>
                <div className={styles.progressBarFill} style={{ width: `${character.defense}%` }}/>
                <div className={styles.porcentaje}>{character.defense +"%"}</div>
              </div>
            </div>
              <div className={styles.skill}>
                <p><b>Speed: </b></p>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: `${character.speed}%` }}/>
                  <div className={styles.porcentaje}>{character.speed +"%"}</div>
                </div>
              </div>
              <div className={styles.skill}>
                <p><b>Height: </b></p>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: `${character.height}%` }}/>
                  <div className={styles.porcentaje}>{character.height +"cm"}</div>
                </div>
              </div>
              <div className={styles.weight}> 
                <div className={styles.skill}>
                  <p><b>Weight: </b></p>
                  <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: `${character.weight}%` }}/>
                  <div className={styles.porcentaje}>{character.weight + "k"}</div>
                </div>
              </div>
            </div> 
          </div>
        )}
      </div>
    </div>
  );
}
    


