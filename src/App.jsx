import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Menu from './Pages/Menu';
import Navbar from './Pages/Navbar';
import TopUp from './Pages/TopUp'
import Account from './Pages/Account'
import Transactions from './Pages/Transactions'
import Payment from './Pages/Payment'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/topup" element={<TopUp />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/account" element={<Account />} />
        <Route path="/transaction" element={<Transactions />} />


      </Routes>
    </Router>
  );
}

export default App;
