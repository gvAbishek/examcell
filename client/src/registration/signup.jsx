import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import './signup.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3002/register", { email, password });

            if (response.status === 200) {
                // If registration is successful, redirect to login page
                window.location.href = '/'; // Navigate to the login page
            } else {
                console.error('Registration failed:', response.data);
                // Handle registration error
            }
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle registration error
        }
    };

    return (
        <div id="header">
            <div className="top">
                <div className="logo">
                    <img src="./kct.png" alt="A descriptive text about the image" />
                </div>
                
                <div className="text">
                    <h1 className="title">Admin Sign Up</h1>
                </div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="input_field">
                            <input type="text" name="email" placeholder="Enter a valid Email Address" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input_field">
                            <input type="password" name="password" placeholder="Enter your Password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="submit-btn">Submit</button>
                        {/* Use Link to navigate to another page */}
                        <div className="btn"><Link to="/">Back</Link></div>
                    </form>
                </div>
                
            </div>
        </div>
    );
};

export default SignUp;
