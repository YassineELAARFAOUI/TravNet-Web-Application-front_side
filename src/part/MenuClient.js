import React from 'react';
import './css/MenuClient.css';
import returnIcon from '../component/imgs/return.png';

const MenuClient = ({ title }) => {

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="MenuClient">
            <div className="btnReturn" onClick={handleGoBack}>
                <img src={returnIcon} alt="Return Icon" className="returnIcone" />
            </div>
            <div className="namePage">{title}</div>
        </div>
    );
};

export default MenuClient;
