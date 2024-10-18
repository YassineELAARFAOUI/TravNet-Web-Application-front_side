import React,{useState} from 'react';
import './css/MenuTop.css';
import logo from '../component/imgs/logo.png';

function MenuTop() {
  const logout=()=>{
    localStorage.removeItem('auth');
    window.location.href = "/LoginBusiness";
  }
  return (
    <div className="MenuDashboard">
        <img src={logo} alt="logo" className="logo" />
        <div className="BtnLogout" onClick={logout}>Log-out</div>
    </div>
  );
}

export default MenuTop;
