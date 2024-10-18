import React,{useState,useEffect} from 'react';
import './css/DashboardReclamationUnite.css';
import MenuDashboardLeft from '../part/MenuDashboardLeft'; 
import MenuTop from '../part/MenuTop'; 

function DashboardReclamation() {
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const lastNumber = parts[parts.length - 1];

    const [FullName, setFullName] = useState("");
    const [Floor, setFloor] = useState("");
    const [Room, setRoom] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Description, setDescription] = useState("");



  const [patentHotel, setpatentHotel] = useState(0);
  const [roomsList, setRoomsList] = useState("");



  const updateTable=async(patent)=>{
    setRoomsList("");
    try {
      const response = await fetch('https://127.0.0.1:8000/recupererreclamationunitaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pattenteDeHotel: patent,
            idReclamation:lastNumber
      }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if(responseData.state){
            setFullName(responseData.reclamations.nomClient);
            setFloor(responseData.reclamations.numeroEtage);
            setRoom(responseData.reclamations.numero_chambre);
            setPhone(responseData.reclamations.phone);
            setEmail(responseData.reclamations.email);
            setDescription(responseData.reclamations.descriptionReclamation);
        }else{
            alert("Pas de claims");
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
      setpatentHotel(parsedData.patent);
      updateTable(parsedData.patent);
  } else {
    window.location.href = "/LoginBusiness";
  }
  }
  useEffect(() => {
    verifierAuth();
  }, []);

  const searchByDate=()=>{
    updateTable(patentHotel);
  }
  return (
    <div className="DashboardProfildPage">
      <MenuTop/>
      <div className="pageDashbord">
        <MenuDashboardLeft />
        <div className="rightpage">
          <div className="Allroom">
            <div className="MenuRoom">
                <div className="blocMenu blocMenuLeft">Information of claim</div>
            </div>
            <div className="InfoOfClaim InfoOfClaim1">
                <div className="elemClaim">Full Name : <span className="infoData">{FullName}</span></div>
            </div>
            <div className="InfoOfClaim">
                <div className="elemClaim">Floor : <span className="infoData">{Floor}</span></div>
            </div>
            <div className="InfoOfClaim">
                <div className="elemClaim">Room : <span className="infoData">{Room}</span></div>
            </div>
            <div className="InfoOfClaim">
                <div className="elemClaim">Phone : <span className="infoData">{Phone}</span></div>
            </div>
            <div className="InfoOfClaim">
                <div className="elemClaim">Email : <span className="infoData">{Email}</span></div>
            </div>
            <div className="placedispclaim">
                <div className="elemClaim">Description :</div>
                <div className="infoDataDesc">{Description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardReclamation;
