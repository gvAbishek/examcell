import React, { useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "../addProduct/AddProduct.css"; // Import CSS file

const AddProduct = () => {
  // State variables to hold form data
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [purchaseQuantity, setPurchaseQuantity] = useState('');
  const [minimumQuantity, setminimumQuantity] = useState('');
  const [lotNumber, setLotNumber] = useState('');
  const [serialNumberFrom, setSerialNumberFrom] = useState('');
  const [serialNumberTo, setSerialNumberTo] = useState('');
  
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/AddProduct", {
        productName,
        productDescription,
        purchaseQuantity,
        minimumQuantity,
        lotNumber,
        serialNumberFrom,
        serialNumberTo
      });
  
      // Check if the response contains an error message indicating product already exists
      if (response.data === 'Product already exists.') {
        // const MySwal = withReactContent(Swal)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Product already exists.",
        });
        setProductName('');
        setProductDescription('');
        setPurchaseQuantity('');
        setminimumQuantity('');
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
        setPurchaseQuantity('');
        setminimumQuantity('');
        setLotNumber('');
        setSerialNumberFrom('');
        setSerialNumberTo('');
      }
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };
  const handleAddQuantityClick = () => {
    // Implement the logic to add quantity from existing product here
    window.location.href = '/ExistingProduct';
  };
  
  const handleUpdateQuantityClick = () => {
    // Implement the logic to add quantity from existing product here
    window.location.href = '/UpdateQuantity';
  };

  return (
    
    <div className="add-product-container">
         <button className="add-quantity-button" onClick={handleAddQuantityClick}>
          Add Quantity from Existing Product
        </button>
        <br></br>
        <button className="update-quantity-button" onClick={handleUpdateQuantityClick}>
           Update the Quantity
        </button>
        <h2>Add A New Product</h2>
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
            value={purchaseQuantity}
            onChange={(e) => setPurchaseQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Minimum Quantity:</label>
          <input
            type="number"
            value={minimumQuantity}
            onChange={(e) => setminimumQuantity(e.target.value)}
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

export default AddProduct;
