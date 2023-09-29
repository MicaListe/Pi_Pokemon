import {
    FETCH_POKEMONS,
    FILTER_TYPE,
    FILTER_ORIGIN,
    ORDER_ASC,
    ORDER_DESC,
} from "./actions";
  
const initialState = {
    pokemons: [], // Esta será la lista de todos los pokemons
    filteredPokemons: [], // Esta será la lista de pokemons filtrados
};
  
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POKEMONS:
            return {
            ...state,
            pokemons: action.payload,
            filteredPokemons: action.payload
            };
        case FILTER_TYPE:
            const typeToFilter = action.payload;
            console.log(action.payload);
            if (typeToFilter === "") {
                return { ...state, filteredPokemons: state.pokemons }; // Mostrar todos los pokemons
            } else {
                const filteredByType = state.pokemons.filter((pokemon) =>
                pokemon.types.includes(typeToFilter)
                );
                console.log({ ...state, filteredPokemons: filteredByType });
                return { ...state, filteredPokemons: filteredByType }; // Filtrar por tipo
            }
        case FILTER_ORIGIN:
            console.log(state);
            const originToFilter = action.payload;
            if (originToFilter === "") {
                return { ...state, filteredPokemons: state.pokemons }; // Mostrar todos los pokemons
            } else if (originToFilter === "API") {
                const filteredByApi = state.pokemons.filter((pokemon) =>
                // Puedes utilizar una regex para identificar el origen de la API por el formato del ID
                // Por ejemplo, si los de la API tienen IDs numéricos y los de la DB tienen UUIDs
                /^-?\d+$/.test(pokemon.id)
                );
                console.log({ ...state, filteredPokemons: filteredByApi });
                return { ...state, filteredPokemons: filteredByApi }; // Filtrar por origen API
            } else if (originToFilter === "DB") {
                const filteredByDb = state.pokemons.filter(
                    (pokemon) =>
                        // Utiliza una regex para identificar el origen de la DB por el formato del ID
                    /^-?\d+$/.test(pokemon.id) === false
                );
                return { ...state, filteredPokemons: filteredByDb }; // Filtrar por origen DB
            }
        case ORDER_ASC:
            console.log(state);
            const sortedAsc = [...state.filteredPokemons].sort((a, b) => a.id - b.id);
            console.log({ ...state, filteredPokemons: sortedAsc });
            return { ...state, filteredPokemons: sortedAsc }; // Ordenar ascendente
        case ORDER_DESC:
            console.log(state);
            const sortedDesc = [...state.filteredPokemons].sort(
            (a, b) => b.id - a.id
            );
            return { ...state, filteredPokemons: sortedDesc }; // Ordenar descendente
        default:
            return state;
    }
};
  
export default reducer