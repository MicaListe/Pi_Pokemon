const {Type} = require("../db")
const axios = require("axios")
const URL = "https://pokeapi.co/api/v2/type"

const pokemonTypes = async (req, res) => {
  try {
    const response = await axios(URL);

    if (response) {
      const typesArray = response.data.results
      const messages = []

      for (const typeInfo of typesArray) {
        const typeName = typeInfo.name;
        
        const [type, created] = await Type.findOrCreate({
          where: {
            name: typeName,
          },
        });

        if (created) {
          messages.push(`Tipo de Pokémon "${typeName}" creado`);
        } else {
          messages.push(`Tipo de Pokémon "${typeName}" ya existe en la base de datos`);
        }
      }
      res.status(200).json({ messages })   
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports= pokemonTypes