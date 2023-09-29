export const FILTER_TYPE = "FILTER_TYPE";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const ORDER_ASC = "ORDER_ASC";
export const ORDER_DESC = "ORDER_DESC";
export const FETCH_POKEMONS = "FETCH_POKEMONS"

export const fetchPokemons = (pokemons) => {
   return { type: FETCH_POKEMONS, payload: pokemons };
};

export const filterType = (type) => {
  return { type: FILTER_TYPE, payload: type };
};

export const filterOrigin = (origin) => {
  return { type: FILTER_ORIGIN, payload: origin };
};

export const orderAsc = () => {
  return { type: ORDER_ASC };
};

export const orderDesc = () => {
  return { type: ORDER_DESC };
};