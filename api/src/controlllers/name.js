// const axios = require("axios")
// const {Pokemon} = require("../db")
// const { Op } = require("sequelize")

// const name = async(req,res)=>{
//     const {name} = req.query;
//     console.log(name)
//     try {
//         if (name) {
//             const pokeBd = await Pokemon.findAll({
//                 where: {
//                     name: {
//                       [Op.iLike]: `%${nombre}%`,
//                     },
//                   },
//                 include: {
//                     model: Tipo
//                 }
//             });
//             if (pokeBd != 0) {
//                 let respBd = pokeBd.map((p) => {
//                     return {
//                         id: p.id,
//                         name: p.name,
//                         type: p.types.map((t) => t),
//                         hp: p.hp,
//                         attack: p.attack,
//                         defense: p.defense,
//                         speed: p.speed,
//                         height: p.height,
//                         weight: p.weight,
//                         image: p.image
//                     };
//                 });

//                 res.status(200).send(respBd);
//             } else {
//                 const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
//                 let respApi = [{
//                         id: pokeApi.data.id,
//                         name: pokeApi.data.name,
//                         type: pokeApi.data.types.map((t) => t.type),
//                         hp: pokeApi.data.stats[0].base_stat,
//                         attack: pokeApi.data.stats[1].base_stat,
//                         defense: pokeApi.data.stats[2].base_stat,
//                         speed: pokeApi.data.stats[5].base_stat,
//                         height: pokeApi.data.height,
//                         weight: pokeApi.data.weight,
//                         image: pokeApi.data.sprites.other.dream_world.front_default
//                     },];

//                 res.status(200).send(respApi);
//             }
//         }
//         // } else {
//         //     try {
//         //         const allPoke = await getAll();
//         //         res.json(allPoke);
//         //     } catch (error) {
//         //         next(error);
//         //     }
//         // }
//     } catch (error) {

//         res.status(404).send({msg: "Error al conectar API o no encontrado"});
//     }
// }

// module.exports= name

const { Pokemon } = require("../db");
const axios = require("axios");

const { Op } = require("sequelize");

const name = async (req, res) => {
  const { name } = req.query;
  console.log(name)


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






