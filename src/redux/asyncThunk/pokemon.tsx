import { createAsyncThunk } from "@reduxjs/toolkit";
import CONFIG from "../../utils/config";
import { getRequest } from "../../api/baseAPI";
import { beginAPICall, endAPICall } from "../slice/loading";

export interface FetchPokemonArgs {
  queryParam: string;
}

export interface FetchPokemonEvolutionArgs {
  id:  number;
}

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async ({ queryParam }: FetchPokemonArgs, { dispatch }) => {
    const {
      API_URL: { FETCH_POKEMON },
    } = CONFIG;

    try {
      dispatch(beginAPICall());
      const { data } = await getRequest(FETCH_POKEMON + queryParam);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(endAPICall());
    }
  }
);

export const fetchPokemonEvolution = createAsyncThunk(
  "pokemon/fetchPokemonEvolution",
  async (payload: FetchPokemonEvolutionArgs, { dispatch }) => {


    try {
      dispatch(beginAPICall());

      const { data } = await getRequest(`https://pokeapi.co/api/v2/evolution-chain/${payload}` );
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(endAPICall());
    }
  }
);


