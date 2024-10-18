import React,{ useState, useEffect } from 'react';
import './css/DashboardHome.css';
import logo from './imgs/logo.png';
import { Bar,Pie  } from 'react-chartjs-2';
import 'chart.js/auto';
import MenuDashboardLeft from '../part/MenuDashboardLeft'; 
import MenuTop from '../part/MenuTop'; 



function DashboardHome() {
  const [date, setDate] = useState("");
  const [Patent, setPatent] = useState("");

  const [NombreRooms, setNombreRooms] = useState("");
  const [NombreReclamation, setNombreReclamation] = useState("");
  const [NombreReservation, setNombreReservation] = useState("");

  const [dataReservation, setdataReservation] = useState([]);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const data = {
        labels: ['', '', '', '', '', 'Today'],
        datasets: [{
            label: '',
            data: dataReservation,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        }],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true, // Start the y-axis from zero
            },
        },
    };

    const data2 = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
      }]
    };

    const getStatistique=async(patent,date)=>{
      try {
        const response = await fetch('https://127.0.0.1:8000/statisticHotel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pattenteDeHotel: patent,
          currentDate: date
        }),
        });

        if (response.ok) {
            const responseData = await response.json();
           setNombreRooms(responseData.chambresCount);
           setNombreReclamation(responseData.reclamationCount);
           setNombreReservation(responseData.reservationCount);
        }else{
            alert("Problem of connexion");
        }
      } catch (error) {
          alert("Problem of connexion");
      }
    }

    const verifierAuth = () => {
      if (localStorage.getItem('auth') !== null) {
        const savedData = localStorage.getItem('auth');
        const parsedData = JSON.parse(savedData);
        setDate(getCurrentDate());
        setPatent(parsedData.patent);
        getStatistique(parsedData.patent,getCurrentDate());
        const dates=getPreviousDates(getTomorrowsDate());
        getstatistequeGraph1(dates[0],dates[1],dates[2],dates[3],dates[4],dates[5],parsedData.patent);
      } else {
        window.location.href = "/LoginBusiness";
      }
    };

    function getTomorrowsDate() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      const year = tomorrow.getFullYear();
      const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const day = String(tomorrow.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
  }

    function getPreviousDates(dateString) {
      const inputDate = new Date(dateString);
      const dates = [];
      
      for (let i = 1; i <= 6; i++) {
          // Create a new date object to avoid mutating the inputDate
          const previousDate = new Date(inputDate.getTime());
          previousDate.setDate(inputDate.getDate() - i);
          dates.push(previousDate.toISOString().split('T')[0]);
      }
      
      return dates;
    }
  

    
    const getstatistequeGraph1=async(D1,D2,D3,D4,D5,D6,patent)=>{
      try {
        const response = await fetch('https://127.0.0.1:8000/diagrameVertical', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pattenteDeHotel: patent,
          date1: D1,
          date2: D2,
          date3: D3,
          date4: D4,
          date5: D5,
          date6: D6
        }),
        });

        if (response.ok) {
            const responseData = await response.json();
            setdataReservation(data => [
              ...data,
              responseData.D1,
              responseData.D6,
              responseData.D5,
              responseData.D4,
              responseData.D3,
              responseData.D2
          ]);
          
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
          <div className="topRightpage">
            <div className="topRightpageCenter">
              <div className="topRightpageItem">
                <div className="TitleTopRightpageItem">Rooms Count</div>
                <div className="NumberTopRightpageItem">{NombreRooms} <span className="sousName">Rooms</span></div>
              </div>
              <div className="topRightpageItem">
                <div className="TitleTopRightpageItem">Reservations Count</div>
                <div className="NumberTopRightpageItem">{NombreReservation} <span className="sousName">Booking/Months</span></div>
              </div>
              <div className="topRightpageItem">
                <div className="TitleTopRightpageItem">Reclamation Count</div>
                <div className="NumberTopRightpageItem">{NombreReclamation} <span className="sousName">Reclamation</span></div>
              </div>
            </div>
          </div>
          <div className="GrafPlace">
            <div className="GrafPlaceCenter">
              <div className="Graf"><Bar data={data} options={options} /></div>
              <div className="Graf Graf2"><Pie data={data2}/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
