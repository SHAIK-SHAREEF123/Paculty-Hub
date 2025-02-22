import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: localStorage.getItem("darkMode") === "true" // Persist dark mode
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode); // Save in localStorage
    }
  }
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;