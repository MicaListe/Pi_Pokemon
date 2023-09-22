const axios = require("axios");


const POKEMON_SIZE = 12;

const allPokemons = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const startIndex = (page - 1) * POKEMON_SIZE;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${startIndex}&limit=${POKEMON_SIZE}`);

    if (response) {
      const pokemonList = response.data.results;
      const pokemonPromises = pokemonList.map((pokemon) =>
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

          const datosPokemon = {
            id: id,
            name: name,
            types: types.map((type) => type.type.name),
            hp: stats[0].base_stat,
            attack: stats[1].base_stat,
            defense: stats[2].base_stat,
            speed: stats[5].base_stat,
            height: height,
            weight: weight,
            image: sprites.front_default,
          };

          return datosPokemon;
        })
      );

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

