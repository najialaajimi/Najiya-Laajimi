import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";


export const getCategories= createAsyncThunk(
    "blogCategory/get-categories",
    async (thunkAPI) => {
      try {
        return await bCategoryService.getBlogCategories();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const createBcategory  = createAsyncThunk(
    "blogCategory/create-categories",
    async (bcatData ,thunkAPI) => {
      try {
        return await bCategoryService.createBCategory(bcatData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const updateBcategory = createAsyncThunk(
    "blogCategory/updatecategories",
    async (bcategory ,thunkAPI) => {
      try {
        return await bCategoryService.updateBCategory(bcategory);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const getBcategory = createAsyncThunk(
    "blogCategory/getcategories",
    async (id,thunkAPI) => {
      try {
        return await bCategoryService.getBCategory(id)
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const deleteBcategory = createAsyncThunk(
    "blogCategory/deletecategories",
    async (id ,thunkAPI) => {
      try {
        return await bCategoryService.deleteBCategory(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const resetState = createAction('Reset_all')

  const initialState = {
    bCategories:[],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  }

export const bCategorySlice = createSlice({
    name:"bCategories",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(getCategories.pending,(state) =>{
            state.isLoading= true;
        })
        .addCase(getCategories.fulfilled, (state,action) =>{
            state.isLoading = false ;
            state.isError = false ;
            state.isSuccess = true;
            state.bCategories = action.payload;
        })
        .addCase(getCategories.rejected, (state,action) =>{
            state.isLoading = false ;
            state.isError = true ;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createBcategory.pending,(state) =>{
            state.isLoading= true;
        })
        .addCase(createBcategory.fulfilled, (state,action) =>{
            state.isLoading = false ;
            state.isError = false ;
            state.isSuccess = true;
            state.createdBcategories = action.payload;
        })
        .addCase(createBcategory.rejected, (state,action) =>{
            state.isLoading = false ;
            state.isError = true ;
            state.isSuccess = false;
            state.message = action.error;
        })
        
        .addCase(getBcategory.pending,(state) =>{
          state.isLoading= true;
      })
      .addCase(getBcategory.fulfilled, (state,action) =>{
          state.isLoading = false ;
          state.isError = false ;
          state.isSuccess = true;
          state.BcategoryName = action.payload.title;
      })
      .addCase(getBcategory.rejected, (state,action) =>{
          state.isLoading = false ;
          state.isError = true ;
          state.isSuccess = false;
          state.message = action.error;
      })
      .addCase(updateBcategory.pending,(state) =>{
        state.isLoading= true;
    })
    .addCase(updateBcategory.fulfilled, (state,action) =>{
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.updatedBcategory = action.payload;
    })
    .addCase(updateBcategory.rejected, (state,action) =>{
        state.isLoading = false ;
        state.isError = true ;
        state.isSuccess = false;
        state.message = action.error;
    })
    .addCase(deleteBcategory.pending,(state) =>{
      state.isLoading= true;
  })
  .addCase(deleteBcategory.fulfilled, (state,action) =>{
      state.isLoading = false ;
      state.isError = false ;
      state.isSuccess = true;
      state.deletedBcategory = action.payload;
  })
  .addCase(deleteBcategory.rejected, (state,action) =>{
      state.isLoading = false ;
      state.isError = true ;
      state.isSuccess = false;
      state.message = action.error;
  })
        .addCase(resetState,() =>initialState)
    }
})



export default bCategorySlice.reducer;
