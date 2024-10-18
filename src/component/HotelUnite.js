import React, { useState,useEffect } from 'react';
import './css/HotelUnite.css'
import MenuClient from '../part/MenuClient'
import img1 from './imgs/img1.jpg'
import location from './imgs/city_bleu.png'
import ville_bleu from './imgs/ville_bleu.png'
import rate_bleu from './imgs/rate_bleu.png'
import imgvide from './imgs/vide.jpg';



const HotelUnite = () => {
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const checkout = parts[parts.length - 1];
    const checkin = parts[parts.length - 2];
    const patent = parts[parts.length - 3];
    const city = parts[parts.length - 4];

    const [dataFromServer, setDataFromServer] = useState([]);

    const [NameHotel, setNameHotel] = useState("");
    const [DescripHotel, setDescripHotel] = useState("");
    const [CityHotel, setCityHotel] = useState("");
    const [AdressHotel, setAdressHotel] = useState("");
    const [RateHotel, setRateHotel] = useState("");
    const [ImageHotel, setImageHotel] = useState(imgvide);
    


    const getDataHotel=async()=>{
        try {
        const response = await fetch('https://127.0.0.1:8000/recupererHotelParpattenete', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pattenteDehotele:patent
            }),
        });
    
        if (response.ok) {
            const responseData = await response.json();
            setNameHotel(responseData.hotelName);
            setDescripHotel(responseData.descriptionOfHotel);
            setCityHotel(responseData.cityOfHotel);
            setAdressHotel(responseData.locationOfHotel);
            setRateHotel(responseData.rateofHotel);
            setImageHotel("https://127.0.0.1:8000/uploads/images/"+responseData.imageName);
        } else {
            alert("Problem with connection");
        }
        } catch (error) {
            alert("Problem with connection");
        }
    }

    const getData=async()=>{
        try {
        const response = await fetch('https://127.0.0.1:8000/viewCatlogHotel', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                city: city,
                datecheckin: checkin,
                datecheckout: checkout,
                page: 1
            }),
        });
    
        if (response.ok) {
            const responseData = await response.json();
            if(responseData.hotelExistent){
                setDataFromServer(responseData.hotels);
            }
        } else {
            alert("Problem with connection");
        }
        } catch (error) {
            alert("Problem with connection");
        }
    }

    const verifierAuth=()=>{
        if(localStorage.getItem('authC') !== null) {
          var savedData = localStorage.getItem('authC');
          var parsedData = JSON.parse(savedData);
        } else {
            window.location.href = "/loginuser";
        }
      }

    useEffect(() => {
        verifierAuth();
        getDataHotel();
        getData();
    }, []);

    const reserver=(idHotel)=>{
        window.location.href = "/hotelunite/"+city+"/"+idHotel+"/"+checkin+"/"+checkout;
    }

    const reserverBtn=()=>{
        window.location.href = "/payment/"+patent+"/"+checkin+"/"+checkout;
    }


    return (
        <div className="Hotels">
            <MenuClient title={"Hotel: "+NameHotel} />
            <div className="HotelUnite">
                <div className="HotelUniteCenter">
                    <div className="infoHotel">
                        <div className="ImageHotell">
                            <div className="PlaceImageHotell">
                                <img src={ImageHotel} alt="" className="imgHotel" />
                            </div>
                        </div>
                        <div className="ImageHotell part2">
                            <div className="NameOfHotel">{NameHotel}</div>
                            <div className="DescriptionOfHotel">{DescripHotel}</div>
                            <div className="ElemOfHotel">
                                <div className="IconeElem">
                                    <img src={ville_bleu} alt="" className='IconeImgElm' />
                                </div>
                                <div className="textElem">
                                    {CityHotel}
                                </div>
                            </div>
                            <div className="ElemOfHotel spaceTop">
                                <div className="IconeElem">
                                    <img src={location} alt="" className='IconeImgElm' />
                                </div>
                                <div className="textElem">
                                    {AdressHotel}
                                </div>
                            </div>
                            <div className="ElemOfHotel spaceTop">
                                <div className="IconeElem">
                                    <img src={rate_bleu} alt="" className='IconeImgElm' />
                                </div>
                                <div className="textElem">
                                    {RateHotel}
                                </div>
                            </div>
                            <div className="PlaceBtnReserver">
                                <div className="BtnReserve" onClick={reserverBtn}>Reserve</div>
                            </div>
                        </div>
                    </div>
                    <div className="partMoreHotels">
                        <div className="partMoreHotelsMenu">SIMILAR</div>
                        <div className="HotesList">
                            {dataFromServer.map((elem, index) => (
                                <div className="elementHotel" key={index} onClick={() => reserver(elem.hotel_id)}>
                                <div className="ImageHotel">
                                    <img src={"https://127.0.0.1:8000/uploads/images/"+elem.img} alt="" className="hotelimg" />
                                </div>
                                <div className="Description">{(elem.description).substring(0, 50)}</div>
                                <div className="Description locationPlace"><img src={location} alt="" className="location" />{elem.city}</div>
                                <div className="Price">{elem.minPrice.toString()+"Dh - "+elem.maxPrice.toString()+"Dh"}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelUnite;
