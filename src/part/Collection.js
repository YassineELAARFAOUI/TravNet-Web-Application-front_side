import React,{useState} from 'react';
import './css/Collection.css'
import maison from '../component/imgs/maison.png'
import img1 from '../component/imgs/img1.jpg'
import img2 from '../component/imgs/img2.jpg'
import img3 from '../component/imgs/img3.jpg'
import img4 from '../component/imgs/img4.jpg'

const Collection = () => {
    const [Name1, setName1] = useState("");
    const [Name2, setName2] = useState("");
    const [Name3, setName3] = useState("");
    const [Name4, setName4] = useState("");

    const [City1, setCity1] = useState("");
    const [City2, setCity2] = useState("");
    const [City3, setCity3] = useState("");
    const [City4, setCity4] = useState("");

    const [Img1, setImg1] = useState("vide.jpg");
    const [Img2, setImg2] = useState("vide.jpg");
    const [Img3, setImg3] = useState("vide.jpg");
    const [Img4, setImg4] = useState("vide.jpg");


    const dispTopHotel=async()=>{
        try {
            const response = await fetch('https://127.0.0.1:8000/recupererQuatreHotelParpattenete', {
            method: 'GET'
            });
    
            if (response.ok) {
                const responseData = await response.json();
               setName1(responseData.hotels[0].hotelName);
               setName2(responseData.hotels[1].hotelName);
               setName3(responseData.hotels[2].hotelName);
               setName4(responseData.hotels[3].hotelName);

               setCity1(responseData.hotels[0].cityofHotel);
               setCity2(responseData.hotels[1].cityofHotel);
               setCity3(responseData.hotels[2].cityofHotel);
               setCity4(responseData.hotels[3].cityofHotel);

               setImg1(responseData.hotels[0].imageName);
               setImg2(responseData.hotels[1].imageName);
               setImg3(responseData.hotels[2].imageName);
               setImg4(responseData.hotels[3].imageName);

            }else{
                alert("Problem of connexion");
            }
        } catch (error) {
            alert("Problem of connexion");
        }
    }
    dispTopHotel();
    return (
        <div className="CollectionPart" id="tophotels">
            <div className="part">
                <div className="partItem">
                    <div className="topPart">
                        <div className="topPartLeft">
                            <div className="TypeHotel">{Name1}</div>
                            <div className="numberAndIcon">
                                <div className="number">{City1}</div>
                            </div>
                        </div>
                    </div>
                    <div className="placeImage">
                        <img src={"https://127.0.0.1:8000/uploads/images/"+Img1} alt="villas" className="maison" />
                    </div>
                </div>
                <div className="partItem">
                    <div className="topPart">
                        <div className="topPartLeft">
                            <div className="TypeHotel">{Name2}</div>
                            <div className="numberAndIcon">
                                <div className="number">{City2}</div>
                            </div>
                        </div>
                    </div>
                    <div className="placeImage">
                        <img src={"https://127.0.0.1:8000/uploads/images/"+Img2} alt="villas" className="maison" />
                    </div>
                </div>
            </div>
            <div className="part">
                <div className="partItem">
                        <div className="topPart">
                            <div className="topPartLeft">
                                <div className="TypeHotel">{Name3}</div>
                                <div className="numberAndIcon">
                                    <div className="number">{City3}</div>
                                </div>
                            </div>
                        </div>
                        <div className="placeImage">
                            <img src={"https://127.0.0.1:8000/uploads/images/"+Img3} alt="villas" className="maison" />
                        </div>
                </div>
                <div className="partItem">
                    <div className="topPart">
                        <div className="topPartLeft">
                            <div className="TypeHotel">{Name4}</div>
                            <div className="numberAndIcon">
                                <div className="number">{City4}</div>
                            </div>
                        </div>
                    </div>
                    <div className="placeImage">
                        <img src={"https://127.0.0.1:8000/uploads/images/"+Img4} alt="villas" className="maison" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collection;
