import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import bg from '../background.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

function Home() {
    const [properties, setProperties] = useState([]);
    const [sellerDetails, setSellerDetails] = useState(null); // State to hold seller details

    useEffect(() => {
        // Fetch data from your backend
        axios.get('http://localhost:5000/api/properties')
            .then(response => {
                setProperties(response.data);  // Assuming your API returns an array of properties
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data');
            });
    }, []);

    // Function to handle "I'm Interested" button click
    const handleInterestedClick = (propertyId) => {
        axios.get(`http://localhost:5000/api/sellers/${propertyId}`)
            .then(response => {
                setSellerDetails(response.data);  // Assuming your API returns seller details
            })
            .catch(error => {
                console.error('Error fetching seller details:', error);
                toast.error('Error fetching seller details1');
            });
    };

    // Function to close seller details card
    const handleCloseDetails = () => {
        setSellerDetails(null);
    };

    return (
        <div style={{ backgroundColor: "#141414", minHeight: "100vh", paddingTop: "5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ToastContainer />
            <div className="navbar" style={{ background: "#1B1B1B", height: "5rem", width: "100%", position: "fixed", top: 0}}>
                <Link to="/home" style={{ color: "white", marginLeft:"1rem" }}>Home</Link>
            </div>
            <div style={{ marginTop: "5rem", justifyContent: "center", alignItems: "center" }}>
                {properties.map(property => (
                    <div key={property.id} style={{ margin: "1rem", width: "70rem", height: "70%", backgroundColor: "#141414" }}>
                        <Card style={{ width: "100%", height: "100%", backgroundColor: "#1B1B1B", color:"white" }}>
                            <Card.Body>
                                <Card.Title>{property.name}</Card.Title>
                                <Card.Text>
                                    {property.desci}
                                </Card.Text>
                                <Button style={{backgroundColor: '#04D9FF'}} onClick={() => handleInterestedClick(property.id)}>I'm Interested</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
            {/* Modal to show seller details */}
            {sellerDetails && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '2rem' }}>
                    <Card style={{ width: '50rem', backgroundColor: "#1B1B1B", color: 'white' }}>
                        <Card.Body>
                            <Card.Title>{sellerDetails.name}</Card.Title>
                            <Card.Text>
                                Seller Details:
                                <br/>
                                First Name: {sellerDetails.firstname}
                                <br />
                                Last Name: {sellerDetails.lastname}
                                <br />
                                Email: {sellerDetails.email}
                                <br />
                                Phone: {sellerDetails.phone}
                            </Card.Text>
                            <Button onClick={handleCloseDetails} style={{ backgroundColor: '#04D9FF' }}>Close</Button>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default Home;
