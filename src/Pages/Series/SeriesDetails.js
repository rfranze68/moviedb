import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from 'react-router-dom';

import '../ContainerDetails.css';
import ContentRow from '../../components/ContentRow.js'

const SeriesDetails = (props) => {
  
  const serieID = props.id.match.params.id;
  const API_IMAGES = `https://image.tmdb.org/t/p/w1280`;
  const serieURLDetails = `https://api.themoviedb.org/3/tv/${serieID}?api_key=ddeaf71f8f5eb42fd183f981de0978e8&language=en-US&append_to_response=videos,images`; 
  const serieURLCredits = `https://api.themoviedb.org/3/tv/${serieID}/aggregate_credits?api_key=ddeaf71f8f5eb42fd183f981de0978e8&language=en-US`; 
  const [content, setContentDetails] = useState([]);
  const [contentCreateBy, setContentCreateBy] = useState([]);
  const [contentProductionCountry, setContentProductionCountry] = useState([]);
  const [contentGenres, setContentGenres] = useState('');
  const [contentCast, setContentCast] = useState([]);  

  const getContentDetails = async () => {
    let { data } = await axios.get(serieURLDetails);
    if (data) {
      setContentDetails(data);
      //
      if (data.hasOwnProperty("created_by")) {
        const serieCreateBy = [];       
        data.created_by.map(item => {     
          item.link = `/persons/details/${item.id}`; 
          item.imgpath = (item.profile_path ? (API_IMAGES + item.profile_path) : (process.env.PUBLIC_URL+'/person.jpg'));
          item.nameComma = ((serieCreateBy.length > 0) ? ', ' : '') + item.name;
          serieCreateBy.push(item);         
        }); //data.created_by.map((item) => {
        setContentCreateBy(serieCreateBy);     
      }
      //
      if (data.hasOwnProperty("genres")) {
        let serieGenres = '';
        data.genres.map(item => {      
          serieGenres += ((serieGenres) ? ', ' : '') + item.name;
          return serieGenres;
        });
        setContentGenres(serieGenres);
      }
      //
      if (data.hasOwnProperty("production_countries")) {
        let serieProductionCountry = '';
        data.production_countries.map(item => {      
          serieProductionCountry += ((serieProductionCountry) ? ', ' : '') + item.name;
          return serieProductionCountry;
        });
        setContentProductionCountry(serieProductionCountry);
      }
    } // if (data) {
  };

  const getContentCredits = async () => {
    const { data } = await axios.get(serieURLCredits);
    if ((data) && (data.hasOwnProperty("cast"))) {
      const serieCast = [];
      data.cast.map((item) => {
        let strCharacter = '';
        item.link = `/persons/details/${item.id}`;   
        item.imgpath = (item.profile_path ? (API_IMAGES + item.profile_path) : (process.env.PUBLIC_URL+'/person.jpg'));
        item.roles.forEach(element => {
          strCharacter += ((strCharacter.length > 0) ? ', ' : '') + `${element.character} [ ${element.episode_count} episodes ]`;          
        });
        item.character = strCharacter;
        serieCast.push(item);
      }); //data.cast.map((item) => {
      setContentCast(serieCast);
    } //if ((data) && (data.hasOwnProperty("cast"))) {
  };

  useEffect(() => {
    window.scroll(0, 0);
    getContentDetails();
    getContentCredits();
  },[]);

  // ----------->

  const setDateFormat = (date) => {
    let result = '';
    if (date) {
      const newDateFormat = new Date(date);
      result = newDateFormat.toLocaleDateString();
    }
    return result;
  };

  const setVoteClass = (vote) => {
    if (vote) {
      document.getElementById("contentVote").style.visibility="visible";
      if (vote >= 8) { return 'green'; }
      else if (vote >= 6) { return 'orange'; }
      else { return 'red'; }      
    }
  };
  // ------------------------------------------------->
  // -------------------- "RENDER" ------------------ //
  return ( 
    <div className="contentContainer">
      <div id="ContentDetails" class="details">
        <div id="contentDetailsImg" class="detailsImg">
          <img src={content.poster_path ? `${API_IMAGES}${content.poster_path}`:(process.env.PUBLIC_URL+'/serie.jpg')} 
                    alt={content.name || content.title} /> 
        </div>
        <div id="contentDetailsInfo" class="detailsInfo">
          <div id="contentDetailsInfoHeader" class="detailsInfoHeader">
             <p class="title">SERIE NAME</p>
            <h1>{content.name}</h1>
          </div>
          <div id="contentDetailsInfoBody" class="detailsInfoBody">
            <p class="title">OVERVIEW</p>
            <p style={{textAlign: "justify"}}>{content.overview || '... no synopsis ...'}</p>
            <p>
              <div style={{float: "left"}}>
                  <hg>Create by:</hg>&nbsp;&nbsp;{(contentCreateBy.map(item => {
                    return (<Link to={(item.link)}>{item.nameComma}</Link>)
                  }))}      
              </div>
              <div id="contentVote" style={{visibility: "hidden", float: "right"}}>
                <hg>Popularity:</hg>&nbsp;&nbsp;<span class={`tag ${setVoteClass(content.vote_average)}`}>{content.vote_average}</span>
              </div></p>
            <br style={{clear: "both"}}/>
            <p>
              <div>
                <hg>Country Origin:</hg>&nbsp;&nbsp;{contentProductionCountry}&nbsp;&nbsp;&nbsp;&nbsp;
                <br/>
                <hg>Original Name:</hg>&nbsp;&nbsp;{`"${content.original_name||''}"`}
                <br/><br/>
                <hg>1o Episode Date:</hg>&nbsp;&nbsp;{setDateFormat(content.first_air_date)}&nbsp;&nbsp;&nbsp;&nbsp;
                <br/>
                <hg>Number of Episodes:</hg>&nbsp;&nbsp;{content.number_of_episodes||''}&nbsp;&nbsp;&nbsp;&nbsp;
                <hg>Number of Sessons:</hg>&nbsp;&nbsp;{content.number_of_seasons||''}
                <br/>
                <hg>Last Episode Date:</hg>&nbsp;&nbsp;{setDateFormat(content.last_air_date)}&nbsp;&nbsp;&nbsp;&nbsp;
                <br/>
                <hg>Last Episode Name:</hg>&nbsp;&nbsp;{(content.hasOwnProperty('last_episode_to_air.name') && (`"`+content.last_episode_to_air.name+`"`))}
                <br/>
                <hg>Last Episode Synopsis:</hg>&nbsp;&nbsp;{(content.hasOwnProperty('last_episode_to_air.overview') && (`"`+content.last_episode_to_air.overview+`"`))}
              </div></p>
            <p>
              <hg>Home Page:</hg>&nbsp;&nbsp;<a href={content.homepage} target="_blank" rel="noreferrer noopener">{content.homepage}</a></p>
            <p class="title">GENRES</p>
            <p>{contentGenres}</p>
            <p></p>
            <p class="title">TAGLINE</p>
            <p>{content.tagline  || '... no tagline ...'}</p>
          </div>
        </div>
      </div>
      <div id="contentCast" class="detailsBox" style={{visibility: "visible"}}>
        <p class="title">SERIE CAST</p>
        <div id="contentCastIn" class="detailsBoxIn">
          <br/>          
          {contentCast.map(item => { 
            return (
              < ContentRow key={item.id}
                  rowId={item.id}
                  rowType={'person'}
                  rowLink={item.link}
                  rowImgPath={item.imgpath}
                  rowDescription1={item.name}                  
                  rowDescription2={item.character}
                  rowDescription3={''} />); })}
        </div>
      </div>   
    </div>
  );
}
// ------------------------------------------------->
export default withRouter(SeriesDetails);
// ------------------------------------------------->