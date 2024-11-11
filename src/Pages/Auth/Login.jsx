import { faAt, faEye, faLock,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitLoginThunk } from "../../store/action/auth";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from '../../assets/IllustrasiLogin.png';
import SIMS from '../../assets/Logo.png'

function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {isLoadingLogin,loginError,isLoginSuccess} = useSelector((state)=>state.auth)

  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/menu");
    }
  }, [isLoginSuccess, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitLoginThunk({ email, password }));  // Dispatch login action
  };
  const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
  };    
  return (
    <Container className="d-flex min-vh-100">
      <Row className="w-100 align-items-center">
        {/* Form di sebelah kiri */}
        <Col md={6} xs={12} className="p-4 order-md-1 order-2">
          <p className="text-center my-4 fw-bold">
            <img src={SIMS} alt="User Icon" className="me-2" style={{ width: '24px', height: '24px' }} />
             SIMS PPOB
          </p>
          <p className="text-center my-4 mx-5 fs-4 fw-bold">Masuk atau buat account untuk memulai</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 position-relative" controlId="email">
                <FontAwesomeIcon icon={faAt} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
                <Form.Control
                  type="email"
                  placeholder="masukan email anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                   autoComplete="off" 
                style={{ paddingLeft: '2.5rem' }} 
                />
            </Form.Group>

            <Form.Group className="mb-3 position-relative" controlId="password">
                <FontAwesomeIcon icon={faLock} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  placeholder=" masukan Password anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off" 
                  style={{ paddingLeft: '2.5rem' }} 
                />
                 <span onClick={togglePasswordVisibility} className="position-absolute top-50 end-0 translate-middle-y me-2">
                    {passwordVisible ? (
                        <FontAwesomeIcon icon={faEye} />
                    ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                </span>
            </Form.Group>

            {loginError && <div className="text-danger mb-3">{loginError.message}</div>}
            <Button variant="danger" type="submit" className="w-100" disabled={isLoadingLogin}>
              {isLoadingLogin ? "Processing..." : "Masuk"}
            </Button>
              <div className="mt-4 text-center">Belum punya account ? registrasi 
              <span>
                <Link to="/register" className="text-danger text-decoration-none"> disini </Link>
              </span>
                </div> 
          </Form>
        </Col>
        <Col md={6} className="d-none d-md-flex justify-content-center bg-light order-md-2 order-1">
          <img src={Logo} alt="Logo Login" className="w-75 mx-auto" />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
