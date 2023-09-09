const axios= require("axios")

const detailPokemon = async (req,res)=>{
    try {
        const id = req.params.idPokemon;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if(response.status===200){
            const pokemonData = response.data
            const pokemon={
                id, 
                name: pokemonData.name, 
                // types: pokemonData.types.map((type)=> type.type.name)
                hp: pokemonData.stats[0].base_stat, 
                attack:pokemonData.stats[1].base_stat, 
                defense: pokemonData.stats[2].base_stat, 
                speed: pokemonData.stats[5].base_stat, 
                height: pokemonData.height, 
                weight: pokemonData.weight ,
                image: pokemonData.sprites.other.dream_world.front_default
            }
            res.json(pokemon);
        }else{
            res.status(404).json({message: "Not found"})
        }
        }catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al buscar el Pokémon.' });
        }
        
        
        // axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
        //     .then(({data})=>{
        //         if(res.status===200){
        //            const pokemon={
        //                     id, 
        //                     name: data.name, 
        //                     // types: pokemonData.types.map((type)=> type.type.name)
        //                     hp: data.stats[0].base_stat, 
        //                     attack:data.stats[1].base_stat, 
        //                     defense: data.stats[2].base_stat, 
        //                     speed: data.stats[5].base_stat, 
        //                     height: data.height, 
        //                     weight: data.weight ,
        //                     image:data.sprites.other.dream_world.front_default
                    
        //             } 
        //            res.json(pokemon)  
        //         }else{
        //             res.status(404).json({message: "Not found"}) //Porque responde este mensaje si esta realizado como arriba?
        //         } 
        //     })
        // }catch (error) {
        //     console.error(error);
        //     res.status(500).json({ error: 'Error al buscar el Pokémon.' });
        // } 
}

module.exports= detailPokemon