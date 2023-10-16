import { createSlice } from "@reduxjs/toolkit";

interface CustomData {
  // Define the structure of your custom data here
}

const initialState: CustomData = {
  // Initialize custom data here if needed
};

const customSlice = createSlice({
  name: "customData",
  initialState,
  reducers: {
    setCustomData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCustomData } = customSlice.actions;

export default customSlice.reducer;
