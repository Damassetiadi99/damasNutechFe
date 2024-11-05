import { faAt, faEye,faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitRegisterThunk } from "../../store/action/auth";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from '../../assets/IllustrasiLogin.png';
import SIMS from '../../assets/Logo.png'

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { isLoadingRegister, registerError, isRegisterSuccess } = useSelector((state) => state.auth);

  // State object for form data with confirmPassword
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name : "",
    password: "",
    confirmPassword: "",
  });

  // State for password match error and visibility
  const [passwordError, setPasswordError] = useState("");
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  useEffect(() => {
    if (isRegisterSuccess) {
      navigate("/");
    }
  }, [isRegisterSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password.length < 8) {
      setPasswordError("Password harus memiliki minimal 8 karakter");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Password dan konfirmasi password tidak cocok");
      return;
    }
    setPasswordError(""); // Clear error if passwords match and length is valid
    dispatch(submitRegisterThunk(formData));
  };
  return (
    <Container className="d-flex min-vh-100">
      <Row className="w-100 align-items-center">
        <Col md={6} xs={12} className="p-4 order-md-1 order-2">
          <h5 className="text-center mb-4">
            <img src={SIMS} alt="User Icon" className="me-2" style={{ width: '24px', height: '24px' }} />
             SIMS PPOB
          </h5>
          <h4 className="text-center mb-4 ">Lengkapi Data Untuk Membuat Akun</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 position-relative" controlId="email">
              <FontAwesomeIcon 
                icon={faAt} 
                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" 
                style={{ zIndex: 1 }} 
              />
              <Form.Control
                type="email"
                name="email"
                placeholder="Masukan email anda"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                style={{ paddingLeft: '2.5rem' }} // Space for the icon
              />
            </Form.Group>

            <Form.Group className="mb-3 position-relative" controlId="first_name">
              <FontAwesomeIcon 
                icon={faUser} 
                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" 
                style={{ zIndex: 1 }} 
              />
              <Form.Control
                type="text"
                name="first_name"
                placeholder="Masukkan nama depan"
                value={formData.first_name}
                onChange={handleChange}
                autoComplete="off"
                style={{ paddingLeft: '2.5rem' }} // Space for the icon
              />
            </Form.Group>

            <Form.Group className="mb-3 position-relative" controlId="name">
              <FontAwesomeIcon 
                icon={faUser} 
                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" 
                style={{ zIndex: 1 }} 
              />
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Masukkan nama belakang"
                value={formData.last_name}
                onChange={handleChange}
                autoComplete="off"
                style={{ paddingLeft: '2.5rem' }} // Space for the icon
              />
            </Form.Group>

            <Form.Group className="mb-3 position-relative" controlId="password">
                <FontAwesomeIcon 
                icon={faLock}
                 className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
                <Form.Control
              
                 type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Buat password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="off"
                style={{ paddingLeft: '2.5rem' }} // Space for the icon

                />
                <span onClick={togglePasswordVisibility} className="position-absolute top-50 end-0 translate-middle-y me-2">
                  {passwordVisible ? (
                      <FontAwesomeIcon icon={faEye} />
                  ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                  )}
               </span>
               
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <div className="position-relative d-flex align-items-center">
                  <FontAwesomeIcon
                      icon={faLock} 
                      className="position-absolute start-0 ms-2 text-muted" 
                      style={{ pointerEvents: 'none' }}
                  />
                  <Form.Control
                     type={confirmPasswordVisible ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Konfirmasi password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="off"
                      style={{ paddingLeft: '2.5rem' }}
                  />
                   <span onClick={toggleConfirmPasswordVisibility} className="position-absolute top-50 end-0 translate-middle-y me-2">
                    {confirmPasswordVisible ? (
                        <FontAwesomeIcon icon={faEye} />
                    ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                </span>
              </div>
              {passwordError && <div className="text-danger mt-1">{passwordError}</div>}
          </Form.Group>

            {registerError && <div className="text-danger mb-3">{registerError.message}</div>}

            <Button
              variant="danger"
              type="submit"
              className="w-100"
              disabled={isLoadingRegister}
            >
              {isLoadingRegister ? "Processing..." : "Register"}
            </Button>
            <div className="mt-4 text-center fst-normal fs-6">
              Sudah punya akun? login
              <span>  
                <Link to="/" className="text-danger  text-decoration-none"> di sini </Link>
              </span>
            </div>
          </Form>
        </Col>
        <Col md={6} className="d-none d-md-flex justify-content-center bg-light order-md-2 order-1">
          <img src={Logo} alt="Logo Register" className="w-75 mx-auto" />
        </Col>
      </Row>
    </Container>
  );
}

export default Register;