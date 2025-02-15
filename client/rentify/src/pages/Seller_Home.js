// Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link , useNavigate } from 'react-router-dom';

function Home() {
    const [properties, setProperties] = useState([]);
    const sellerId = localStorage.getItem('id');

    useEffect(() => {
        if (!sellerId) {
            // Handle case where sellerId is not available
            toast.error('Seller ID not found');
            return;
        }

        axios.get('http://localhost:5000/api/properties')
            .then(response => {
                console.log(response.data);
                const filteredProperties = response.data.filter(property => property.seller_id === parseInt(sellerId));
                setProperties(filteredProperties);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data');
            });
    }, [sellerId]);

    const history = useNavigate();

    const handleUpdate = (propertyId) => {
        // Navigate to Seller component with propertyId as a parameter
        history(`/seller-update/${propertyId}`);
    };

    const handleDelete = (propertyId) => {
        // Confirm before deleting
        if (window.confirm('Are you sure you want to delete this property?')) {
            axios.delete(`http://localhost:5000/api/properties/${propertyId}`)
                .then(response => {
                    console.log('Property deleted successfully');
                    // Remove the deleted property from the local state
                    setProperties(properties.filter(property => property.id !== propertyId));
                    toast.success('Property deleted successfully');
                })
                .catch(error => {
                    console.error('Error deleting property:', error);
                    toast.error('Error deleting property');
                });
        }
    };
    

    return (
        <div style={{ backgroundColor: "#141414", minHeight: "100vh", paddingTop: "5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ToastContainer />
            <div style={{ background: "#1B1B1B", height: "5rem", width: "100%", position: "fixed", top: 0, paddingTop: "1.5rem" }}>
                <Link to="/seller-home" style={{ color: "white", marginLeft: "1rem" }}>Home</Link>
                <Link to="/add" style={{ color: "white", marginLeft: "1rem" }}>Add</Link>
            </div>
            <div style={{ marginTop: "5rem", justifyContent: "center", alignItems: "center" }}>
                {properties.map(property => (
                    <div key={property.id} style={{ margin: "1rem", width: "70rem", maxWidth: "800px", backgroundColor: "#141414" }}>
                        <Card style={{ width: "100%", backgroundColor: "#1B1B1B", color: "white" }}>
                            <Card.Body>
                                <Card.Title>{property.name}</Card.Title>
                                <Card.Text>
                                    {property.desci}
                                </Card.Text>
                                <Button style={{ backgroundColor: '#04D9FF' }} onClick={() => handleUpdate(property.id)}>Update</Button>
                                <Button style={{ backgroundColor: '#04D9FF', marginLeft: "1rem" }} onClick={() => handleDelete(property.id)} >Delete</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
