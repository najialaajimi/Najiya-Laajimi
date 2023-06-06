import { createSlice, createAsyncThunk , createAction } from "@reduxjs/toolkit";
import authService from "./authService";

/* const userDefaultStore = {
    _id:null,
    firstname:null,
    lastname:null,
    email:null,
    mobile:null,
    token:null,
};
 */
const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
  
  export const resetState = createAction('Reset_all') 

const initialState = {
  user: getUserfromLocalStorage,
  orders:[],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      
      .addCase(resetState,() =>initialState)
  },
});

export default authSlice.reducer;
