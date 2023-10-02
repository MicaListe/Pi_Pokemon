const { Type } = require("../db");
const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/type";

const pokemonTypes = async (req, res) => {
  try {
    const response = await axios(URL);

    if (response) {
      const typesArray = response.data.results.map((typeInfo) => typeInfo.name);

      for (const typeName of typesArray) {
        const [type, created] = await Type.findOrCreate({
          where: {
            name: typeName,
          },
        });

      }

      // Devuelve el arreglo de tipos en lugar del mensaje
      return res.status(201).json(typesArray);
    } else {
      return res
        .status(404)
        .json({ message: "No se encontraron tipos de Pokémon" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = pokemonTypes;