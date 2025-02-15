import React, { useState } from 'react';
import '../App.css';
import logo from '../logo.svg';
import bg from '../background.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function App() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        role: '',
    });

    const handleRegisterSubmit = (event) => {
        event.preventDefault();

        axios
            .post('http://localhost:5000/api/data', formData)
            .then((response) => {
                console.log(response.data);
                toast.success('User registered successfully');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    password: '',
                    role:'',
                });
            })
            .catch((error) => {
                console.error('Error inserting data:', error);
                toast.error('Failed to register user');
            });
    };
    const navigate = useNavigate();
    const handleLoginSubmit = (event) => {
        event.preventDefault();

        axios
            .post('http://localhost:5000/api/data/login1', {
                email: formData.email,
                password: formData.password,
            })
            .then((response) => {
                console.log(response.data);
                toast.success('Login successful');

                console.log(response.data.user.email);
                console.log(response.data.user.role);
                localStorage.setItem('email', response.data.user.email);
                localStorage.setItem('id', response.data.user.id);
                localStorage.setItem('name', response.data.user.name);
                localStorage.setItem('role', response.data.user.role);

                if (response.data.user.role === 'seller') {
                    navigate("/seller-home");
                } 
                else {
                    // Default redirect if role is not recognized
                    navigate("/buyer-home");
                }

                // Optionally, you can redirect or set a session here
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                toast.error('Invalid credentials');
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className="main">
            <ToastContainer />
            <div className="form-container">
                {isRegistering ? (
                    <Card style={{ width: '40rem', backgroundColor: '#1B1B1B' }}>
                        <div className="form-content">
                            <h2 style={{ color: '#04D9FF' }}>Register</h2>
                            <Form
                                onSubmit={handleRegisterSubmit}
                                style={{ color: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
                            >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name..."
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name..."
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email..."
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="phone"
                                        placeholder="Phone..."
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password..."
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicRole">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                        aria-label="Role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                    >
                                        <option>Select Role</option>
                                        <option value="seller">Seller</option>
                                        <option value="buyer">Buyer</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button style={{ backgroundColor: '#04D9FF' }} type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <p style={{ color: 'white' }}>
                                Already have an account?{' '}
                                <span onClick={toggleForm} style={{ color: '#04D9FF' }}>
                                    Login
                                </span>
                            </p>
                        </div>
                    </Card>
                ) : (
                    <Card style={{ width: '40rem', backgroundColor: '#1B1B1B' }}>
                        <div className="form-content">
                            <h2 style={{ color: '#04D9FF' }}>Login</h2>
                            <Form
                                onSubmit={handleLoginSubmit}
                                style={{ color: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
                            >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Button style={{ backgroundColor: '#04D9FF' }} type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <p style={{ color: 'white' }}>
                                Don't have an account?{' '}
                                <span onClick={toggleForm} style={{ color: '#04D9FF' }}>
                                    Register
                                </span>
                            </p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default App;
