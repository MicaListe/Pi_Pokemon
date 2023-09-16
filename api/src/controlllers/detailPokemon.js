const axios= require("axios")
const {Pokemon}= require("../db")

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
            res.json(pokemon);
            const agregarTypes = Pokemon.findOne({
                where: {
                    id: id,
                },
                include: {
                    attributes: ["name"],
                    model: Type,
                    through: {
                        attributes: [],
                    },
                }
                
            });
            return agregarTypes
            
        }else{
            res.status(404).json({message: "Not found"})
        }
        }catch (error) {
          console.error(error);
          res.status(500).json({ error: 'F.' });
        }
}

module.exports= detailPokemon