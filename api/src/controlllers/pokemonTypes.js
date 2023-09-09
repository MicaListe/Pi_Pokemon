const {Type} = require("../db")
const axios = require("axios")
const URL = "https://pokeapi.co/api/v2/type"

async function obtenerTipos(type) {
    try {
        const { data } = await axios.get(`${URL}/${type}`);
        return data;
    } catch (error) {
        throw new Error("No se pudo obtener información del tipo desde la API");
    }
}

const pokemonTypes= async (req,res)=>{
    try{

        const {name,type}= req.body 
        const obtenerPokemonType= await obtenerTipos(type)

        const pokemon= await Type.create({
            name: name
        })
        return res.status(201).json({message:"Tipos de Pokemons creado ", obtenerPokemonType})
        
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

module.exports= pokemonTypes