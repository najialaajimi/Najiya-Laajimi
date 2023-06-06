import { createSlice, createAsyncThunk , createAction } from "@reduxjs/toolkit";
import meetService from "./eventService";



  export const getAllMeets = createAsyncThunk(
    "meet/get-meets",
    async (thunkAPI) => {
      try {
        return await meetService.getMeets();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const resetState = createAction('Reset_all')

  const initialState = {
    meets:[],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  }

export const meetSlice = createSlice({
    name:"meets",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
      .addCase(getAllMeets.pending,(state) =>{
          state.isLoading= true;
      })
      .addCase(getAllMeets.fulfilled, (state,action) =>{
          state.isLoading = false ;
          state.isError = false ;
          state.isSuccess = true;
          state.meets = action.payload;
      })
      .addCase(getAllMeets.rejected, (state,action) =>{
          state.isLoading = false ;
          state.isError = true ;
          state.isSuccess = false;
          state.message = action.error;
      })
      .addCase(resetState,() =>initialState)
    }
})



export default meetSlice.reducer;
