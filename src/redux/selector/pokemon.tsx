export const pokemonDataSelector = (func: any) => {
  return func((state: any) => state.pokemonReducer);
};
