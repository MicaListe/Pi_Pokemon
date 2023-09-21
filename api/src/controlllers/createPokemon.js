// const {Pokemon,Type}= require("../db")

// const createPokemon = async (req,res)=>{
//     try{
//         const {name, hp, defense, attack, speed, height, weight, types} = req.body
//         console.log(req.body)

//         if(!name || !hp || !defense || !attack || !speed || !height || !weight){
//             return res.status(401).json({message:"Faltan datos"})
//         }


//         const validTypes = await Type.findAll({ where: { name: types } });

//         // if (validTypes[0].dataValues.name.length !== types.length) {
//         //     return res.status(400).json({ message: "Tipo de Pokémon inexistente" });
//         // }

//         const pokemon= await Pokemon.findOrCreate({
//             where: {
//                 name, 
//                 hp, 
//                 defense, 
//                 attack, 
//                 speed, 
//                 height, 
//                 weight}
//         })
//         await pokemon.setTypes(validTypes)
//         res.status(200).json(pokemon)

//         // const typesName= types.map(type => type.name);
//         // const pokemonType= await Type.findAll({where:{name: typesName}})
       

//         // const pokemonCreated = Pokemon.findOne({
//         //     where: {
//         //         id:id,
//         //         name: name,
//         //     },
//         //     include: {
//         //         attributes: ["name"],
//         //         model: Type,
//         //         through: {
//         //             attributes: [],
//         //         },
//         //     }
//         // });

//         // return pokemonCreated
//     }catch(error){
//         res.status(500).json({error:error.message})
//     }
// }

// module.exports = createPokemon;
const { Pokemon, Type } = require("../db");

const createPokemon = async (req, res) => {
  try {
    const { name, hp, defense, attack, speed, height, weight, types } =
      req.body;

    if (
      !name ||
      !hp ||
      !defense ||
      !attack ||
      !speed ||
      !height ||
      !weight ||
      !types
    ) {
      return res.status(401).json({ message: "Faltan datos" });
    }

    // Verificar si los tipos proporcionados existen en la base de datos
    const validTypes = await Type.findAll({ where: { name: types } });

    // if (validTypes[0].dataValues.name.length !== types.length) {
    //   return res.status(400).json({ message: "Tipo de Pokémon inexistente" });
    // }

    const [pokemon, created] = await Pokemon.findOrCreate({
      where: {
        name: name.toLowerCase(),
        hp,
        defense,
        attack,
        speed,
        height,
        weight,
      },
    });

    // Asociar el Pokémon con los tipos
    await pokemon.setTypes(validTypes);

    return res.status(200).json(pokemon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = createPokemon;
