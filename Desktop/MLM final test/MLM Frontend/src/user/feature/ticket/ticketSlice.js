import { createSlice, createAsyncThunk , createAction } from "@reduxjs/toolkit";
import ticketService from "./ticketService";



  export const createTicket = createAsyncThunk(
    "ticket/create-tickets",
    async (ticketdata ,thunkAPI) => {
      try {
        return await ticketService.createTicket(ticketdata);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const getAllTickets = createAsyncThunk(
    "ticket/get-tickets",
    async (thunkAPI) => {
      try {
        return await ticketService.getTickets();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  
export const getTicket = createAsyncThunk(
  "ticket/get" ,
   async(id , thunkAPI)=>{
  try {
      return await ticketService.getAticket(id)
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
})

  export const resetState = createAction('Reset_all')

  const initialState = {
    tickets:[],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  }

export const tikcetSlice = createSlice({
    name:"tickets",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(createTicket.pending,(state) =>{
          state.isLoading= true;
      })
      .addCase(createTicket.fulfilled, (state,action) =>{
          state.isLoading = false ;
          state.isError = false ;
          state.isSuccess = true;
          state.createdTicket = action.payload;
      })
      .addCase(createTicket.rejected, (state,action) =>{
          state.isLoading = false ;
          state.isError = true ;
          state.isSuccess = false;
          state.message = action.error;
      })
      .addCase(getAllTickets.pending,(state) =>{
          state.isLoading= true;
      })
      .addCase(getAllTickets.fulfilled, (state,action) =>{
          state.isLoading = false ;
          state.isError = false ;
          state.isSuccess = true;
          state.tickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state,action) =>{
          state.isLoading = false ;
          state.isError = true ;
          state.isSuccess = false;
          state.message = action.error;
      })
      .addCase(getTicket.pending,(state)=>{
          state.isLoading=true;
      })
      .addCase(getTicket.fulfilled,(state,action)=>{
          state.isLoading=false;
          state.isError=false;
          state.isSuccess=true;
          state.SingleTicket = action.payload;
      })
      .addCase(getTicket.rejected,(state,action)=>{
          state.isLoading=false;
          state.isError=true;
          state.isSuccess=false;
          state.message=action.error;
      })
      .addCase(resetState,() =>initialState)
    }
})



export default tikcetSlice.reducer;
