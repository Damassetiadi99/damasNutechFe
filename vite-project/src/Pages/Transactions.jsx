import React, { useEffect, useState } from 'react';
import { Container, Card, Button, ButtonGroup } from 'react-bootstrap';
import { getBalance } from '../service/services';
import { FaDirections, FaEye, FaEyeSlash } from 'react-icons/fa';
import { getProfileThunk } from '../store/action/auth';

import { Form, Row, Col } from 'react-bootstrap';
import profile1 from '../assets/Profile Photo.png'
import { useDispatch,useSelector } from 'react-redux';
import { getBalanceThunk } from '../store/action/services';
import { getTransactionhThunk } from '../store/action/transaction';
const nama = 'Damas Setiadi Sukardi'

const Transactions = ({transaction}) => {
  
  const dispatch = useDispatch()
  const {getBalance,isBalanceLoading ,isBalanceError} = useSelector ((state)=> state.services )
  const {getTransactionH,isgetTransactionsHLoading} = useSelector ((state)=> state.transaction )
  const { getProfile, isLoadinggetProfileThunk, getProfileThunkError } = useSelector((state) => state.auth);

  console.log(getTransactionH?.records)

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
    setLimit((prevLimit) => prevLimit + 5); // Tambahkan 5 ke limit saat tombol diklik
  };

 const transactions = [
  { id: 1, description: 'Topup saldo', amount: 100000, Tanggal: '12 Agustus 2024', type: 'income' }, // Pemasukan
  { id: 2, description: 'Pembayaran listrik', amount: 200000, Tanggal: '5 Mei 2024', type: 'expense' }, // Pengeluaran
  { id: 3, description: 'Pulsa prabayar', amount: 30000, Tanggal: '12 Juni 2024', type: 'expense' }, // Pengeluaran
  { id: 4, description: 'Topup game', amount: 400, Tanggal: '4 Agustus 2024', type: 'income' }, // Pemasukan
  { id: 5, description: 'Zakat', amount: 500, Tanggal: '10 Desember 2023', type: 'expense' }, // Pengeluaran
  { id: 6, description: 'Gaji bulan Agustus', amount: 5000000, Tanggal: '31 Agustus 2024', type: 'income' }, // Pemasukan
  { id: 7, description: 'Belanja bulanan', amount: 800000, Tanggal: '15 September 2024', type: 'expense' }, // Pengeluaran
  { id: 8, description: 'Transfer teman', amount: 250000, Tanggal: '20 September 2024', type: 'income' }, // Pemasukan
  { id: 9, description: 'Biaya sekolah anak', amount: 1500000, Tanggal: '10 Oktober 2024', type: 'expense' }, // Pengeluaran
  { id: 10, description: 'Pemasukan dari investasi', amount: 2000000, Tanggal: '5 November 2024', type: 'income' }, // Pemasukan
  { id: 11, description: 'Bayar cicilan motor', amount: 600000, Tanggal: '12 November 2024', type: 'expense' }, // Pengeluaran
  { id: 12, description: 'Bonus akhir tahun', amount: 1000000, Tanggal: '20 Desember 2024', type: 'income' }, // Pemasukan
  { id: 13, description: 'Pajak tahunan', amount: 1200000, Tanggal: '25 Desember 2024', type: 'expense' }, // Pengeluaran
  { id: 14, description: 'Uang saku bulanan', amount: 300000, Tanggal: '1 Januari 2025', type: 'income' }, // Pemasukan
  { id: 15, description: 'Biaya perjalanan dinas', amount: 500000, Tanggal: '10 Januari 2025', type: 'expense' }, // Pengeluaran
  { id: 16, description: 'Pemasukan dari freelance', amount: 700000, Tanggal: '15 Januari 2025', type: 'income' }, // Pemasukan
  { id: 17, description: 'Perbaikan mobil', amount: 1000000, Tanggal: '20 Januari 2025', type: 'expense' }, // Pengeluaran
  { id: 18, description: 'Hadiah Natal', amount: 400000, Tanggal: '25 Desember 2025', type: 'income' }, // Pemasukan
  { id: 19, description: 'Biaya internet bulanan', amount: 400000, Tanggal: '5 Februari 2025', type: 'expense' }, // Pengeluaran
  { id: 20, description: 'Pemasukan dari penjualan barang', amount: 900000, Tanggal: '15 Februari 2025', type: 'income' }, // Pemasukan
];

  return (
    <Container className="mt-5 pt-5">
      {/* Greeting and Balance Section */}
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
        <p className='fw-bold fs-7'>Semua Transactions </p>
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
