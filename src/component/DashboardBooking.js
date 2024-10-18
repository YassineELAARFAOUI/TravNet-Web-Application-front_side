import React,{useState,useEffect } from 'react';
import './css/DashboardBooking.css';
import MenuDashboardLeft from '../part/MenuDashboardLeft'; 
import MenuTop from '../part/MenuTop'; 



function DashboardBooking() {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [RoomNumber, setRoomNumber] = useState("");
  const currentDate = formatDate(new Date());
  const [dateCheckIn, setDateCheckIn] = useState(currentDate);
  const [dateCheckOut, setDateCheckOut] = useState(currentDate);
  const [accClient, setAccClient] = useState("");
  const [patent, setPatent] = useState(0);



  const verifierAuth=()=>{
    if(localStorage.getItem('auth') !== null) {
      var savedData = localStorage.getItem('auth');
      var parsedData = JSON.parse(savedData);
      setPatent(parsedData.patent);
    } else {
        window.location.href = "/LoginBusiness";
    }
  }
  
  useEffect(() => {
    verifierAuth();
  }, []);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  const handleNumberChamber = (event) => {
    const newValue = event.target.value;
    if (newValue === '' || /^[0-9]*$/.test(newValue)) {
      setRoomNumber(newValue);
    }
  };
  const handleNumberClient = (event) => {
    const newValue = event.target.value;
    if (newValue === '' || /^[0-9]*$/.test(newValue)) {
      setAccClient(newValue);
    }
  };

  const Booking=async()=>{
    if(RoomNumber!="" && dateCheckIn!="" && dateCheckOut!=""){
      try {
        const response = await fetch('https://127.0.0.1:8000/addreservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clientId: accClient,
            pattenteDeHotel: patent,
            datecheckin: dateCheckIn,
            datecheckout: dateCheckOut,
            confirmation: 1,
            numeroDeChambre:RoomNumber
        }),
        });
  
        if (response.ok) {
            const responseData = await response.json();
            if(responseData.state){
              alert("Reservation added successfully");
            }else{
              alert("Already reserved for another person");
            }
          }else{
              alert("Problem of connexion");
          }
      } catch (error) {
          alert("Problem of connexion");
      }
    }else{
      alert("Fill in all fields");
    }
  }
  return (
    <div className="DashboardProfildPage">
      <MenuTop/>
      <div className="pageDashbord">
        <MenuDashboardLeft />
        <div className="rightpage">
          <div className="pageDashboardAccountModifCentre">
            <div className="inpBox">
                <div className="placeTitle">Booking</div>
                <div className="inpPlace">
                    <div className="placeText">ID client</div>
                    <div className="placeInput">
                        <input type="text" className="inp" placeholder="ID client" value={accClient} onChange={handleNumberClient}/>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="placeText">Room Number</div>
                    <div className="placeInput">
                        <input type="text" className="inp" placeholder="Room Number" value={RoomNumber} onChange={handleNumberChamber}/>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="placeText">Date check-in</div>
                    <div className="placeInput">
                        <input type="date" className="inp" value={dateCheckIn} onChange={(e)=>{setDateCheckIn(e.target.value)}}/>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="placeText">Date check-out</div>
                    <div className="placeInput">
                        <input type="date" className="inp" value={dateCheckOut} onChange={(e)=>{setDateCheckOut(e.target.value)}}/>
                    </div>
                </div>
                <div className="btnmarginNone" onClick={Booking}>Add Reservation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardBooking;
