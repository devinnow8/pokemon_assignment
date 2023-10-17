import { RootState } from "../store";

export const pokemonDataSelector = (func:any) => {
  return func((state: RootState) => state.pokemonReducer);
};
