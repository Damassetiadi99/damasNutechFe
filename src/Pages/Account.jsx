import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import profile from '../assets/Profile Photo.png';
import { FaPen } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faUser } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
    const [user, setUser] = useState({
        name: "John Doe",
        first_name: 'John',
        last_name: 'Doe',
        email: "john.doe@example.com",
        password: "password123",
        imageUrl: profile
    });

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 102400) { // Check if the image is within 100 KB
            try {
                const formData = new FormData();
                formData.append("image", file);

                // Replace with your API call
                const response = await fetch('/profile/image', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const updatedUser = { ...user, imageUrl: URL.createObjectURL(file) };
                    setUser(updatedUser);
                    alert("Profile picture updated successfully!");
                } else {
                    alert("Failed to update profile picture.");
                }
            } catch (error) {
                console.error("Error updating profile picture:", error);
            }
        } else {
            alert("Please upload an image smaller than 100 KB.");
        }
    };

    const handleEditProfile = () => {
        alert("Redirecting to edit profile page...");
    };

    const handleLogout = () => {
        // Clear session and redirect to login
        alert("Logging out...");
        // Perform session removal logic here
    };

    return (
        <Container className="m-5">
            <div className="text-center">
                {/* Profile Image */}
                <div className="position-relative d-inline-block">
                    <Card.Img 
                        variant="top" 
                        src={user.imageUrl} 
                        alt="Profile Image" 
                        style={{ height: '150px', width: '150px' }} 
                        className="mb-3 rounded-circle" 
                    />
                    <div className="rounded-circle bg-danger">
                        <label htmlFor="imageUpload" className="position-absolute" style={{ cursor: 'pointer', bottom: '40px', right: '20px' }}>
                            <FaPen style={{ fontSize: '15px', color: '#007bff' }} />
                        </label>
                        <input 
                            type="file" 
                            id="imageUpload" 
                            accept="image/*" 
                            style={{ display: 'none' }} 
                            onChange={handleImageChange} 
                        />
                    </div>
                </div>
                <Card.Title>{user.name}</Card.Title>

                <Form>
                    <div className="mx-4">
                        <span className="d-flex text-start my-2 fw-medium fs-7">Email</span>
                        <Form.Group className="mb-3 position-relative" controlId="email">
                            <FontAwesomeIcon 
                                icon={faAt} 
                                className="position-absolute top-50 start-0 translate-middle-y ms-4 mt-5 text-muted" 
                                style={{ zIndex: 1 }} 
                            />
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Masukan email anda"
                                value={user?.email ?? '-'}
                                autoComplete="off"
                                style={{ paddingLeft: '2.5rem' }}
                                className="fw-medium fs-7"
                                readOnly
                            />
                        </Form.Group>
                    </div>

                    <div className="mx-4">
                        <span className="d-flex text-start my-2 fw-medium fs-7">Nama Depan</span>
                        <Form.Group className="mb-3 position-relative">
                            <FontAwesomeIcon 
                                icon={faUser} 
                                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" 
                                style={{ zIndex: 1 }} 
                            />
                            <Form.Control
                                type="text"
                                name="first_name"
                                placeholder="Masukan nama depan"
                                value={user?.first_name ?? '-'}
                                autoComplete="off"
                                style={{ paddingLeft: '2.5rem' }}
                                className="fw-medium fs-7"
                                readOnly
                            />
                        </Form.Group>
                    </div>

                    <div className="mx-4">
                        <span className="d-flex text-start my-2 fw-medium fs-7">Nama Belakang</span>
                        <Form.Group className="mb-3 position-relative">
                            <FontAwesomeIcon 
                                icon={faUser} 
                                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" 
                                style={{ zIndex: 1 }} 
                            />
                            <Form.Control
                                type="text"
                                name="last_name"
                                placeholder="Masukan nama belakang"
                                value={user?.last_name ?? '-'}
                                autoComplete="off"
                                style={{ paddingLeft: '2.5rem' }}
                                className="fw-medium fs-7"
                                readOnly
                            />
                        </Form.Group>
                    </div>

                    <div className="mx-4">
                        <Button 
                            variant="transparent" 
                            style={{ width: '100%', height: '40px' }} 
                            className="text-danger fw-bold rounded border my-4"
                            onClick={handleEditProfile}
                        >
                            Edit Profile
                        </Button>
                        <Button 
                            variant="danger" 
                            style={{ width: '100%', height: '40px' }} 
                            className="text-light fw-bold rounded border"
                            onClick={handleLogout}
                        >
                            Log Out
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default Profile;
