import React,{useState,useEffect} from 'react';
import './css/Reclamation.css';
import MenuClient from '../part/MenuClient'


function Reclamation() {
  const currentUrl = window.location.href;
  const parts = currentUrl.split('/');
  const idClient = parts[parts.length - 1];
  const chamber = parts[parts.length - 2];
  const idHotel = parts[parts.length - 3];
  
  const [Email, setEmail] = useState("");
  const [Description, setDescription] = useState("");

  const validateEmail = (email) => {
    // Regular expression for validating an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const SendReclamation=async()=>{
    if(Email!="" && Description!=""){
      if(validateEmail(Email)){
        try {
          const response = await fetch('https://127.0.0.1:8000/addreclamation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              clientId:idClient,
              email: Email,
              description: Description,
              pattenteDeHotel: idHotel,
              numeroChambre: chamber
          }),
          });
    
          if (response.ok) {
            const responseData = await response.json();
            if(responseData.state){
              alert("Complaint sent successfully");
            }else{
              alert("Email is incorrect");
            }
          }else{
              alert("Problem of connexion");
          }
        } catch (error) {
            alert("Problem of connexion");
        }
      }else{
        alert("Email incorrect");
      }
    }else{
      alert("Fill in all fields");
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
  }, []);



  return (
    <div className="DashboardProfildPage">
      <MenuClient title="Add a complaint" />
      <div className="pageDashbord">
        <div className="rightpage">
          <div className="Allroom">
            <div className="tableRoom ">
               <div className="tableRoomCentre">
                    <div className="PlaceInpR">
                        <input type="text" className="InpR" placeholder="Email" value={Email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="PlaceInpR PlaceInpRD">
                        <textarea className="InpR InpRD" placeholder="Description" value={Description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                    </div>
                    <div className="PlaceInpR palcebtnR">
                        <button className="btnR" onClick={SendReclamation}>SEND</button>
                    </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reclamation;
