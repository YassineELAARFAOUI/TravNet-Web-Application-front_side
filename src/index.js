import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './component/Home';
import Loginuser from './component/Loginuser';
import LoginBusiness from './component/LoginBusiness';
import Registeruser from './component/Registeruser';
import RegisterBusiness from './component/RegisterBusiness';
import DashboardHome from './component/DashboardHome';
import DashboardAccount from './component/DashboardAccount';
import DashboardAccountModif from './component/DashboardAccountModif';
import DashboardDispRoom from './component/DashboardDispRoom';
import DashboardRoomAddOne from './component/DashboardRoomAddOne';
import DashboardRoomsAdd from './component/DashboardRoomsAdd';
import DashboardBooking from './component/DashboardBooking';
import DashboardReclamation from './component/DashboardReclamation';
import DashboardReclamationUnite from './component/DashboardReclamationUnite';
import Reclamations from './component/Reclamations';
import Reclamation from './component/Reclamation';
import DashboardRoomUnite from './component/DashboardRoomUnite';
import HotelUnite from './component/HotelUnite';
import Hotels from './component/Hotels';
import Payment from './component/Payment';
import { Provider } from 'react-redux';
import { legacy_createStore } from 'redux';
import reducer from './Config/reducer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const store = legacy_createStore(reducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/loginuser" element={<Loginuser />} /> 
        <Route path="/loginbusiness" element={<LoginBusiness />} /> 
        <Route path="/registeruser" element={<Registeruser />} /> 
        <Route path="/registerbusiness" element={<RegisterBusiness />} /> 
        <Route path="/dashboardhome" element={<DashboardHome />} /> 
        <Route path="/dashboardaccount" element={<DashboardAccount />} /> 
        <Route path="/dashboardaccountmodif" element={<DashboardAccountModif />} /> 
        <Route path="/dashboarddisproom" element={<DashboardDispRoom />} /> 
        <Route path="/dashboardroomaddone" element={<DashboardRoomAddOne />} /> 
        <Route path="/dashboardroomsadd" element={<DashboardRoomsAdd />} /> 
        <Route path="/dashboardbooking" element={<DashboardBooking />} /> 
        <Route path="/dashboardreclamation" element={<DashboardReclamation />} /> 
        <Route path="/dashboardreclamationunite/*" element={<DashboardReclamationUnite />} /> 
        <Route path="/reclamations" element={<Reclamations />} /> 
        <Route path="/reclamation/*" element={<Reclamation />} /> 
        <Route path="/dashboardroomunite/*" element={<DashboardRoomUnite />} /> 
        <Route path="/hotels/*" element={<Hotels />} /> 
        <Route path="/hotelunite/*" element={<HotelUnite />} /> 
        <Route path="/payment/*" element={<Payment />} /> 
      </Routes>
    </Router>
  </Provider>
);

