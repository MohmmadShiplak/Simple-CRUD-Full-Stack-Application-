
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

import { fetchProductById,fetchProducts,CreateProduct,updateProduct,deleteProduct } from "../API/productApi";

 
export const GetProducts=createAsyncThunk("GetProducts",async ()=>{

    const response =await fetchProducts();
    return response
})


export const deleteProducts=createAsyncThunk("deleteProduct",async (id)=>{
    const response =await deleteProduct(id);
    return response
})

export const AddProducts=createAsyncThunk("AddProduct",async (product,{rejectWithValue,dispatch})=>{

try
{


const productToSend ={


name:product.name,
price:product.price

}

const response =await CreateProduct(productToSend);
 
return response





}
catch(error)
{
return rejectWithValue(extractErrorMessage(error));
}


})

export const updateProducts=createAsyncThunk("updateProduct",async (product,{rejectWithValue})=>{

try 
{


const ProductToSend ={
  id:product.id,
name:product.name,
price:product.price


}

const response =await updateProduct(ProductToSend);

return response


}
catch(error)
{
  return rejectWithValue(extractErrorMessage(error));
}


})


function extractErrorMessage(error) {
  if (error.response) {
    if (error.response.data.errors) {
      return Object.entries(error.response.data.errors)
        .map(([key, errors]) => `${key}: ${errors.join(', ')}`)
        .join('\n');
    }
    return error.response.data.title || error.response.data;
  }
  return error.message;
}





export const productAPISliceReducer =createSlice({

name:"products",
initialState:{

items:[],
status:"idle",
error :null,
//selectedProduct:null
operationStatus:null,
operationMessage :null,
loading: false,
  responseMessage: null

},

reducers:{},
extraReducers:(builder)=>{

builder.addCase(GetProducts.pending,(state)=>{
    state.status="loading"
})
.addCase(GetProducts.fulfilled,(state,action)=>{
    state.status="succeeded";
    state.items=action.payload
})
.addCase(GetProducts.rejected,(state,action)=>{
    state.status="failed"
    state.error=action.error.message;
})//delete
.addCase(deleteProducts.pending, (state)=>{
 state.status="loading"

}).addCase(deleteProducts.fulfilled,(state,action)=>{
   state.status="succeeded";
state.status=action.payload
}).addCase(deleteProducts.rejected,(state,action)=>{

 state.status="failed"
    state.error=action.error.message;
})//add
.addCase(AddProducts.fulfilled,(state,action)=>{

state.operationStatus="succeeded";
state.operationMessage="Product Created Successfully!"
state.items.push(action.payload)

  
})
.addCase(AddProducts.pending, (state) => {
      state.operationStatus = "loading";
      state.operationMessage = null;
  })
    .addCase(AddProducts.rejected, (state, action) => {
      state.operationStatus = "failed";
      state.operationMessage = `Error: ${action.payload}`;
    })//update 
.addCase(updateProducts.fulfilled,(state,action)=>{
state.operationStatus="succeeded";
state.operationMessage="Product Created Successfully!"
state.items.push(action.payload)

}).addCase(updateProducts.pending,(state)=>{
    state.operationStatus = "loading";
      state.operationMessage = null;

}).addCase(updateProducts.rejected,(state,action)=>{
  state.operationStatus = "failed";
      state.operationMessage = `Error: ${action.payload}`;

})





}




})








