import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useReducer } from 'react';
import productReducer from '../Reducers/productReducer';
import { useSelector,useDispatch } from 'react-redux';
import { GetProducts,deleteProducts } from '../features/productAPISlice';
import { useToast } from '../contexts/ToastContext';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Home() {
 // const [state,dispatch]=useReducer(productReducer,[])

  const dispatch = useDispatch();
  const { items, status, error: reduxError } = useSelector((state) => state.product);
  const {showToast} =useToast()
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    dispatch(GetProducts());
  }, [dispatch]);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      dispatch(deleteProducts(id))
      // Dispatch an action to update Redux state or refetch products
    
         showToast('Product deleted successfully!', 'danger');
      dispatch(GetProducts()); // Refetch the updated list
    } catch (error) {
      setLocalError(error.response?.data || "Error deleting product");
      console.error("Delete error:", error);
    }
  };

  const formatPrice = (price) => {
    if (!price) return '0.00';
    const normalizedPrice = price.toString().replace(',', '.');
    const num = parseFloat(normalizedPrice);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  // Use Redux's status for loading state
  if (status === 'loading') return <div className="text-center mt-4">Loading products...</div>;
  
  // Combine Redux error and local error
  const error = reduxError || localError;
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger">
        Error: {typeof error === 'object' ? JSON.stringify(error) : error}
      </div>
      <Button onClick={() => window.location.reload()}>Retry</Button>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product List</h2>
        <Link to="/Add">
          <Button variant="primary">Add Product</Button>
        </Link>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-end">Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td className="text-end">{formatPrice(product.price)}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link to={`/edit/${product.id}`}>
                      <Button variant="warning" size="sm">Edit</Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
