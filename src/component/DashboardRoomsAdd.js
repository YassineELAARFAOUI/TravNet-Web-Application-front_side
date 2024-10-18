import React, { useState, useEffect } from 'react';
import './css/DashboardRoomsAdd.css';
import logo from './imgs/logo.png';
import MenuDashboardLeft from '../part/MenuDashboardLeft';
import MenuTop from '../part/MenuTop'; 


function DashboardAccount() {
  const [Start, setStart] = useState("");
  const [End, setEnd] = useState("");
  const [RoomNumber, setRoomNumber] = useState("");
  const [Price, setPrice] = useState("");
  const [Surface, setSurface] = useState("");
  const [AirConditioner, setAirConditioner] = useState("NO");
  const [Bathroom, setBathroom] = useState("NO");
  const [Floor, setFloor] = useState("");
  const [Description, setDescription] = useState("");
  const [accBuss, setAccBuss] = useState(0);
  const [patent, setPatent] = useState(0);


  const verifierAuth = () => {
    if (localStorage.getItem('auth') !== null) {
      var savedData = localStorage.getItem('auth');
      var parsedData = JSON.parse(savedData);
      setAccBuss(parsedData.userId);
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
  
  const addRooms=async()=>{
    if(End!="" && Start!="" && Price!="" && Surface!="" && AirConditioner!="" && Bathroom!="" && Floor!="" && Description!=""){
      if(parseInt(Start)<=parseInt(End)){
        try {
          const response = await fetch('https://127.0.0.1:8000/addmultichambre', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              numeroChambreDebut: Start,
              numeroChambreFin: End,
              numeroPersonne: accBuss,
              numeroEtage: Floor,
              price: Price,
              surface: Surface,
              climatisation: AirConditioner,
              salleDebain: Bathroom,
              img: "---",
              dateDepublication: getCurrentDate(),
              description: Description,
              pattenteDeHotel:patent 
          }),
          });
    
          if (response.ok) {
              const responseData = await response.json();
              if(responseData.roomExists==0){
                if(responseData.state){
                  alert("Rooms created successfully");
                }else{
                  alert("Problem of connexion");
                }
              }else{
                alert("One or more rooms already exist");
              }
            }else{
                alert("Problem of connexion");
            }
        } catch (error) {
            alert("Problem of connexion");
        }
      }else{
        alert("Number start greater than end");
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
              <div className="placeTitle">ADD ROOMS</div>
              <div className="inpPlace">
                <div className="placeText">Start</div>
                <div className="placeInput">
                  <input type="text" className="inp" placeholder="Start" value={Start} onChange={(e) => { setStart(e.target.value) }} />
                </div>
              </div>
              <div className="inpPlace">
                <div className="placeText">End</div>
                <div className="placeInput">
                  <input type="text" className="inp" placeholder="End" value={End} onChange={(e) => { setEnd(e.target.value) }} />
                </div>
              </div>
              <div className="inpPlace">
                <div className="placeText">Price</div>
                <div className="placeInput">
                  <input type="text" className="inp" placeholder="Price" value={Price} onChange={(e) => { setPrice(e.target.value) }} />
                </div>
              </div>
              <div className="inpPlace">
                <div className="placeText">Surface</div>
                <div className="placeInput">
                  <input type="text" className="inp" placeholder="Surface" value={Surface} onChange={(e) => { setSurface(e.target.value) }} />
                </div>
              </div>
              <div className="inpPlace">
                <div className="placeText">Floor</div>
                <div className="placeInput">
                  <input type="text" className="inp" placeholder="Floor" value={Floor} onChange={(e) => { setFloor(e.target.value) }} />
                </div>
              </div>
              <div className="inpPlace">
                <div className="placeText">Air Conditioner</div>
                <div className="placeInput">
                  <select className="inp" value={AirConditioner} onChange={(e) => { setAirConditioner(e.target.value) }}>
                    <option value={0}>NO</option>
                    <option value={1}>YES</option>
                  </select>
                </div>
              </div>
              <div className="inpPlace">
                <div className="placeText">Bathroom</div>
                <div className="placeInput">
                  <select className="inp" value={Bathroom} onChange={(e) => { setBathroom(e.target.value) }}>
                    <option value={0}>NO</option>
                    <option value={1}>YES</option>
                  </select>
                </div>
              </div>
              <div className="inpPlace inpPlaceDescripAddRoom">
                <div className="placeText">Description</div>
                <div className="placeInput inpDescripAddRoom">
                  <textarea placeholder="Description..." className='inputDesc' value={Description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                </div>
              </div>
              <div className="btnModify" onClick={addRooms}>Add Rooms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAccount;
