import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getProfileThunk } from '../store/action/auth';
import { useDispatch,useSelector } from 'react-redux';
import { getBalanceThunk } from '../store/action/services';
import { getTransactionhThunk } from '../store/action/transaction';
import profile1 from '../assets/Profile Photo.png'

const Transactions = ({transaction}) => {
  const dispatch = useDispatch()
  const {getBalance } = useSelector ((state)=> state.services )
  const {getTransactionH} = useSelector ((state)=> state.transaction )
  const { getProfile} = useSelector((state) => state.auth);
  const [isSaldoVisible, setIsSaldoVisible] = useState(false);
  const toggleSaldoVisibility = () => {
    setIsSaldoVisible(!isSaldoVisible);
    
  };
  
  useEffect(() => {
    dispatch(getTransactionhThunk());
    dispatch(getBalanceThunk());
    dispatch(getProfileThunk());

  }, [dispatch]);

 const [limit,setLimit] = useState(4)
  const handleShowMore = () => {
    console.log('test');
    setLimit((prevLimit) => prevLimit + 5); 
  };

  return (
    <Container className='p-4'  style={{marginTop : '8rem'}}>
      <Row className="mb-4 col-lg-12">
        <Col lg={4} className="d-flex flex-column align-items-start">
          <img
            src={getProfile?.profile_picture ??  profile1} 
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
                  `Rp ${getBalance.balance === 0 ? '0' : getBalance.balance.toLocaleString('id-ID')}` // Menampilkan "Rp 0" jika saldo 0
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
                <span>Loading...</span> // Menampilkan "Loading..." jika saldo belum tersedia
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
        <p className='fw-bold fs-7'>Semua Transaksi </p>
        <Row>
        {Array.isArray(getTransactionH?.records) && 
          getTransactionH.records.slice(0, limit).map((transaction) => (
            <Col key={transaction.id} className="mb-2" xs={12}>
              <div
                className="border p-4 d-flex justify-content-between align-items-start rounded-2"
                style={{ height: '100px' }} // Removed semicolon
              >
                <div>
                  <p className={`fw-bold ${transaction?.transaction_type === 'TOPUP' ? 'text-success' : 'text-danger'}`}>
                    {transaction?.transaction_type === 'TOPUP' ? '+' : '-'} Rp {transaction?.total_amount?.toLocaleString()}
                  </p>
                  <p className="text-muted fw-lighter">
                      {new Date(transaction?.created_on).toLocaleDateString("id", {
                        weekday: "short",  
                        year: "2-digit",   // 2-digit year (23)
                        month: "long",     // Full month name (January, February)
                        day: "numeric",    // Day of the month (1, 2, ..., 31)
                      })}
                    </p>
                </div>
                <p className="text-end fw-bold">{transaction?.description}</p>
              </div>
            </Col>
          ))
        }
      </Row>
      {limit < getTransactionH?.records?.length && (
        <div className='d-flex justify-content-center'>
          <Button variant='transparent' onClick={handleShowMore} className='text-danger fw-medium '>
            Show More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Transactions;
