import { createAsyncThunk } from "@reduxjs/toolkit";
import CONFIG from "../../utils/config";
import { getRequest } from "../../api/baseAPI";
import { beginAPICall, endAPICall } from "../slice/loading";

export interface FetchPokemonArgs {
  queryParam: string;
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
