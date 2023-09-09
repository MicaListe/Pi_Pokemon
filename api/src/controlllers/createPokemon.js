const {Pokemon,Type}= require("../db")

const createPokemon = async (req,res)=>{
    try{
        const {name, hp, defense, attack, speed, height, weight, image, types} = req.body

        if(!name, !hp, !defense, !attack, !speed, !height, !weight, !image){
            return res.status(401).json({message:"Faltan datos"})
        }

        const pokemon= await Pokemon.findOrCreate({
            where: {id,name, hp, defense, attack, speed, height, weight, image}
        })

        const pokemontype= await Type.findAll({where:{name: types}})
        await pokemon.setTypes(pokemontype)

        res.status(201).json({message: "Pokemon creado", pokemon})

    }catch(error){
        res.status(500).json({error:error.message})
    }
}
module.exports = createPokemon;