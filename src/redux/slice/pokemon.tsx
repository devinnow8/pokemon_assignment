import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import INITIAL_STATE from "../initialState";
import { fetchPokemon,fetchPokemonEvolution } from "../asyncThunk/pokemon";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: INITIAL_STATE.POKEMON,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemon.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        
        if(payload?.length > 0){
          state.list.unshift(payload);
        }
        if(payload){
          state.list.unshift(payload);
        } else {
        }
      }
    ).addCase(fetchPokemonEvolution.fulfilled, (state, { payload }: PayloadAction<any>) => {
      // if (payload && payload.evolutionData && typeof indexToInsert === 'number') {
        // Ensure that the specified index is within the bounds of the list array
        // if (indexToInsert >= 0 && indexToInsert < state.list.length) {
          // state.list[0].evolutionData = payload.evolutionData;
        // }
      // }

})
  }
})


export default pokemonSlice.reducer;

