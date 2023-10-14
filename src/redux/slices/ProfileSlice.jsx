import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: [],
  reducers: {
    addprofile: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addprofile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
