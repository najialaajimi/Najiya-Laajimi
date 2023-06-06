import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";



export const getAllProducts = createAsyncThunk(
    "product/get" ,
     async(data , thunkAPI)=>{
    try {
        return await productService.getProducts(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const addToWishlist = createAsyncThunk(
    "product/wishlist" ,
     async(prodId , thunkAPI)=>{
    try {
        return await productService.addToWishlist(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getAProduct = createAsyncThunk(
    "product/getAProduct" ,
     async(id , thunkAPI)=>{
    try {
        return await productService.getSingleProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const addrating = createAsyncThunk(
    "product/rating" ,
     async(data , thunkAPI)=>{
    try {
        return await productService.rating(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const productState = {
    product:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const productSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllProducts.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.product = action.payload;
        })
        .addCase(getAllProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addToWishlist.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(addToWishlist.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.addToWishlist = action.payload;
            state.message = "Product Added To wishlist!";
        })
        .addCase(addToWishlist.rejected,(state,action) => {
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(getAProduct.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getAProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.singleproduct = action.payload;
            state.message = "Product Fetch successfully!";
        })
        .addCase(getAProduct.rejected,(state,action) => {
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addrating.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(addrating.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.rating = action.payload;
            state.message = "Rating Added successfully!";
            if(state.isSuccess){
                toast.success("Ajouter star avec Success")
            }
        })
        .addCase(addrating.rejected,(state,action) => {
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            /* if(state.isError){
                toast.error("Something went wrong")
            } */
        })
    }
})


export default productSlice.reducer;