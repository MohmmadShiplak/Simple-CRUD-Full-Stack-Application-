import axios from "axios";


export const fetchProducts = async ()=>{

const  response =await axios.get("api/Product/GetAll")

return response.data
}


export const fetchProductById =async (Id)=>{

const response =await axios.get(`/api/Product/${Id}`)

return response.data

}


export const CreateProduct=async (product)=>{

const response =await axios.post("/api/Product/AddProducts",product)

return response.data
}


export const updateProduct =async (product)=>{

const response =await axios.put(`/api/Product`,product)

return response.data
}


export const deleteProduct =async (id)=>{

const response =await axios.delete(`/api/Product/${id}`)

return response.data

}