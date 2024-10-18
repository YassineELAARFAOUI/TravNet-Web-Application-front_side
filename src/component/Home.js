import React ,{useState,useEffect}from 'react';
import './css/Home.css';
import bghome from './imgs/bghome.jpg'
import travnet from './imgs/travnet.png'
import date from './imgs/date.png'
import location from './imgs/location.png'
import searchFleche from './imgs/searchFleche.png'
import menu from './imgs/menu.png'
import close from './imgs/close.png'
import des1 from './imgs/des1.jpg'
import des2 from './imgs/des2.jpg'
import Collection from '../part/Collection'
import Footer from '../part/Footer'
import { Link } from 'react-router-dom';


const Home = () => {
    const [MenuMobile, setMenuMobile] = useState("translateX(1500px)");
    const [MenuMobileBg, setMenuMobileBg] = useState("var(--colorBlackLowOpacity)");

    const [City, setCity] = useState("");
    const [Checkin, setCheckin] = useState("");
    const [Checkout, setCheckout] = useState("");

    const [idClient, setidClient] = useState("");



    const closeMenu = ()=>{
        setMenuMobileBg("var(--colorVide)");
        setMenuMobile("translateX(1500px)")
    }
    const openMenu = ()=>{
        setMenuMobileBg("var(--colorBlackLowOpacity)");
        setMenuMobile("translateX(0px)")
    }
    const logout=()=>{
        localStorage.removeItem('authC');
        window.location.href = "/loginuser";
    }
    
  const verifierAuth=()=>{
    if(localStorage.getItem('authC') !== null) {
      var savedData = localStorage.getItem('authC');
      var parsedData = JSON.parse(savedData);
      setidClient(parsedData.userId);
    } else {
        window.location.href = "/loginuser";
    }
  }
  useEffect(() => {
    verifierAuth();
  }, []);


  const SearchBtn=()=>{
    if(City!="" && Checkin!="" && Checkout!=""){
        window.location.href = "/hotels/"+City+"/"+Checkin+"/"+Checkout;
    }else{
        alert("Fill in all fields")
    }
  }
  return (
    <div className="Home">
        <div className="HomeCenter">
            <div className="Box">
                <img src={bghome} alt="bghome" className="bghomeImg" />
                <div className="Menu">
                    <img src={travnet} alt="travnet" className="logo" />
                    <div className="listMenu">
                        <div className="listMenuItem">Home</div>
                        <a href="#tophotels" className="listMenuItem">Top Hotels</a>
                        <Link to="/reclamations" className="listMenuItem">Reservation</Link>
                        <a href="#footer" className="listMenuItem">Follow us</a>
                    </div>
                    <div className="signInBtn" onClick={logout}>Logout Client({idClient})</div>
                    <div className="buttonOpenMenuMobile" onClick={openMenu}>
                        <img src={menu} alt="menu" className="iconMenu"/>
                    </div>
                </div>
                <div className="form">
                    <div className="formCentre">
                        <div className="inpPlaceBox">
                            <div className="inpPlace">
                                <div className="NameInput">Location</div>
                                <div className="boxInp">
                                    <div className="placeIconeInp">
                                        <img src={location} alt="location" className="IconeImgInp" />
                                    </div>
                                    <div className="inpForm">
                                        <input type="text" className="inputForm" placeholder="Find location" value={City} onChange={(e)=>{setCity(e.target.value)}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="inpPlace">
                                <div className="NameInput">Check-in Date</div>
                                <div className="boxInp">
                                    <div className="placeIconeInp">
                                        <img src={date} alt="location" className="IconeImgInp" />
                                    </div>
                                    <div className="inpForm">
                                        <input type="date" className="inputForm" value={Checkin} onChange={(e)=>{setCheckin(e.target.value)}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="inpPlace">
                                <div className="NameInput">Check-out Date</div>
                                <div className="boxInp">
                                    <div className="placeIconeInp">
                                        <img src={date} alt="location" className="IconeImgInp" />
                                    </div>
                                    <div className="inpForm">
                                        <input type="date" className="inputForm" value={Checkout} onChange={(e)=>{setCheckout(e.target.value)}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filtreAndBtn">
                            <div className="filterPlace">
                                <div className="wordFilter">Filter:</div>
                                <div className="BtnFilter">Top</div>
                                <div className="BtnFilter">Info</div>
                                <div className="BtnFilter">Footer</div>
                            </div>
                            <div className="ButtonSearch" onClick={SearchBtn}>
                                <div className="SearchText">Search</div>
                                <div className="IconSearch">
                                    <img src={searchFleche} alt="searchFleche" className="IconSearchImg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gigTitle">Top trending hotel in worldwide</div>
            <div className="smollTitle">Discover the most trending hotels worldwide for an unforgettable experience.</div>
            <Collection/>
            <div className="MenuMobileList" style={{backgroundColor:MenuMobileBg,transform:MenuMobile}}>
                <div className="MenuMobileListCentre">
                    <div className="ButtonCloseMenuPlace">
                        <div className="ButtonCloseMenu" onClick={closeMenu}>
                            <img src={close} alt="close" className="closeBtnIcon" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="gigTitle">Get promo for a cheaper price</div>
            <div className="offrePlace">
                <div className="offrePlaceItem">
                    <img src={des1} alt="des1" className="imagedes" />
                </div>
                <div className="offrePlaceItem">
                    <img src={des2} alt="des1" className="imagedes" />
                </div>
            </div>
            <Footer/>
        </div>
    </div>
  );
};

export default Home;
