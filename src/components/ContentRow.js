import '../components/ContentRow.css';
import React from 'react';
import { Link } from 'react-router-dom';

const ContentRow = ({rowId, rowType, rowLink, rowImgPath, rowDescription1, rowDescription2, rowDescription3 }) => {

  const setSubTitle = (rowType) => {
    let result = '';
    if (rowType === 'movie') {
      result = 'Movies:';  
    } else if (rowType === 'tv') {
      result = 'Series:';
    } else if (rowType === 'person') {
      result = 'Character:';      
    } else if (rowType !== '') {
      result = rowType;
    }
    return result; 
  };

  return ( 
    <div class="row"> 
        <div class="rowImg">
          <Link to={rowLink}>
            <img src={rowImgPath} alt={rowDescription1}/></Link>
        </div>
        <div class="rowInfo">
          <Link to={rowLink}>
            <br/>
            <hp>{rowDescription1||''}</hp>
            <br/>
            <hg>{setSubTitle(rowType)||''}</hg>
            <br/>
            {rowDescription2||''}
            <br/>
            {rowDescription3||''}</Link>   
        </div>
    </div>
  );
};

export default ContentRow;