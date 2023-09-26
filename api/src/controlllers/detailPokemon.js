const axios= require("axios")
const {Pokemon,Type }= require("../db")

const detailPokemon = async (req,res)=>{
    try {
        const id = req.params.id;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        if(response.status===200){
          const pokemonData = response.data
          const pokemon={
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

          const agregarTypes = Pokemon.findOne({
            where: {id},
            include: {
              // attributes: ["name"],
              model: Type,
              through: {
                attributes: [],
              },
            } 
            //  return agregarTypes  
          })
        res.json(pokemon); 
         
        }else {
          const buscar= await Pokemon.findOne({where: {id:id}})
          if(buscar){
            res.status(200).json(buscar)
          }else{
            res.status(404).json({message: "Not found"}) 
          }
        }
          
        
         
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al buscar el Pokemon.' });
    }
}

module.exports= detailPokemon

// const axios = require("axios");
// const { Pokemon, Type } = require("../db");

// const detailPokemon = async (req, res) => {
//   try {
//     const id = req.params.id;

//     if (esUUIDv4(id)) {
//       const existingPokemon = await Pokemon.findOne({ where: { id: id } });

//       if (existingPokemon) {
//         const types = await Type.findAll({
//           attributes: ["name"],
//           include: {
//             attributes: [],
//             model: Pokemon,
//             where: { id: id },
//           },
//         });

//         const pokemonData = {
//           ...existingPokemon.dataValues,
//           types: types.map((type) => type.name),
//         };

//         res.status(200).json(pokemonData);
//       } else {
//         res.status(404).json({ message: "Not found in database" });
//       }
//     } else if (esEntero(id)) {
//       const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

//       if (response.status === 200) {
//         const pokemonData = response.data;
//         const pokemon = {
//           id: pokemonData.id,
//           name: pokemonData.name,
//           types: pokemonData.types.map((type) => type.type.name),
//           hp: pokemonData.stats[0].base_stat,
//           attack: pokemonData.stats[1].base_stat,
//           defense: pokemonData.stats[2].base_stat,
//           speed: pokemonData.stats[5].base_stat,
//           height: pokemonData.height,
//           weight: pokemonData.weight,
//           image: pokemonData.sprites.other.dream_world.front_default,
//         };

//         res.status(200).json(pokemon);
//       } else {
//         res.status(404).json({ message: "Not found in API" });
//       }
//     } else {
//       res.status(400).json({ message: "Invalid ID" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// };
// module.exports= detailPokemon