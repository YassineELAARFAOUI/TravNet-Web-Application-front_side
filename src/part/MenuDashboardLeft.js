import React from 'react';
import './css/MenuDashboardLeft.css';
import { Link } from 'react-router-dom';

function MenuDashboardLeft() {

  return (
    <div className="menuLeft">
      <div className="TitleMenu">DASHBOARD</div>
      <Link to="/dashboardhome" className="BtnMenuLeft">Home</Link>
      <Link to="/dashboardbooking" className="BtnMenuLeft">Booking</Link>
      <Link to="/dashboarddisproom" className="BtnMenuLeft">Rooms</Link>
      <Link to="/dashboardreclamation" className="BtnMenuLeft">Claim</Link>
      <Link to="/dashboardaccount" className="BtnMenuLeft">Account</Link>
    </div>
  );
}

export default MenuDashboardLeft;
