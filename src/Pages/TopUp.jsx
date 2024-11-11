import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ButtonGroup, Form, Row, Col, Alert } from 'react-bootstrap';
import { FaDirections, FaEye, FaEyeSlash } from 'react-icons/fa';
import profile1 from '../assets/Profile Photo.png';
import { useDispatch, useSelector } from 'react-redux';
import { getBalanceThunk } from '../store/action/services';
import { getTransactionhThunk, topUpThunk } from '../store/action/transaction';
import { getProfileThunk } from '../store/action/auth';

const TopUp = () => {
  const dispatch = useDispatch();
  const { getBalance, isBalanceLoading, isBalanceError } = useSelector((state) => state.services);
  const { getTransactionH, isgetTransactionsHLoading } = useSelector((state) => state.transaction);
  const { getProfile, isLoadinggetProfileThunk, getProfileThunkError } = useSelector((state) => state.auth);
  const {postTopUp , istopUpLoading} = useSelector ((state)=> state.transaction)

  const [isSaldoVisible, setIsSaldoVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading status
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const currencyAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

  useEffect(() => {
    dispatch(getTransactionhThunk());
    dispatch(getBalanceThunk());
    dispatch(getProfileThunk());
    
  }, [dispatch,istopUpLoading]);

  const toggleSaldoVisibility = () => {
    setIsSaldoVisible(!isSaldoVisible);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);

    if (isNaN(numValue)) {
      setWarningMessage('Input harus berupa angka');
      return;
    }
    if (numValue > 1000000) {
      setWarningMessage('Nilai tidak boleh lebih dari 1.000.000');
      setInputValue(1000000); // Batasi nilai input ke 1.000.000
    } else if (numValue < 0) {
      setWarningMessage('Nilai tidak boleh kurang dari 0');
    } else {
      setWarningMessage('');
      setInputValue(value); // Update nilai input jika valid
    }
  };

  const handleButtonClick = (value) => {
    setInputValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(inputValue) || inputValue <= 0) {
      setWarningMessage('Nominal top up tidak valid');
      return;
    }
    setIsLoading(true); // Set loading status to true

    try {
      await dispatch(topUpThunk({ top_up_amount: parseInt(inputValue, 10) }));
      setSuccessMessage('Top up berhasil!');
      setInputValue(''); // Reset input after successful submit
      setWarningMessage('');
    } catch (error) {
      setErrorMessage('Terjadi kesalahan, coba lagi!');
    } finally {
      setIsLoading(false); // Reset loading status
    }
  };

  return (
    <Container  style={{marginTop : '8rem'}}>
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
      <p className="fw-medium fs-7 my-2">Silahkan Masukkan </p>
      <p className="fs-2 fw-bold">Nominal Top Up</p>
      <Row className="d-flex align-items-start">
        {/* Form Input dan Tombol Submit */}
        <Col xs={12} md={8} lg={6} className="mb-3">
          <Form.Group controlId="formPlaintextEmail">
            <Form.Control
              type="number"
              value={inputValue}
              onChange={handleChange}
              placeholder="Masukkan nilai"
              min="0"
              max="1000000"
            />
            {warningMessage && (
              <Alert variant="danger" className="mt-2">
                {warningMessage}
              </Alert>
            )}
            {successMessage && (
              <Alert variant="success" className="mt-2">
                {successMessage}
              </Alert>
            )}
            {errorMessage && (
              <Alert variant="danger" className="mt-2">
                {errorMessage}
              </Alert>
            )}
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            className="w-100 my-3"
            onClick={handleSubmit}
            disabled={istopUpLoading} // Disable button while loading
          >
            {istopUpLoading ? 'Loading...' : 'Top Up'}
          </Button>
        </Col>

        {/* Tombol Currency Amounts */}
        <Col xs={12} md={4} lg={6}>
          <Row>
            {currencyAmounts.map((value, index) => (
              <Col sm="4" md="4" lg="4" key={index} className="mb-2">
                <Button
                  variant="light text-dark"
                  onClick={() => handleButtonClick(value)}
                  style={{ width: '100%' }}
                >
                  {value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TopUp;
