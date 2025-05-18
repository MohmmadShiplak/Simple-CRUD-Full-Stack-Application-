import { Form,Button,Spinner,Alert,Toast, ToastContainer } from 'react-bootstrap';
import { useContext, useState,useReducer } from 'react';
import { ProductContext } from '../contexts/productsContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import productReducer from '../Reducers/productReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { AddProducts, GetProducts,deleteProducts,responseMessage } from '../features/productAPISlice';
import { useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';




export default function Add() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState({ name: "", price: "" });
    const {showToast}=useToast();

    const { responseMessage } = useSelector((state) => state.product);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        
        const productPayload = {
            name: product.name.trim(),
            price: Number(product.price)
        };

        await dispatch(AddProducts(productPayload));

         showToast('Product Added successfully!', 'success');


    };

    useEffect(() => {
        if (responseMessage && responseMessage.includes("Success")) {
            const timer = setTimeout(() => {
                navigate("/");
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [responseMessage, navigate]);

    return (
        <div className="container mt-4">
            <h2>Add Product</h2>

            {/* Toast Notification */}
     


            <Form onSubmit={handleAddProduct}>
                <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={product.name}
                        onChange={(e) => setProduct({...product, name: e.target.value})}
                        required
                    />
                    
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                        type="text"
                        inputMode="decimal"
                        value={product.price}
                        onChange={(e) => setProduct({...product, price: e.target.value})}
                        required
                    />
                    <Form.Text>Format: 12.34</Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">Add Product</Button>
                <Button variant="secondary" onClick={() => navigate("/")} className="ms-2">
                    Cancel
                </Button>
            </Form>
        </div>
    );
}

