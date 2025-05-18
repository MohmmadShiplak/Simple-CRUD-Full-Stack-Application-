import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useState, useEffect,useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import productReducer from '../Reducers/productReducer';
import { useSelector,useDispatch } from 'react-redux';
import { GetProducts,deleteProducts ,updateProducts} from '../features/productAPISlice';
import { useToast } from '../contexts/ToastContext';


// Configure axios base URL
//axios.defaults.baseURL = 'http://localhost:5000'; // Your ASP.NET Core port

export default function Edit() {

    const { Id } = useParams();
    const [error, setError] = useState(null);
    const [product, setProduct] = useState({ Id: 0, name: "", price: "" });
    const [loading, setLoading] = useState(false);
    const {showToast}=useToast();
      const dispatch=useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        if (!Id) {
            setError("Product ID is missing");
            return;
        }
    
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/Product/${Id}`);
                setProduct({
                    Id: response.data.id,  // Map to correct case
                    name: response.data.name,
                    price: response.data.price.toString()
                });
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch product");
            } finally {
                setLoading(false);
            }
        };
    
        fetchProduct();
    }, [Id]);
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        
        if (!Id) {
            setError("Product ID is missing");
            return;
        }
    
        // Validation
        if (!product.name.trim() || isNaN(product.price) || Number(product.price) <= 0) {
            setError("Please enter valid product details");
            return;
        }
    
        try {
            setLoading(true);
            setError(null);
            
            const updatedProduct = {
                id: parseInt(Id),
                name: product.name.trim(),
                price: Number(product.price)
            };


dispatch(updateProducts(updatedProduct))


         showToast('Product updated successfully!', 'success');

            
            navigate("/", { state: { message: "Product updated successfully!" } });
            
        } catch (err) {
            const errorMessage = err.response?.data?.title || // ASP.NET ProblemDetails format
                                err.response?.data?.message || 
                                err.message || 
                                "Failed to update product";
            setError(errorMessage);
            console.error("Update error:", err.response);
        } finally {
            setLoading(false);
        }
    };
    if (loading && !product.name) {
        return <Spinner animation="border" />;
    }









    return (
        <div className="container mt-4">
            <h2>Edit Product</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleUpdateProduct}>
                <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={product.name}
                        onChange={(e) => setProduct({...product, name: e.target.value})}
                        required
                        disabled={loading}
                    />
                    
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                        type="text"
                        inputMode="decimal"
                        value={product.price}
                        onChange={(e) => setProduct({...product, price: e.target.value})}
                       // pattern="^\d*\.?\d{0,2}$"
                        required
                        disabled={loading}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : 'Update'}
                </Button>
                <Button variant="secondary" onClick={() => navigate("/")} className="ms-2">
                    Cancel
                </Button>
            </Form>
        </div>
    );
}
