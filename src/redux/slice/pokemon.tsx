import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import INITIAL_STATE from "../initialState";
import { fetchPokemon } from "../asyncThunk/pokemon";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: INITIAL_STATE.POKEMON,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemon.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.list.unshift(payload);
      }
    );
  },
});

export default pokemonSlice.reducer;
