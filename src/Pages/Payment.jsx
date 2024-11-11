import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Card, Button, ButtonGroup, Form, Row, Col, Alert } from 'react-bootstrap';
import { FaDirections, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaMoneyCheckAlt , FaArrowRight } from 'react-icons/fa';
import profile1 from '../assets/Profile Photo.png';
import { useDispatch, useSelector } from 'react-redux';
import { getBalanceThunk } from '../store/action/services';
import { getProfileThunk } from '../store/action/auth';




const TopupPage = () => {
    const location = useLocation();
    const service = location.state?.service;
    const dispatch = useDispatch();
    const { getBalance } = useSelector((state) => state.services);
    const { getProfile } = useSelector((state) => state.auth);
    console.log(service)
    
  useEffect(() => {
    dispatch(getBalanceThunk());
    dispatch(getProfileThunk());
    
  }, [dispatch]);
    
  const toggleSaldoVisibility = () => {
    setIsSaldoVisible(!isSaldoVisible);
  };

    const [isSaldoVisible, setIsSaldoVisible] = useState(false);
    const handlePayment = () => {
        // Logika pembayaran bisa ditambahkan di sini, seperti memanggil API pembayaran
        alert(`Anda akan membayar Rp ${service?.service_tariff?.toLocaleString('id-ID')} untuk layanan ${service?.service_name}`);
        
        // Contoh navigasi atau logika setelah pembayaran
        // navigate('/confirmation');
      };

  return (
    <Container>
        <div style={{ paddingTop: '80px' }}>

         <Row className="mb-4 col-lg-12">
        <Col lg={4} className="d-flex flex-column align-items-start">
          <img
            src={getProfile?.profile_picture ?? profile1}
            alt="Profile"
            className="mb-2"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
          <span className="fw-medium fs-7 my-2">Selamat datang,</span>
          <p className="fw-bold fs-4">{getProfile?.first_name + ' ' + getProfile?.last_name}</p>
        </Col>
        <Col lg={8}>
          <Card className="text-start text-white" style={{ backgroundColor: '#f44336', borderRadius: '8px' }}>
            <Card.Body>
              <Card.Text>Saldo Anda</Card.Text>
              <p className="fs-2 fw-bold">
                {getBalance?.balance || getBalance?.balance === 0 ? (
                  isSaldoVisible ? (
                    `Rp ${getBalance.balance === 0 ? '0' : getBalance.balance.toLocaleString('id-ID')}`
                  ) : (
                    Array(7).fill(0).map((_, index) => (
                      <span
                        key={index}
                        className="d-inline-block rounded-circle bg-light"
                        style={{ width: '17px', height: '17px', marginRight: '5px' }}
                      ></span>
                    ))
                  )
                ) : (
                  <span>Loading...</span>
                )}
              </p>
              <div className="text-start">
                <span>Lihat Saldo</span>
                <Button
                  variant="link"
                  className="text-white mb-2"
                  onClick={toggleSaldoVisibility}
                  style={{ fontSize: '1.2rem' }}
                >
                  {isSaldoVisible ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Container className="mt-5 pt-5">
      <h5 className="mb-4">PemBayaran</h5>
        {service ? (
          <>
            <Row className="align-items-center mb-3">
              <Col lg={3} className="text-center">
                <img src={service.service_icon} alt="" />
              </Col>
              <Col xs={9}>
                <p className='fs-4 fw-medium'>{service.service_name}</p>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col xs={3} className="text-center">
                <FaMoneyCheckAlt  size={40} className="text-primary" />
              </Col>
              <Col xs={9}>
              <Form.Group controlId="serviceTariff">
                <Form.Control
                    type="text"
                    value={`Rp ${service.service_tariff?.toLocaleString('id-ID')}`}
                    className='fw-medium'
                    readOnly
                />
                </Form.Group>
              </Col>
            </Row>

            {/* Tombol Pembayaran */}
            <Button
              variant="danger"
              size="lg"
              className="w-100 mt-4"
              onClick={handlePayment}
            >
              Bayar
            </Button>
          </>
        ) : (
          <p className="text-center">Data layanan tidak tersedia</p>
        )}
    </Container>
        </div>
    </Container>

  );
};

export default TopupPage;
