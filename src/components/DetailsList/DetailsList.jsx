import React from 'react';
import './DetailsList.css';

const DetailsList = ({
    title, image,
    details = [],
    backgroundColor = '#fff',
    width = '300px',
    color = 'green',
    justifyContent = 'space-between',
    alignItems = 'center',
    Date,
    onEdit, onDelete

}) => {
    return (
        <>
            <div className='detail-container'>
                <div className="new-simple-card" style={{
                    backgroundColor,
                    width,
                    justifyContent,
                    alignItems,
                    display: 'flex',
                    color
                }}>
                    <div className="new-card-header">
                        {image && <img src={image} alt={title} className="new-card-image" />}
                        <h3 className="new-card-title">{title}</h3>
                    </div>
                    <p>{Date}</p>

                    <p className="new-card-detail">{details}</p>
                    <div className="actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
                </div>
            </div>
        </>
    );
};






export default DetailsList;



