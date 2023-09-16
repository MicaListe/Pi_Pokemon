const axios = require("axios");
const { Pokemon } = require("../db");
const URL = "https://pokeapi.co/api/v2/pokemon";

const allPokemons = async (req, res) => {
    try {
      let response = await axios(URL);
      if (response) {
        const pokeList = response.data.results;
  
        const pokemonPromises = pokeList.map((pokemon) =>
          axios.get(pokemon.url).then(async (response) => {
            const {
              id,
              name,
              types,
              stats,
              height,
              weight,
              sprites,
            } = response.data;
  
            const datosPokemon= {
              id: id,
              name: name,
              types: types.map((type) => type.type.name),
              hp: stats[0].base_stat,
              attack: stats[1].base_stat,
              defense: stats[2].base_stat,
              speed: stats[5].base_stat,
              height: height,
              weight: weight,
              image: sprites.other.dream_world.front_default,
            };
  
            await Pokemon.create({
              id: datosPokemon.id,
              name: datosPokemon.name,
              hp: datosPokemon.hp,
              defense: datosPokemon.defense,
              attack: datosPokemon.attack,
              speed: datosPokemon.speed,
              height: datosPokemon.height,
              weight: datosPokemon.weight,
            });
  
            return datosPokemon; // Devuelve los datos del Pokémon procesado
          })
        );
  
        // Espera a que se resuelvan todas las promesas de Pokémon antes de enviar una respuesta
        const pokemonData = await Promise.all(pokemonPromises);
  
        res.status(200).json(pokemonData);
      } else {
        res.status(404).json("Error: " + JSON.stringify(response));
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = allPokemons;