const axios = require("axios");
const { Pokemon, Type } = require("../db");

const detailPokemon = async (req, res) => {
  try {
    const id = req.params.id;

    if (esUUIDv4(id)) {
      const existingPokemon = await Pokemon.findOne({ where: { id: id } });

      if (existingPokemon) {
        const types = await Type.findAll({
          attributes: ["name"],
          include: {
            attributes: [],
            model: Pokemon,
            where: { id: id },
          },
        });

        const pokemonData = {
          ...existingPokemon.dataValues,
          types: types.map((type) => type.name),
        };

        res.status(200).json(pokemonData);
      } else {
        res.status(404).json({ message: "Not found in database" });
      }
      console.log("hola",pokemonData)
    } else if (esEntero(id)) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

      if (response.status === 200) {
        const pokemonData = response.data;
        const pokemon = {
          id: pokemonData.id,
          name: pokemonData.name,
          types: pokemonData.types.map((type) => type.type.name),
          hp: pokemonData.stats[0].base_stat,
          attack: pokemonData.stats[1].base_stat,
          defense: pokemonData.stats[2].base_stat,
          speed: pokemonData.stats[5].base_stat,
          height: pokemonData.height,
          weight: pokemonData.weight,
          image: pokemonData.sprites.other.dream_world.front_default,
        };

        res.status(200).json(pokemon);
      } else {
        res.status(404).json({ message: "Not found in API" });
      }
    } else {
      res.status(400).json({ message: "Invalid ID" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }

};

// Funciones de comprobación de UUID y entero
function esUUIDv4(id) {
  const uuidv4Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidv4Pattern.test(id);
}

function esEntero(id) {
  return /^\d+$/.test(id);
}

module.exports= detailPokemon