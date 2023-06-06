 import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";


export const getBlogs = createAsyncThunk(
    "blog/get-blogs",
    async (thunkAPI) => {
      try {
        return await blogService.getBlogs();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const createBlog = createAsyncThunk(
    "blog/create-blog",
    async (blogdata ,thunkAPI) => {
      try {
        return await blogService.createBlog(blogdata);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const updateBlog = createAsyncThunk(
    "blogCategory/update-blog",
    async (blog ,thunkAPI) => {
      try {
        return await blogService.updateBlog(blog);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const getBlog = createAsyncThunk(
    "blogCategory/get-blog",
    async (id,thunkAPI) => {
      try {
        return await blogService.getBlog(id)
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const deleteBlog = createAsyncThunk(
    "blogCategory/delete-blog",
    async (id ,thunkAPI) => {
      try {
        return await blogService.deleteBlog(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const resetState = createAction('Reset_all')

  const initialState = {
    blogs:[],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  }

export const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(getBlogs.pending,(state) =>{
            state.isLoading= true;
        })
        .addCase(getBlogs.fulfilled, (state,action) =>{
            state.isLoading = false ;
            state.isError = false ;
            state.isSuccess = true;
            state.blogs = action.payload;
        })
        .addCase(getBlogs.rejected, (state,action) =>{
            state.isLoading = false ;
            state.isError = true ;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createBlog.pending,(state) =>{
            state.isLoading= true;
        })
        .addCase(createBlog.fulfilled, (state,action) =>{
            state.isLoading = false ;
            state.isError = false ;
            state.isSuccess = true;
            state.createdBlog = action.payload;
        })
        .addCase(createBlog.rejected, (state,action) =>{
            state.isLoading = false ;
            state.isError = true ;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getBlog.pending,(state) =>{
          state.isLoading= true;
      })
      .addCase(getBlog.fulfilled, (state,action) =>{
          state.isLoading = false ;
          state.isError = false ;
          state.isSuccess = true;
          state.BlogName = action.payload.title;
          state.BlogDesc = action.payload.description;
          state.BlogCategory = action.payload.category;
          state.BlogImages = action.payload.images;
      })
      .addCase(getBlog.rejected, (state,action) =>{
          state.isLoading = false ;
          state.isError = true ;
          state.isSuccess = false;
          state.message = action.error;
      })
      .addCase(updateBlog.pending,(state) =>{
        state.isLoading= true;
    })
    .addCase(updateBlog.fulfilled, (state,action) =>{
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.updatedBlog = action.payload;
    })
    .addCase(updateBlog.rejected, (state,action) =>{
        state.isLoading = false ;
        state.isError = true ;
        state.isSuccess = false;
        state.message = action.error;
    })
    .addCase(deleteBlog.pending,(state) =>{
      state.isLoading= true;
  })
  .addCase(deleteBlog.fulfilled, (state,action) =>{
      state.isLoading = false ;
      state.isError = false ;
      state.isSuccess = true;
      state.deletedBlog = action.payload;
  })
  .addCase(deleteBlog.rejected, (state,action) =>{
      state.isLoading = false ;
      state.isError = true ;
      state.isSuccess = false;
      state.message = action.error;
  })
        .addCase(resetState,() =>initialState)
    }
})



export default blogSlice.reducer;
