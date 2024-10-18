import React, { useState, useEffect } from 'react';
import './css/DashboardReclamation.css';
import MenuDashboardLeft from '../part/MenuDashboardLeft'; 
import MenuTop from '../part/MenuTop'; 

function DashboardReclamation() {
  const [patentHotel, setPatentHotel] = useState(0);
  const [roomsList, setRoomsList] = useState([]);

  const seeMore = (id) => {
    if(id!=undefined){
      window.location.href = "/dashboardreclamationunite/" + id.toString();
    }
  };

  const updateTable = async (patent) => {
    try {
      const response = await fetch('https://127.0.0.1:8000/recupererreclamation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pattenteDeHotel: patent,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.state) {
          if (responseData.reclamations.length !== 0) {
            setRoomsList(responseData.reclamations);
          } else {
            setRoomsList([{ nomClient: "No claims", numeroEtage: "-", numero_chambre: "-" }]);
          }
        } else {
          setRoomsList([{ nomClient: "-", numeroEtage: "-", numero_chambre: "-" }]);
        }
      } else {
        alert("Problem with connection");
      }
    } catch (error) {
      alert("Problem with connection");
    }
  };

  const verifierAuth = () => {
    if (localStorage.getItem('auth') !== null) {
      const savedData = localStorage.getItem('auth');
      const parsedData = JSON.parse(savedData);
      setPatentHotel(parsedData.patent);
      updateTable(parsedData.patent);
    } else {
      window.location.href = "/LoginBusiness";
    }
  };

  useEffect(() => {
    verifierAuth();
  }, []);

  return (
    <div className="DashboardProfildPage">
      <MenuTop />
      <div className="pageDashbord">
        <MenuDashboardLeft />
        <div className="rightpage">
          <div className="Allroom">
            <div className="MenuRoom">
              <div className="blocMenu blocMenuLeft">ALL Claim</div>
            </div>
            <div className="tableRoom">
              <div className="tableRoomCentre">
                <div className="thdiv">
                  <div className="thitemdiv">Name</div>
                  <div className="thitemdiv">Floor</div>
                  <div className="thitemdiv">Room</div>
                </div>
                <div className="listTrdiv">
                  {roomsList.map((rec, index) => (
                    <div
                      className="trdiv"
                      key={index}
                      onClick={() => seeMore(rec.reclamationId)}
                    >
                      <div className="tritemdiv">{rec.nomClient}</div>
                      <div className="tritemdiv">{rec.numeroEtage}</div>
                      <div className="tritemdiv">{rec.numero_chambre}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardReclamation;
