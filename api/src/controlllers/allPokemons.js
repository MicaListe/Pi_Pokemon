const axios =require("axios")
const URL= "https://pokeapi.co/api/v2/pokemon"

const allPokemons = async (req,res) =>{
    try{
        let response = await axios(`${URL}`)
        if (response){
            res.status(200).json(response.data)
        }else{
            res.status(404).json("Error: "+ JSON.stringify(response))
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
module.exports= allPokemons