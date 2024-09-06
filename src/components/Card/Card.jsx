import React from 'react';
import './Card.css'; 

const Card = ({ title, image, details, backgroundColor }) => {
    return (
        <div className="card" style={{ backgroundColor }}>
            <img src={image} alt={title} className="card-image" />
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <div className="card-details">
                    {details.map((detail, index) => (
                        <p key={index} className="card-detail">{detail}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;
