import React ,{useState}from 'react';
import './css/Loginuser.css';
import bgLoginUser from "./imgs/bgLoginUser.jpg"
import logo from "./imgs/logo.png"
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';


const Loginuser = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const Login=async()=>{
        const hashPassword =CryptoJS.SHA256(Password).toString();
        try {
            const response = await fetch('https://127.0.0.1:8000/loginClient', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email:Email,password:hashPassword}),
            });
      
            if (response.ok) {
                const responseData = await response.json();
                if(responseData.existUser){
                    if(!responseData.isBlocked){
                        if(hashPassword==responseData.password){
                            var data = {
                                userId: responseData.idClient,
                                email: Email,
                                password: Password,
                            };
                            var jsonData = JSON.stringify(data);
                            localStorage.setItem('authC', jsonData);
                            window.location.href = "/";
                        }else{
                            alert("Password incorrect");
                        }
                    }else{
                        alert("User is blocked");
                    }
                }else{
                    alert("User not exist");
                }
              }else{
                  alert("Problem of connexion");
              }
        } catch (error) {
            alert("Problem of connexion");
        }

    }

    return (
        <div className="LoginuserPage">
            <div className="formPlace">
                <div className="formPlaceCenter">
                    <div className="logo">
                        <img src={logo} alt="logo" className='logoimg' />
                    </div>
                    <div className="inpPlace">
                        <div className="inpPlaceText">Email</div>
                        <div className="inpPlaceInput">
                            <input type="text" className="inp" placeholder="Email" value={Email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="inpPlace">
                        <div className="inpPlaceText">Password</div>
                        <div className="inpPlaceInput">
                            <input type="password" className="inp" placeholder="Password" value={Password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="BtnPlace">
                        <div className="BtnLogin" onClick={Login}>Login</div>
                    </div>
                    <div className="BtnPlaceHotel">
                        <Link to="/loginbusiness" className="BtnLoginHotels">Login | Business</Link>
                    </div>
                    <div className="LinkToRegister">
                        <span className="questionText">I don't have an account?</span>
                        <Link to="/registeruser" className="linkText">Register</Link>
                    </div>
                </div>
            </div>
            <div className="image">
                <img src={bgLoginUser} alt="bgLoginUser" className="bgLoginUser" />
            </div>
        </div>
    );
};

export default Loginuser;
