import React, { useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "../addProduct/ExistingProduct.css"; // Import CSS file

const ExistingProduct = () => {
  // State variables to hold form data
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [addQuantity, setaddQuantity] = useState('');
  const [lotNumber, setLotNumber] = useState('');
  const [serialNumberFrom, setSerialNumberFrom] = useState('');
  const [serialNumberTo, setSerialNumberTo] = useState('');
  
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/ExisPro", {
        productName,
        productDescription,
        addQuantity,
        lotNumber,
        serialNumberFrom,
        serialNumberTo
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
        setaddQuantity('');
        setLotNumber('');
        setSerialNumberFrom('');
        setSerialNumberTo('');
      } else {
        // If no error, log the result to the console
        console.log(response.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "The product has been sucessfully added.",
          showConfirmButton: false,
          timer: 1500
        });

        setProductName('');
        setProductDescription('');
        setaddQuantity('');
        setLotNumber('');
        setSerialNumberFrom('');
        setSerialNumberTo('');
      }
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };
  
  

  return (
    
    <div className="add-product-container">
      
      <h2>Add Quantity to Existing Product</h2>
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
        <div className="form-group">
          <label>Purchase Quantity:</label>
          <input
            type="number"
            value={addQuantity}
            onChange={(e) => setaddQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Lot Number:</label>
          <input
            type="text"
            value={lotNumber}
            onChange={(e) => setLotNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Serial Number From:</label>
          <input
            type="text"
            value={serialNumberFrom}
            onChange={(e) => setSerialNumberFrom(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Serial Number To:</label>
          <input
            type="text"
            value={serialNumberTo}
            onChange={(e) => setSerialNumberTo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ExistingProduct;
