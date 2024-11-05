import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileThunk } from '../store/action/auth';
import { getBannerThunk ,getServiceThunk,getBalanceThunk } from '../store/action/services';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; 
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import profile1 from '../assets/Profile Photo.png';

const Menu = () => {
  const dispatch = useDispatch();
  const [isSaldoVisible, setIsSaldoVisible] = useState(false);
  const { getProfile, isLoadinggetProfileThunk, getProfileThunkError } = useSelector((state) => state.auth);
  const {getBanner,isLoadingBanner ,getBannerError} = useSelector ((state)=> state.services )
  const {getService,isServiceLoading ,isServiceError} = useSelector ((state)=> state.services )
  const {getBalance,isBalanceLoading ,isBalanceError} = useSelector ((state)=> state.services )

  useEffect(() => {
    dispatch(getProfileThunk());
    dispatch(getBannerThunk());
    dispatch(getServiceThunk());
    dispatch(getBalanceThunk());

  }, [dispatch]);
  // const handleClick = () => {
  //   dispatch(getService({ code: services.service_code, name: services.service_name, icon: services.service_icon,tarif : services.service_tariff}));

  //   // Navigasi ke halaman topup
  //   navigate('/topup');
  // };

    const toggleSaldoVisibility = () => {
      setIsSaldoVisible(!isSaldoVisible);
    };
  if (isLoadinggetProfileThunk) {
    return <div>Loading...</div>;
  }
  return (
    <Container className="mt-5 pt-5">
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

      {/* Service Icons Section */}
      <Row className="text-center">
      {Array.isArray(getService) && getService.length > 0 ? (
        getService.map((service, index) => (
          <Col xs={4} md={1} key={index} className="text-center my-4">
            <div className="d-flex flex-column align-items-center">
              <div style={{ borderRadius: '10px' }}>
                <img 
                  src={service.service_icon ?? ''} 
                  alt={service.service_icon ?? ''} 
                  style={{ width: '50px', height: '50px' }} 
                  // onClick={handleClick(service)}
                />
              </div>
              <h6 className="fw-small">{service.service_name ?? '-'}</h6>
            </div>
          </Col>
        ))
      ) : (
        <p>No services available</p> // fallback jika tidak ada data
      )}
    </Row>


      {/* Promo Banners Section */}
      <p className="my-4 fw-bold fs-6">Temukan Promo Menarik</p>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4.5}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="promo-banner mt-4"
      >
         {Array.isArray(getBanner) && getBanner.length > 0 ? (
            getBanner.map((promo, index) => (
              <SwiperSlide key={index}>
                <Card className="mb-3">
                  <Card.Img
                    src={promo.banner_image}
                    alt={`Promo ${index + 1}`}
                    style={{ borderRadius: '10px' }}
                  />
                </Card>
              </SwiperSlide>
            ))
          ) : (
            <p>No promotions available</p>
          )}

      </Swiper>
    </Container>
  );
};

export default Menu;
