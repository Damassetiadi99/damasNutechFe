import React, { useState,useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import profile1 from '../assets/Profile Photo.png';
import { FaPen } from 'react-icons/fa';
import { getProfileThunk } from '../store/action/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faUser } from "@fortawesome/free-solid-svg-icons";
import { logOutThunk } from '../store/action/auth';
import { useDispatch, useSelector } from 'react-redux';
import {updateProfileDataThunk,updateProfileImageThunk} from '../store/action/account/'


const Profile = () => {
    const dispatch = useDispatch()
    const { getProfile} = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(getProfileThunk());
    
      }, [dispatch]);

    const [profileData, setProfileData] = useState({
        email : "",
        first_name : "",
        last_name : ""
    })
    const[ imageFile ,setImageFile ]= useState(null)
    const [isEditing ,setIsEditing] = useState(false)
    const handleChange = (e) => {
        const {name, value} = e.target 
        setProfileData ({...profileData, [name]: value })
    }
    const handleImageChange= (e) => {
        setImageFile(e.target.files[0])
    }
    const handleUpdateProfileData = async() =>{
        try {
            await dispatch(updateProfileDataThunk(profileData));
            alert("Profile data updated successfully!");
          } catch (error) {
            alert("Failed to update profile data: " + error.message);
          } 
    }
   
    const handleToggleEdit = ()=>{
        setIsEditing(!isEditing)
    }
    const handleUpdateProfileImage = async () => {
        try {
          await dispatch(updateProfileImageThunk(imageFile));
          alert("Profile image updated successfully!");
        } catch (error) {
          alert("Failed to update profile image: " + error.message);
        }
      };
    
    const handleLogout = () => {
        dispatch(logOutThunk()).then(() => {
            window.location.href = "/"; 
        });
    };

    return (
        <Container  style={{marginTop : '8rem'}}>
            <div className="text-center">
                {/* Profile Image */}
                <div className="position-relative d-inline-block">
                    <Card.Img 
                        variant="top" 
                        src={getProfile.profile_image ?? profile1} 
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
                <Card.Title>{getProfile.first_name +' '+ getProfile.last_name}</Card.Title>

                <Form>
                    <div className="mx-4">
                        <span className="d-flex text-start my-2 fw-medium fs-7">Email</span>
                        <Form.Group className="mb-3 position-relative" controlId="email">
                            <FontAwesomeIcon 
                                icon={faAt} 
                                className="position-absolute top-50 start-0 translate-middle-y ms-4 mt-5" 
                                style={{ zIndex: 1 }} 
                            />
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Masukan email anda"
                                value={getProfile?.email ?? '-'}
                                autoComplete="off"
                                style={{ paddingLeft: '2.5rem' }}
                                className="fw-medium fs-7"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>

                    <div className="mx-4">
                        <span className="d-flex text-start my-2 fw-medium fs-7">Nama Depan</span>
                        <Form.Group className="mb-3 position-relative">
                            <FontAwesomeIcon 
                                icon={faUser} 
                                className="position-absolute top-50 start-0 translate-middle-y ms-2" 
                                style={{ zIndex: 1 }} 
                            />
                            <Form.Control
                                type="text"
                                name="first_name"
                                placeholder="Masukan nama depan"
                                value={getProfile?.first_name ?? '-'}
                                autoComplete="off"
                                style={{ paddingLeft: '2.5rem' }}
                                className="fw-medium fs-7"
                                disabled={!isEditing}
                                onChange={handleChange}
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
                                value={getProfile?.last_name ?? '-'}
                                autoComplete="off"
                                style={{ paddingLeft: '2.5rem' }}
                                disabled={!isEditing}
                                className="fw-medium fs-7"
                            />
                        </Form.Group>
                    </div>

                    <div className="mx-4">
                    {!isEditing && (
                      <Button 
                        variant="transparent" 
                        style={{ width: '100%', height: '40px' }} 
                        className="text-danger fw-bold rounded border my-4"
                        onClick={handleToggleEdit}
                            >
                        Edit Profile
                    </Button>
                     )}
                    {isEditing && (
                        <Button 
                            variant="transparent" 
                            style={{ width: '100%', height: '40px' }} 
                            className="text-danger fw-bold rounded border my-4"
                            onClick={handleToggleEdit}
                            >
                            Cancel
                        </Button>
                     )}
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
