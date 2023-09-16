const searchByName = async (name) => {
    //Busca todos los pokemones que coincidan con el mismo nombre pasado por query
    const {results} = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10")).data;
    const pokemonsFiltered = results.filter((pokemon) => pokemon.name === name);
    const pokemonPromises = pokemonsFiltered.map((pokemon) =>
    axios.get(pokemon.url).then((response) => cleanArray(response.data))
);
const pokemonsApi = await Promise.all(pokemonPromises);

    // Busca en la BDD algun pokemon con el mismo nombre enviado por query
    // Busca con el operador "iLike" el name ignorando si tiene mayúsculas o minúsculas
    const pokemon = await Pokemons.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`,
            },
        },
    });
    return [...pokemonsApi, ...pokemon];
};

handler:
const searchPokemonByName = async (req, res) => {

    
    const { name } = req.query
    try {
    //si me llega un nombre ejecuto la funcion para buscarlo
        if(name){
        const pokemonByName = await searchByName(name);
        if (!pokemonByName) res.status(404).json({ message: "Nombre de pokemon no encontrado" });
        res.status(200).json(pokemonByName);
        }

    //si no me llego un nombre por query que me entregue todos los pokemones 
        const allPokemons = await getAllPokemons();
        res.status(200).json(allPokemons)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};