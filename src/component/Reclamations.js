import React, { useState, useEffect } from 'react';
import './css/Reclamations.css';
import MenuClient from '../part/MenuClient'


function Reclamations() {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [roomsList, setRoomsList] = useState([]);

  const seeMore = (idHotel, chamber, idClient) => {
    
    if (idHotel !== undefined && chamber !== undefined && idClient !== undefined) {
      window.location.href = `/reclamation/${idHotel.toString()}/${chamber.toString()}/${idClient.toString()}`;
    }
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, '0'); // Get the day of the month

    return `${year}-${month}-${day}`;
  }

  const updateTable = async (idClient) => {
    setRoomsList([]);
    try {
      const response = await fetch('https://127.0.0.1:8000/recupererdetailReservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: idClient,
          currentDate: getCurrentDate()
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.state);

        if (responseData.state){
          if (responseData.reservations.length !== 0) {
            console.log(responseData);
            const newRoomsList = responseData.reservations.map((elem) => (
              <div
                className="trdiv"
                onClick={() => seeMore(elem.pateneteDehotel, elem.numeroDeChambre, idClient)}
                key={elem.numeroDeChambre}
              >
                <div className="tritemdiv">{elem.nameOfHotel}</div>
                <div className="tritemdiv">{elem.numeroDeChambre}</div>
                <div className="tritemdiv">{elem.cityOfHotel}</div>
              </div>
            ));
            setRoomsList(newRoomsList);
          }
        }else {
          setRoomsList([<div className="roomnexist">Hotel Don't have Rooms</div>]);
        }
      } else {
        alert("Problem of connection");
      }
    } catch (error) {
      alert("Problem of connection");
    }
  };

  const verifierAuth = () => {
    const savedData = localStorage.getItem('authC');
    if (savedData !== null) {
      const parsedData = JSON.parse(savedData);
      updateTable((parsedData.userId).toString());
    } else {
      window.location.href = "/loginuser";
    }
  };

  useEffect(() => {
    verifierAuth();
  }, []);

  return (
    <div className="DashboardProfildPage">
      <MenuClient title="All reservations" />
      <div className="pageDashbord">
        <div className="rightpage">
          <div className="Allroom">
            <div className="tableRoom">
              <div className="tableRoomCentre">
                <div className="thdiv2">
                  <div className="thitemdiv">Name</div>
                  <div className="thitemdiv">Room</div>
                  <div className="thitemdiv">City</div>
                </div>
                <div className="listTrdiv">
                  {roomsList.length > 0 ? roomsList : <div className="roomnexist">Hotel Don't have Rooms</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reclamations;
