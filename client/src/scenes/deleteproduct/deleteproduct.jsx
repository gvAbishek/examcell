import React, { useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "../deleteproduct/deleteproduct.css"; // Import CSS file

const DeleteProduct = () => {
  // State variables to hold form data
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');

  
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/Delete", {
        productName,
        productDescription,
      });
  
      // Check if the response contains an error message indicating product already exists
      if (response.data === 'Product not found') {
        // const MySwal = withReactContent(Swal)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Product not found",
        });
        setProductName('');
        setProductDescription('');
      } else {
        // If no error, log the result to the console
        console.log(response.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "The product  has been sucessfully deleted.",
          showConfirmButton: false,
          timer: 1500
        });

        setProductName('');
        setProductDescription('');
      }
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };
  
  

  return (
    
    <div className="add-product-container">
      
      <h2>Delete Product from the Inventory</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Description:</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Product</button>
      </form>
    </div>
  );
};

export default DeleteProduct;
