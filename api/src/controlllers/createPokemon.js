const {Pokemon,Type}= require("../db")

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
    const validTypes = await Type.findAll({ where: { name: types.map(type => type.toLowerCase()) } });
    console.log(types);
    console.log(validTypes);
    console.log(types.length);
    console.log(validTypes.length);
    if (validTypes.length !== types.length) {
      return res.status(400).json({ message: "Uno o más tipos de Pokémon son inexistentes" });
    }

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


