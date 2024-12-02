import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; 
import Swal from 'sweetalert2'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:3002/login", { email, password });
            
            console.log(response); // Add this line to log the response object
    
            if (response.status === 200) {
                window.location.href = response.data.redirectTo;
            } else {
                if (response.status === 404 && response.data === 'User not found') {
                    alert("hi");
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "User not found.",
                    });
                } else if (response.status === 401 && response.data === 'Invalid password') {
                    alert("hi");
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Invalid password.",
                    });
                } else {
                    alert("wrong userID or Password");
                    console.error('Login failed:', response.data);
                }
            }
        } catch (error) {
            alert("Wrong USERID or Password");
            console.error('Login failed:', error);
        }
    };
    
    
    
    

    return (
        <div className="page-container">
            <div className="header">
                <div className="top">
                    <div className="logo">
                        <img src="./kct.png" alt="A descriptive text about the image" />
                    </div>
                    <div className="text">
                        <h1 style={{ fontSize: '25px', fontWeight: 'bold' }}>Examcell's Inventory</h1>
                    </div>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="input_field">
                                <input type="text" name="email" placeholder="Email Address" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input_field">
                                <input type="password" name="password" placeholder="Password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="submit-btn">Login</button>
                        </form>
                    </div>
                    <div className="or">
                        <div className="line"></div>
                        <p>OR</p>
                        <div className="line"></div>
                    </div>
                    <div className="dif">
                        <div className="newacc">
                            <a href="/signup">Create a new Account?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
