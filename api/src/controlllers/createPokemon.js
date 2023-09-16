const {Pokemon,Type}= require("../db")

const createPokemon = async (req,res)=>{
    try{
        const {name, hp, defense, attack, speed, height, weight, types} = req.body
        console.log(req.body)

        if(!name || !hp || !defense || !attack || !speed || !height || !weight){
            return res.status(401).json({message:"Faltan datos"})
        }

        const pokemon= await Pokemon.findOrCreate({
            where: {name:name, hp:hp, defense:defense, attack:attack, speed:speed, height:height, weight:weight}
        })

        const newPokemon = await Pokemon.create({
            name: name.toLowerCase(),
            hp,
            attack,
            defense, 
            speed,
            height,
            weight
        })
        res.status(200).json(newPokemon)

        const typesName= types.map(type => type.name);
        const pokemonType= await Type.findAll({where:{name: typesName}})
        await pokemon.setTypes(pokemonType)

        const pokemonCreated = Pokemon.findOne({
            where: {
                id:id,
                name: name,
            },
            include: {
                attributes: ["name"],
                model: Type,
                through: {
                    attributes: [],
                },
            }
        });

        return pokemonCreated
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
module.exports = createPokemon;
