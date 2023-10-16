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
        
        if(payload?.length > 0){
          state.list.unshift(payload);
        }
        if(payload){
          state.list.unshift(payload);
        }
      }
    );
  },
});

export default pokemonSlice.reducer;
