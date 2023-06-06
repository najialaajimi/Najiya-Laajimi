import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authService } from "./userService";



export const registerUser = createAsyncThunk(
    "auth/register" ,
     async(userData , thunkAPI)=>{
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const loginUser = createAsyncThunk(
    "auth/login" ,
     async(userData , thunkAPI)=>{
    try {
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getUserProductWishlist = createAsyncThunk(
    "user/wishlist",
    async (thunkAPI) => {
        try {
            return await authService.getUserWishlist();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const addProdcart = createAsyncThunk(
    "user/cart/add",
    async (cartData , thunkAPI) => {
        try {
            return await authService.addToCart(cartData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getAcart = createAsyncThunk(
    "user/cart/get",
    async ( thunkAPI) => {
        try {
            return await authService.getCart()
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteCartProduct = createAsyncThunk(
    "user/cart/product/delete",
    async ( cartItemId ,thunkAPI) => {
        try {
            return await authService.removeProductFromcart(cartItemId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateCartProduct = createAsyncThunk(
    "user/cart/product/update",
    async ( cartdetail ,thunkAPI) => {
        try {
            return await authService.updateProductQuantityFromCart(cartdetail)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const CreateAnOrder = createAsyncThunk(
    "user/cart/create-order",
    async (orderDetail , thunkAPI) => {
        try {
            return await authService.createOrder(orderDetail);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getOrders = createAsyncThunk(
    "user/order/get",
    async ( thunkAPI) => {
        try {
            return await authService.getUserOrders()
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateProfile = createAsyncThunk(
    "user/profile/update",
    async ( data ,thunkAPI) => {
        try {
            return await authService.updateUser(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const forgotPass = createAsyncThunk(
    "user/password/token",
    async ( data ,thunkAPI) => {
        try {
            return await authService.forgotPassToken(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

const getCustomerfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
    user:getCustomerfromLocalStorage,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdUser = action.payload;
            if(state.isSuccess === true){
                toast.info("User Created Successfully");
            }
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError === true){
                toast.error(action.error);
            }
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user = action.payload;
            if(state.isSuccess === true){
                localStorage.setItem("token" , action.payload.token);
                toast.info("User login avec success");
            }
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError === true){
                toast.error(action.error);
            }
        })
        .addCase(getUserProductWishlist.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getUserProductWishlist.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.wishlist = action.payload;
        })
        .addCase(getUserProductWishlist.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addProdcart.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(addProdcart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cartProduct = action.payload;
            if(state.isSuccess){
                toast.success("Product added to Cart")
            }
        })
        .addCase(addProdcart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(getAcart.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getAcart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cartProducts = action.payload;
        })
        .addCase(getAcart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(deleteCartProduct.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(deleteCartProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deletedCartProduct = action.payload;
            if(state.isSuccess){
                toast.success("Product deleted from Cart Successfully")
            }
        })
        .addCase(deleteCartProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError){
                toast.error("Something went wrong")
            }
        })
        .addCase(updateCartProduct.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(updateCartProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedCartProduct = action.payload;
            if(state.isSuccess){
                toast.success("Product updated from Cart Successfully")
            }
        })
        .addCase(updateCartProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError){
                toast.error("Something went wrong")
            }
        })
        .addCase(CreateAnOrder.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(CreateAnOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.orderedProduct = action.payload;
            if(state.isSuccess){
                toast.success("Ordered Successfully")
            }
        })
        .addCase(CreateAnOrder.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError){
                toast.error("Something went wrong")
            }
        })
        .addCase(getOrders.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getOrders.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.getorderedProduct = action.payload;
        })
        .addCase(getOrders.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(updateProfile.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedUser = action.payload;
            if(state.isSuccess){
                toast.success("Modifier adherant avec Success")
            }
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError){
                toast.error("Something went wrong")
            }
        })
        .addCase(forgotPass.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(forgotPass.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.token = action.payload;
            if(state.isSuccess){
                toast.success("Email envoyer avec Success")
            }
        })
        .addCase(forgotPass.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError){
                toast.error("Something went wrong")
            }
        })
    }
})


export default authSlice.reducer;