import React from 'react';
import './DetailsList.css';

const DetailsList = ({ 
        title, 
        image, 
        details = [], 
        backgroundColor = '#fff', 
        width = '300px', 
        justifyContent = 'space-between', 
        alignItems = 'center',
        children 
    }) => {
        return (
            <>
            <h1>Transactions List</h1>
            <div 
                className="new-simple-card" 
                style={{ 
                    backgroundColor, 
                    width, 
                    justifyContent, 
                    alignItems,
                    display: 'flex',
                }}>
                <div className="new-card-header">
                    {image && <img src={image} alt={title} className="new-card-image" />}
                    <h3 className="new-card-title">{title}</h3>
                </div>
                <div className="new-card-body">
                    {details.map((detail, index) => (
                        <p key={index} className="new-card-detail">{detail}</p>
                    ))}
                    {children && <div className="new-custom-content">{children}</div>}
                </div>
            </div>
            </>
        );
    };
    
    

    


export default DetailsList;
