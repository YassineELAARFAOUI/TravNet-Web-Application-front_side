import React from 'react';
import './css/Footer.css'
import black_logo from '../component/imgs/travnet.png'
function Footer() {

  return (
    <div className="footerContainer" id='footer'>
      <div className="descriptionCompany">
        <img src={black_logo} alt="black_logo" className="logo" />
        <div className="descriptionText">Our company offers a variety of services on our website, with transparent pricing. We focus on making your stay at our hotels comfortable and enjoyable. From luxurious rooms to excellent dining, we cater to all your needs. Our team is dedicated to providing exceptional service, ensuring a smooth and memorable stay. Whether for business or leisure, you can count on us for personalized care and a welcoming atmosphere. Experience quality and value at our hotels.</div>
        <div className="copyrightPlace">© 2024 TRAVNET</div>
      </div>
      <div className="ListItem">
        <div className="ListItemBox">
            <div className="title">Entreprises</div>
            <div className="itemTitle">Founder</div>
            <div className="itemTitle">Date of creation</div>
            <div className="itemTitle">Vision</div>
            <div className="itemTitle">About-us</div>
        </div>
        <div className="ListItemBox">
            <div className="title">Services</div>
            <div className="itemTitle">Conatct</div>
            <div className="itemTitle">Complaint</div>
            <div className="itemTitle">Cancellation</div>
            <div className="itemTitle">Top-offer</div>
        </div>
        <div className="ListItemBox">
            <div className="title">Follow-us</div>
            <div className="itemTitle">YouTube</div>
            <div className="itemTitle">Instagram</div>
            <div className="itemTitle">Facebook</div>
            <div className="itemTitle">TikTok</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
