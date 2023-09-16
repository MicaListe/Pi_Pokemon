const { Router } = require('express');
const allPokemons= require("../controlllers/allPokemons")
const detailPokemon = require("../controlllers/detailPokemon")
const createPokemon = require("../controlllers/createPokemon")
const pokemonTypes = require("../controlllers/pokemonTypes")
const name = require("../controlllers/name")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/pokemons", allPokemons) //Trae a todos los pokemons con sus caracteristicas
router.get("/pokemons/:id", detailPokemon) //Trae a uno en especifico
router.get("/pokemons-name",name) // Trae los pokemons que coinciden con el name
router.post("/pokemons", createPokemon) // Trae datos para crear un pokemon
router.get("/types", pokemonTypes) //

module.exports = router;
