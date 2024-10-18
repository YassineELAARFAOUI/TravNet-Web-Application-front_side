import React,{useState} from 'react';
import './css/RegisterBusiness.css';
import bgLoginUser from "./imgs/bgLoginUser.jpg"
import logo from "./imgs/logo.png"
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';



const Registeruser = () => {
    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Password, setPassword] = useState("");

    const handleInputChangePhone = (event) => {
        const { value } = event.target;
    
        if (/^\d*$/.test(value) && value.length <= 10) {
          setPhone(value);
        }
    };

    const validateEmail = (email) => {
        // Regular expression for validating an email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const Register= async()=>{
        if(FullName!="" && Email!="" && Phone!="" && Password!=""){
            if(validateEmail(Email)){
                if(Phone.length==10 && Phone.split("")[0]==0){
                    let hashPassword =CryptoJS.SHA256(Password).toString();

                    try {
                        const response = await fetch('https://127.0.0.1:8000/accClient', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ fullName:FullName,email:Email,phone:Phone,password:hashPassword }),
                        });
                
                        if (response.ok) {
                            const responseData = await response.json();
                            if(!responseData.existUser){
                                if(responseData.state){
                                    alert("Account created successfully");
                                }else{
                                    alert("Account not created");
                                }
                            }else{
                                alert("User already exist");
                            }
                        }else{
                            alert("Problem of connexion");
                        }
                    } catch (error) {
                        alert("Problem of connexion");
                    }
                }else{
                    alert("Phone incorrect");
                }
            }else{
                alert("Email incorrect");
            }
        }else{
            alert("Fill in all fields");
        }
    
    }

  return (
    <div className="LoginuserPage">
        <div className="formPlace formRegisterScroll">
            <div className="formPlaceCenter">
                <div className="logo">
                    <img src={logo} alt="logo" className='logoimg' />
                </div>
                <div className="inpPlace">
                    <div className="inpPlaceText">FullName</div>
                    <div className="inpPlaceInput">
                        <input type="text" className="inp" placeholder="FullName" onChange={(e)=>{setFullName(e.target.value)}}/>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="inpPlaceText">Email</div>
                    <div className="inpPlaceInput">
                        <input type="text" className="inp" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="inpPlaceText">Phone</div>
                    <div className="inpPlaceInput">
                        <input type="text" className="inp" placeholder="Phone" value={Phone} onChange={handleInputChangePhone}/>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="inpPlaceText">Password</div>
                    <div className="inpPlaceInput">
                        <input type="password" className="inp" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                </div>
                <div className="BtnPlace">
                    <div className="BtnLogin" onClick={Register}>Register</div>
                </div>
                <div className="BtnPlaceHotel">
                    <Link to="/registerbusiness" className="BtnLoginHotels">Register | Business</Link>
                </div>
                <div className="LinkToRegister">
                    <span className="questionText">Already have an account?</span>
                    <Link to="/loginuser" className="linkText">Login</Link>
                </div>
            </div>
        </div>
        <div className="image">
            <img src={bgLoginUser} alt="bgLoginUser" className="bgLoginUser" />
        </div>
    </div>
  );
};

export default Registeruser;
