import React, { useState, useEffect } from 'react';
import './css/DashboardDispRoom.css';
import { Link } from 'react-router-dom';
import MenuDashboardLeft from '../part/MenuDashboardLeft';
import MenuTop from '../part/MenuTop';

function DispRoom() {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const seeMore = (id, date,avalib) => {
    if (!(id === undefined || date === undefined) &&avalib===1) {
      window.location.href = "/dashboardroomunite/" + date + "/" + id.toString();
    }
  };

  const [pageNumber, setPageNumber] = useState(1);
  const [maxtab, setMaxtab] = useState(1);
  const [accBuss, setAccBuss] = useState(0);
  const [patentHotel, setPatentHotel] = useState(0);
  const [roomsList, setRoomsList] = useState([]);
  const currentDate = formatDate(new Date());
  const [dateUsed, setDateUsed] = useState(currentDate);

  const updateTable = async (pageNumber, accBussiness, patent) => {
    setRoomsList([]);
    try {
      const response = await fetch('https://127.0.0.1:8000/recuperChambres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idAccBussiness: accBussiness,
          pattenteDeHotel: patent,
          page: pageNumber,
          dateFilter: dateUsed,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setMaxtab(responseData.totalChambres);
        if (responseData.chambresExistent !== 0) {
          if (responseData.chambres.length !== 0) {
            setRoomsList(responseData.chambres);
          }
        } else {
          setRoomsList([{ message: "Hotel Don't have Rooms" }]);
        }
      } else {
        alert("Problem of connection");
      }
    } catch (error) {
      alert("Problem of connection");
    }
  };

  const plusPage = () => {
    if (pageNumber < Math.ceil(maxtab / 5)) {
      updateTable(pageNumber + 1, accBuss, patentHotel);
      setPageNumber((prev) => prev + 1);
    }
  };

  const minusPage = () => {
    if (pageNumber > 1) {
      updateTable(pageNumber - 1, accBuss, patentHotel);
      setPageNumber((prev) => prev - 1);
    }
  };

  const verifierAuth = () => {
    if (localStorage.getItem('auth') !== null) {
      var savedData = localStorage.getItem('auth');
      var parsedData = JSON.parse(savedData);
      setAccBuss(parsedData.userId);
      setPatentHotel(parsedData.patent);
      updateTable(pageNumber, parsedData.userId, parsedData.patent);
    } else {
      window.location.href = "/LoginBusiness";
    }
  };

  useEffect(() => {
    verifierAuth();
  }, []);

  const searchByDate = () => {
    updateTable(pageNumber, accBuss, patentHotel);
  };

  return (
    <div className="DashboardProfildPage">
      <MenuTop />
      <div className="pageDashbord">
        <MenuDashboardLeft />
        <div className="rightpage">
          <div className="Allroom">
            <div className="MenuRoom">
              <div className="blocMenu blocMenuLeft">ALL ROOM</div>
              <div className="blocMenu blocMenuRight">
                <Link to="/dashboardroomaddone" className="btnAddRoom">Add Room</Link>
              </div>
            </div>
            <div className="tableRoom">
              <div className="tableRoomCentre">
                <div className="placeInpDate">
                  <input type="date" className="dateInp" value={dateUsed} onChange={(e) => { setDateUsed(e.target.value) }} />
                  <button className="BtnSearch" onClick={searchByDate}>Search</button>
                </div>
                <div className="thdiv">
                  <div className="thitemdiv">Room Number</div>
                  <div className="thitemdiv">Floor</div>
                  <div className="thitemdiv">Available</div>
                </div>
                <div className="listTrdiv">
                  {roomsList.length > 0 && roomsList[0].message ? (
                    <div className="roomnexist">{roomsList[0].message}</div>
                  ) : (
                    roomsList.map((chamber) => (
                      <div className="trdiv" key={chamber.numero_chambre} onClick={() => seeMore(chamber.numero_chambre, dateUsed,chamber.available)}>
                        <div className="tritemdiv">{chamber.numero_chambre}</div>
                        <div className="tritemdiv">{chamber.numeroEtage}</div>
                        <div className="tritemdiv">{chamber.available === 0 ? <div className="yesDiv">YES</div> : <div className="noDiv">NO</div>}</div>
                      </div>
                    ))
                  )}
                </div>
                <div className="pagenationPlace">
                  <div className="pagenationPlaceCentre">
                    <div className="BtnPagenation" onClick={minusPage}>-</div>
                    <div className="numberpagenation">{pageNumber}</div>
                    <div className="BtnPagenation" onClick={plusPage}>+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DispRoom;
