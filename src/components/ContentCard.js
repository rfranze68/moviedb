import './ContentCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

const ContentCard = ({cardId, cardMediaType, cardImgPath, cardTitle, cardVoteAverage, cardTagColor, cardOverview}) => {

  const mediaTypeURL = (e) => {
    let result = '';
    if (cardMediaType === 'movie') {
      result = `/movies/details/${cardId}`;
    } else if (cardMediaType === 'tv') {
      result = `/series/details/${cardId}`;
    } else if (cardMediaType === 'person') {
      result = `/persons/details/${cardId}`;
    }
    return result;
  }

  return ( 
    <div className="card">
      <Link to={mediaTypeURL}>
        <img src={cardImgPath} alt = {cardTitle} />
        <div className="cardInfo">
          <div style={{float: "left"}}>
            <h3>{cardTitle}</h3>            
          </div>
          <div style={{float: "right"}}>
            <span className={`tag ${cardTagColor}`}>{cardVoteAverage}</span>            
          </div>
        </div>
        <div className="cardOver">
          <h2>Overview ({cardMediaType}):</h2>
          <p>{cardOverview}</p>
        </div>
      </Link>
    </div>
  );

}

export default ContentCard;