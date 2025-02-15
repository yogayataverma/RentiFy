// Seller.js
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Seller() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [beds, setBeds] = useState('');
    const [baths, setBaths] = useState('');
    const [placesNearby, setPlacesNearby] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const sellerId = localStorage.getItem('id');
        try {
            const response = await axios.post('http://localhost:5000/api/property', {
                name,
                description,
                beds: parseInt(beds),
                baths: parseInt(baths),
                placesNearby,
                location,
                sellerId
            });
            console.log(response.data);
            toast.success('Property added successfully!');
            // Optionally, you can redirect the user to another page after successful submission
        } catch (error) {
            console.error('Error adding property:', error);
            toast.error('Error adding property');
        }
    };

    return (
        <div style={{ backgroundColor: "#141414", minHeight: "100vh", paddingTop: "5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ToastContainer />
            <div style={{ background: "#1B1B1B", height: "5rem", width: "100%", position: "fixed", top: 0, paddingTop:"1.5rem"}}>
                <Link to="/seller-home" style={{ color: "white", marginLeft:"1rem" }}>Home</Link>
                <Link to="/add" style={{ color: "white", marginLeft:"1rem" }}>Add</Link>
            </div>
            
            <Card style={{ width: '40rem', backgroundColor: '#1B1B1B', color:"white", marginTop:"1rem" }}>
                <div className="form-content">
                    <h2 style={{ color: '#04D9FF' }}>New Property</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name..." value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description..." value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>No of Beds</Form.Label>
                            <Form.Control type="number" placeholder="Enter Beds..." value={beds} onChange={(e) => setBeds(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>No of Baths</Form.Label>
                            <Form.Control type="number" placeholder="Enter Baths..." value={baths} onChange={(e) => setBaths(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Places Nearby</Form.Label>
                            <Form.Control type="text" placeholder="Enter Places Nearby It..." value={placesNearby} onChange={(e) => setPlacesNearby(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Enter Location..." value={location} onChange={(e) => setLocation(e.target.value)} />
                        </Form.Group>

                        <Button style={{ backgroundColor: '#04D9FF' }} type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Card>
        </div>
    );
}

export default Seller;
