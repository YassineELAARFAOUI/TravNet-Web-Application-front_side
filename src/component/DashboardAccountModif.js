import React,{useState,useEffect } from 'react';
import './css/DashboardAccountModif.css';
import logo from './imgs/logo.png';
import MenuDashboardLeft from '../part/MenuDashboardLeft'; 
import MenuTop from '../part/MenuTop'; 



function DashboardAccount() {
  const [HotelName, setHotelName] = useState("");
  const [Description, setDescription] = useState("");
  const [Rate, setRate] = useState("");
  const [FirstNamebuss, setFirstNamebuss] = useState("");
  const [LastNamebuss, setLastNamebuss] = useState("");
  const [Phonebuss, setPhonebuss] = useState("");
  const [Patent, setPatent] = useState("");
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [Address, setAddress] = useState("");

  const getDataRoom =async(idAcc)=>{
    try {
        const response = await fetch('https://127.0.0.1:8000/disprofile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idAccBussiness:idAcc
        }),
        });

        if (response.ok) {
            const responseData = await response.json();
            if(responseData.stateDataAccBussiness){
                setHotelName(responseData.hotel.name);
                setDescription(responseData.hotel.description);
                setRate(responseData.hotel.rate);
                setFirstNamebuss((responseData.accBusiness.fullName).split(" ")[0]);
                setLastNamebuss((responseData.accBusiness.fullName).split(" ")[1]);
                setPhonebuss(responseData.accBusiness.phone);
                setPatent(responseData.accBusiness.patenteDeHotel);
                setCountry(responseData.accBusiness.country);
                setCity(responseData.hotel.city);
                setAddress(responseData.hotel.location);
            }else{
                alert("Problem user not exist");
            }
          }else{
              alert("Problem of connexion");
          }
    } catch (error) {
        alert("Problem of connexion");
    }
  }

  const verifierAuth=()=>{
    if(localStorage.getItem('auth') !== null) {
      var savedData = localStorage.getItem('auth');
      var parsedData = JSON.parse(savedData);
      getDataRoom(parsedData.userId);
  } else {
    window.location.href = "/LoginBusiness";
  }
  }
  const modifierAccount=async()=>{
    var savedData = localStorage.getItem('auth');
    var parsedData = JSON.parse(savedData);
    try {
        const response = await fetch('https://127.0.0.1:8000/modifierinfoprofile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idAccBussiness: parsedData.userId,
            firstName: FirstNamebuss,
            lastName: LastNamebuss,
            phone: Phonebuss,
            country: Country,
            patenteDeHotel: Patent,
            name: HotelName,
            description: Description,
            location: Address,
            rate: Rate,
            city: City
        }),
      });

        if (response.ok) {
            const responseData = await response.json();
            if(responseData.actionModifier){
                alert("Account modified successfully")
            }else{
                alert("Account not modified successfully");
            }
          }else{
              alert("Problem of connexion");
          }
    } catch (error) {
        alert("Problem of connexion");
    } 
  }
  useEffect(() => {
    verifierAuth();
  }, []);
  return (
    <div className="DashboardProfildPage">
      <MenuTop/>
      <div className="pageDashbord">
        <MenuDashboardLeft />
        <div className="rightpage">
          <div className="pageDashboardAccountModifCentre">
            <div className="inpBox">
                <div className="placeTitle">Modify my Account</div>
                <div className="inpPlace">
                    <div className="placeText">Hotel Name</div>
                    <div className="placeInput">
                        <input type="text" className="inp" placeholder="Hotel Name" value={HotelName} onChange={(e)=>{setHotelName(e.target.value)}}/>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="placeText">Description</div>
                    <div className="placeInput">
                        <input type="text" className="inp" placeholder="Description" value={Description} onChange={(e)=>{setDescription(e.target.value)}}/>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="placeText">Rate</div>
                    <div className="placeInput">
                        <select className="inp" value={Rate} onChange={(e)=>{setRate(e.target.value)}}>
                          <option value="">----</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                      </select>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="placeText">First Name</div>
                    <div className="placeInput">
                        <input type="text" className="inp" placeholder="First Name" value={FirstNamebuss} onChange={(e)=>{setFirstNamebuss(e.target.value)}}/>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="placeText">Last Name</div>
                    <div className="placeInput">
                        <input type="text" className="inp" placeholder="Last Name" value={LastNamebuss} onChange={(e)=>{setLastNamebuss(e.target.value)}}/>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="placeText">Phone</div>
                    <div className="placeInput">
                        <input type="text" className="inp" placeholder="Phone" value={Phonebuss} onChange={(e)=>{setPhonebuss(e.target.value)}}/>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="placeText">Country</div>
                    <div className="placeInput">
                        <input type="text" className="inp" placeholder="Country" value={Country} onChange={(e)=>{setCountry(e.target.value)}}/>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="placeText">City</div>
                    <div className="placeInput">
                        <input type="text" className="inp" placeholder="City" value={City} onChange={(e)=>{setCity(e.target.value)}}/>
                    </div>
                </div>
                <div className="inpPlace">
                    <div className="placeText">address</div>
                    <div className="placeInput">
                        <input type="text" className="inp" placeholder="address" value={Address} onChange={(e)=>{setAddress(e.target.value)}}/>
                    </div>
                </div>
                <div className="btnModify" onClick={modifierAccount}>Save Information</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAccount;
