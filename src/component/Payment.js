import React, { useState,useEffect } from 'react';
import './css/Payment.css'
import MenuClient from '../part/MenuClient'
import MasterCard from '../component/imgs/MasterCard.png'
import Visa from '../component/imgs/Visa.png'


const Payment = () => {

    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const checkout = parts[parts.length - 1];
    const checkin = parts[parts.length - 2];
    const patent = parts[parts.length - 3];
    const [ClientId, setClientId] = useState(0);

    const [NumberCard, setNumberCard] = useState("");
    const [NameCard, setNameCard] = useState("");
    const [Mois, setMois] = useState(1);
    const [Year, setYear] = useState(2024);
    const [Codevalid, setCodevalid] = useState("");
    const [RoomNumber, setRoomNumber] = useState("");
    const [LoadRooms, setLoadRooms] = useState([]);


    const handleInputChangeNumberCard = (event) => {
        const { value } = event.target;
    
        if (/^\d*$/.test(value) && value.length <= 16) {
            setNumberCard(value);
        }
    };
    const handleInputChangeValide = (event) => {
        const { value } = event.target;
    
        if (/^\d*$/.test(value) && value.length <= 3) {
            setCodevalid(value);
        }
    };

    const GetRooms=async()=>{
        try {
            const response = await fetch('https://127.0.0.1:8000/recupererNumeroEnsembleChambre', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                datecheckin: checkin,
                datecheckout: checkout,
                pattenteDeHotel: patent
            }),
            });
    
            if (response.ok) {
                const responseData = await response.json();
                if(responseData.chambresExistent){
                    setLoadRooms(responseData.chambres);
                }else{
                    alert("NO room available");
                }
            }else{
                alert("Problem of connexion");
            }
        } catch (error) {
            alert("Problem of connexion");
        }
    }

    const DoReservation=async()=>{
        if(NumberCard!="" && NameCard!="" && Codevalid!="" &&RoomNumber!=""){
            if(NumberCard.length===16){
                if(Codevalid.length===3){
                    try {
                        const response = await fetch('https://127.0.0.1:8000/addreservation', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            clientId: ClientId,
                            pattenteDeHotel: patent,
                            datecheckin: checkin,
                            datecheckout: checkout,
                            confirmation: 1,
                            numeroDeChambre:RoomNumber
                        }),
                        });
                
                        if (response.ok) {
                            const responseData = await response.json();
                            if(responseData.state){
                                DoPayment();
                            }else{
                                console.log("Problem of connexion");
                            }
                        }else{
                            alert("Problem of connexion");
                        }
                    } catch (error) {
                        alert("Problem of connexion");
                    }
                }else{
                    alert("Card verification incorrect");
                }
            }else{
                alert("Card number incorrect");
            }
        }else{
            alert("Fill in all fields");
        }

    }

    const DoPayment =async()=>{
        try {
            const response = await fetch('https://127.0.0.1:8000/addpayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CardHolderName: NameCard,
                cardNumber: NumberCard,
                dateExperation: Year+"-"+Mois,
                cardVerification: Codevalid
            }),
            });
    
            if (response.ok) {
                const responseData = await response.json();
                if(responseData.stateData){
                    alert("Payment And Reservation done")
                    window.location.href = "/";
                }else{
                    alert("Problem of connexion")
                }
            }else{
                alert("Problem of connexion");
            }
        } catch (error) {
            alert("Problem of connexion");
        }
    }

    const verifierAuth=()=>{
        if(localStorage.getItem('authC') !== null) {
          var savedData = localStorage.getItem('authC');
          var parsedData = JSON.parse(savedData);
          setClientId(parsedData.userId);
        } else {
            window.location.href = "/loginuser";
        }
      }

    useEffect(() => {
        verifierAuth();
        GetRooms();
    }, []);


    return (
        <div className="Hotels">
            <MenuClient title="Payment" />
            <div className="HotelUnite">
                <div className="pagePayment">
                    <div className="Panel">
                        <div className="PanelCenter">
                            <div className="PlaceTitreInp">Room</div>
                            <div className="PlaceInp">
                            <select className="inp" value={RoomNumber} onChange={(e)=>{setRoomNumber(e.target.value)}}>
                                <option value="">----</option>
                                {LoadRooms.map((elem, index) => (
                                    <option key={index} value={elem.numero_chambre}>{elem.numero_chambre}</option>
                                ))}
                            </select>
                            </div>
                            <div className="line"></div>
                            <div className="PlaceTitreInp">Card Holder Name</div>
                            <div className="PlaceInp">
                                <input type="text" className="inp" placeholder="Card Holder Name" value={NameCard} onChange={(e)=>{setNameCard(e.target.value)}}/>
                            </div>
                            <div className="PlaceTitreInp">Card Number</div>
                            <div className="PlaceInp">
                                <input type="text" className="inp" placeholder="Card Number" value={NumberCard} onChange={handleInputChangeNumberCard}/>
                            </div>
                            <div className="PlaceInpDate">
                                <div className="element">
                                    <div className="PlaceTitreInp2">Month</div>
                                    <div className="PlaceInp2">
                                    <div className="PlaceInp2">
                                        <select className="inp" value={Mois} onChange={(e)=>{setMois(e.target.value)}}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                            <option value={8}>8</option>
                                            <option value={9}>9</option>
                                            <option value={10}>10</option>
                                            <option value={11}>11</option>
                                            <option value={12}>12</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>
                                <div className="element marginLeft">
                                    <div className="PlaceTitreInp2">Year</div>
                                    <div className="PlaceInp2">
                                        <select className="inP2" value={Year} onChange={(e)=>{setYear(e.target.value)}}>
                                            <option value={2024}>2024</option>
                                            <option value={2025}>2025</option>
                                            <option value={2026}>2026</option>
                                            <option value={2027}>2027</option>
                                            <option value={2028}>2028</option>
                                            <option value={2029}>2029</option>
                                            <option value={2030}>2030</option>
                                            <option value={2031}>2031</option>
                                            <option value={2032}>2032</option>
                                            <option value={2033}>2033</option>
                                            <option value={2034}>2034</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="PlaceInpDate">
                                <div className="element">
                                    <div className="PlaceTitreInp2">Card Verification</div>
                                    <div className="PlaceInp2">
                                        <div className="PlaceInp2 inpvalid">
                                            <input type="text" className="inp" placeholder="Card Verification" value={Codevalid} onChange={handleInputChangeValide}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="BtnPayment" onClick={DoReservation}>PAY</div>

                            <div className="support">Supported by</div>
                            <div className="supportedimg">
                                <img src={MasterCard} alt="" className="imgcard" />
                                <img src={Visa} alt="" className="imgcard2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
