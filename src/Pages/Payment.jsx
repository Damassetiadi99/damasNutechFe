import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { FaEye, FaEyeSlash,FaMoneyCheckAlt } from 'react-icons/fa';
import profile1 from '../assets/Profile Photo.png';
import { useDispatch, useSelector } from 'react-redux';
import { getBalanceThunk } from '../store/action/services';
import { getProfileThunk } from '../store/action/auth';
import { postTransactionThunk } from '../store/action/transaction';

const PaymentPage = () => {
   const navigate = useNavigate()
    const location = useLocation();
    const service = location.state?.service;
    console.log(service)
    const dispatch = useDispatch();
    const { getBalance } = useSelector((state) => state.services);
    const { getProfile } = useSelector((state) => state.auth);
    const { postTransactions, isTransactionError } = useSelector((state) => state.transaction);
    const [isSaldoVisible, setIsSaldoVisible] = useState(false);

    const handlePayment = () => {
      const transactionData = {
        service_code: service.service_code,
         amount: service.service_tariff,
      }
      dispatch(postTransactionThunk(transactionData))
      .unwrap()
      .then(() => {
        alert(`Pembayaran ${service.service_code} berhasil`);
        navigate('/menu');
      })
      .catch(() => {
        alert(`Pembayaran ${service.service_code} gagal, silakan coba lagi.`);
      });
    };
    
  useEffect(() => {
    dispatch(getBalanceThunk());
    dispatch(getProfileThunk());
  }, [dispatch]);
    
  const toggleSaldoVisibility = () => {
    setIsSaldoVisible(!isSaldoVisible);
  };

    
  return (
    <Container>
         <Row className="mb-4 col-lg-12"   style={{marginTop : '8rem'}}>
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
            <Row className="d-flex align-items-center mb-3">
              <Col xs={2}>
                <img src={service.service_icon} alt=""
                 style={{ width: '50px', height: '50px' }} />
              </Col>
              <Col xs={8}>
                <p className='fs-5 fw-medium my-4'>{service.service_name}</p>
              </Col>
            </Row>
            <Row className="align-items-center mb-3">
              <Col xs={12}>
              <Form.Group controlId="serviceTariff"  className="position-relative">
                <FaMoneyCheckAlt  size={20}
                className="text-primary position-absolute top-50 start-0 translate-middle-y ms-2 color-dark"  />
                <Form.Control
                  type="text"
                  value={`Rp ${service.service_tariff?.toLocaleString('id-ID')}`}
                  className='fw-medium'
                  style={{ paddingLeft: '2.5rem' }} 
                  readOnly
                />
                </Form.Group>
              </Col>
            </Row>

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
    </Container>

  );
};

export default PaymentPage;
