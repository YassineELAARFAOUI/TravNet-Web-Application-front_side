import React, { useState,useEffect } from 'react';
import './css/Hotels.css'

import MenuClient from '../part/MenuClient'
import reduction from './imgs/reduction.jpg'
import img1 from './imgs/img1.jpg'
import location from './imgs/city_bleu.png'

const Hotels = () => {
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const checkout = parts[parts.length - 1];
    const checkin = parts[parts.length - 2];
    const city = parts[parts.length - 3];
    const [Page, setPage] = useState(1);
    const [dataFromServer, setDataFromServer] = useState([]);

    const [dispLoading, setDispLoading] = useState("flex");


    const getData=async(page)=>{
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
                page: page
            }),
        });
    
        if (response.ok) {
            const responseData = await response.json();
            if(responseData.hotelExistent){
                setDispLoading("none")
                setDataFromServer(responseData.hotels);
            }else{
                setDispLoading("none")
                alert("No Hotels Exist");
                setPage(Page);
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
        getData(Page);
    }, []);

    const reserver=(idHotel)=>{
        window.location.href = "/hotelunite/"+city+"/"+idHotel+"/"+checkin+"/"+checkout;
    }

    const nextBtn=()=>{
        setPage(Page+1);
        getData(Page+1);
    }



    return (
        <div className="Hotels">
            <MenuClient title="Hotels" />
            <div className="bodyHotel">
                <div className="bodyHotelCentre">
                    <div className="left">
                        <div className="PubPlace">
                            <img src={reduction} alt="reduction" className="reduction" />
                        </div>
                        <div className="PlaceInputs">
                            <div className="PlaceInputsItem">
                                <input type="text" placeholder="Min" className="inpFilter" />
                            </div>
                            <div className="PlaceInputsItem">
                                <input type="text" placeholder="Max" className="inpFilter" />
                            </div>
                        </div>
                        <div className="PlaceInputs topDiv">
                            <div className="buttonFilter">Filter</div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="Loading" style={{display:dispLoading}}>
                            Loading ...
                        </div>
                        <div className="part">
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
                        <div className="PlaceButtonPagination">
                            <div className="PlaceButtonPaginationCenter">
                                <div className="buttonChange" onClick={nextBtn}>NEXT</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotels;
