import React, { useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'
import "../sellProduct/SellProduct.css"; // Import CSS file

const SellProduct = () => {
  // State variables to hold form data
  const [productName, setProductName] = useState('');
  const [departmentNeed, setdepartmentNeed] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [lotNumber, setLotNumber] = useState('');
  const [serialNumberFrom, setSerialNumberFrom] = useState('');
  const [serialNumberTo, setSerialNumberTo] = useState('');

  // Function to handle form submission
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:3002/SellPro", {
            productName,
            departmentNeed,
            Quantity,
            lotNumber,
            serialNumberFrom,
            serialNumberTo
        });

        console.log('Response from server:', response.data);

        if (response.data === 'Product not found') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Product not found",
            });
        } else if (response.data=== 'Minimum product quantity reached') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Product reached Minimum quantity level",
            });
        } else if (response.data=== 'Insufficient product quantity') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Insufficient product quantity",
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "The product has been successfully issued.",
                showConfirmButton: false,
                timer: 1500
            });
        }

        // Resetting state variables
        setProductName('');
        setdepartmentNeed('');
        setQuantity('');
        setLotNumber('');
        setSerialNumberFrom('');
        setSerialNumberTo('');
    } catch (error) {
        console.error('Error occurred while submitting:', error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong! Please try again later.",
        });
    }
};

  

  return (
    <div className="add-product-container">
      <h2>Product Issuance</h2>
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
          <label>Department Need:</label>
          <textarea
            value={departmentNeed}
            onChange={(e) => setdepartmentNeed(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
        <button type="submit">Issue Product</button>
      </form>
    </div>
  );
};

export default SellProduct;
