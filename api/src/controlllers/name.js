const { Pokemon } = require("../db");
const axios = require("axios");

const { Op } = require("sequelize");

const name = async (req, res) => {
  const { name } = req.query;
  
  try {
    // Buscar en la base de datos
    const dbPokemons = await Pokemon.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

        if (dbPokemons) {
            return res.status(200).json(dbPokemons);
        }else{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);  
            const pokemonData= response.data
            const pokemons={
                id: pokemonData.id,
                name: pokemonData.name, 
                types: pokemonData.types.map((type)=> type.type.name),
                hp: pokemonData.stats[0].base_stat, 
                attack:pokemonData.stats[1].base_stat, 
                defense: pokemonData.stats[2].base_stat, 
                speed: pokemonData.stats[5].base_stat, 
                height: pokemonData.height, 
                weight: pokemonData.weight ,
                image: pokemonData.sprites.other.dream_world.front_default
            }
            if(pokemons){
                res.json(pokemons)
            }else{
                res.stats(404).json({message:"No se encontro el Pokemon"})
            }
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en la búsqueda del pokemon." });
    }
};

module.exports = name;






