const axios= require ("axios")
const name = async (req,res)=>{
    try{
        const {name} = req.query
        const nameMinuscula = name.toLowerCase()
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonMin = pokemon.filter((pokemons)=>pokemons.toLowerCase().includes(nameMinuscula))
        
        // const nameMayuscula = name.toUpperCase()
        // const pokemonMayus = pokemon.filter((pokemons)=>pokemons.toUpperCase().includes(nameMayuscula))

        // if(pokemonMayus || pokemonMin){
        //     return res.status(200).json({pokemonMin})
        // }
            if(pokemonMin>0){
                return res.status(200).json(pokemonMin)
            }   

            if(!name){
                return res.status(404).json({message:"El Pokemon no existe"})   
            }
    }
    catch(error){
        res.status(500).json({message: "Error del servidor"})
    }
}
module.exports= name