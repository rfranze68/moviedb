import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';

import '../ContainerDetails.css';
import ContentRow from '../../components/ContentRow.js'

// ------------------------------------------------->
const PersonsDetails = (props) => {
  
  const personID = props.id.match.params.id;
  const API_KEY = 'ddeaf71f8f5eb42fd183f981de0978e8';
  const API_IMAGES = `https://image.tmdb.org/t/p/w1280`;
  const personURLDetails = `https://api.themoviedb.org/3/person/${personID}?api_key=ddeaf71f8f5eb42fd183f981de0978e8&language=en-US&append_to_response=videos,images`;
  const personURLMovies = `https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=ddeaf71f8f5eb42fd183f981de0978e8&language=en-US`;
  const personURLSeries = `https://api.themoviedb.org/3/person/${personID}/tv_credits?api_key=ddeaf71f8f5eb42fd183f981de0978e8&language=en-US`;

  const [content, setContentDetails] = useState([]);
  const [contentMovies, setContentMovies] = useState([]);
  const [contentTVSeries, setContentTVSeries] = useState([]);

  const getContentDetails = async () => {
    let { data } = await axios.get(personURLDetails);
    if (data) {
      setContentDetails(data);       
    } // if (data) {
  };
  // ------------------------------------------------->
  const getContentMovies = async () => {
    const { data } = await axios.get(personURLMovies);
    if (data) {
      const personMOVIES = [];
      //
      if (data.hasOwnProperty("cast")) {
        data.cast.map((item) => {
          item.type = `Character:`;
          item.link = `/movies/details/${item.id}`;   
          item.imgpath = (item.poster_path ? (API_IMAGES + item.poster_path) : (process.env.PUBLIC_URL+'/movie.jpg'));
          item.description2 = (item.character && item.character.trim());
          item.description3 = `Release: ${setDateFormat(item.release_date)}`;
          personMOVIES.push(item);
        });  
      } // if (data.hasOwnProperty("cast")) {
      //
      if (data.hasOwnProperty("crew")) {
        data.crew.map((item) => {
          item.type = `Role:`;
          item.link = `/movies/details/${item.id}`;   
          item.imgpath = (item.poster_path ? (API_IMAGES + item.poster_path) : (process.env.PUBLIC_URL+'/movie.jpg'));
          item.description2 = (item.job && item.job.trim());
          item.description3 = `Release: ${setDateFormat(item.release_date)}`;
          personMOVIES.push(item);
        });       
      } //if (data.hasOwnProperty("crew")) {
      // After, in the end, do descrescent Order
      personMOVIES.sort((a, b) => (a.release_date > b.release_date) ? -1 : 1) 
      setContentMovies(personMOVIES);
      //document.getElementById("contentMovies").style.visibility = (personMOVIES.length > 0) ? "visible" : "hidden" ;
    } //if ((data) && (data.hasOwnProperty("cast"))) {   
  };
  // ------------------------------------------------->
  const getContentTVSeries = async () => {
    const { data } = await axios.get(personURLSeries);
    if (data) {
      const personTVSERIES = [];
      //
      if (data.hasOwnProperty("cast")) {
        data.cast.map((item) => {
          item.type = `Character:`;
          item.link = `/series/details/${item.id}`;   
          item.imgpath = (item.poster_path ? (API_IMAGES + item.poster_path) : (process.env.PUBLIC_URL+'/movie.jpg'));
          item.description2 = (item.character && item.character.trim());
          item.description3 = `Release: ${setDateFormat(item.first_air_date)}`;
          personTVSERIES.push(item);
        }); //data.cast.map((item) => {        
      } // if (data.hasOwnProperty("cast")) {
      //
      if (data.hasOwnProperty("crew")) {
        data.crew.map((item) => {
          item.type = `Role:`;
          item.link = `/series/details/${item.id}`;   
          item.imgpath = (item.poster_path ? (API_IMAGES + item.poster_path) : (process.env.PUBLIC_URL+'/movie.jpg'));
          item.description2 = (item.job && item.job.trim());
          item.description3 = `Release: ${setDateFormat(item.first_air_date)}`;
          personTVSERIES.push(item);
        }); //data.cast.map((item) => {        
      } //if (data.hasOwnProperty("crew")) {
      // After, in the end, do descrescent Order
      personTVSERIES.sort((a, b) => (a.first_air_date > b.first_air_date) ? -1 : 1);
      setContentTVSeries(personTVSERIES);
      //document.getElementById("contentTVSeries").style.visibility = (personTVSERIES.length > 0) ? "visible" : "hidden" ;
    } //if ((data) && (data.hasOwnProperty("cast"))) {   
  };
  // ------------------------------------------------->
  useEffect(() => {
    window.scroll(0, 0);
    getContentDetails();
    getContentMovies();
    getContentTVSeries();
  },[]);
  // ------------------------------------------------->
  const setDateFormat = (date) => {
    let result = '';
    if (date) {
      const newDateFormat = new Date(date);
      result = newDateFormat.toLocaleDateString();
    }
    return result;
  };
  // ------------------------------------------------->
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
          <img src={content.profile_path ? `${API_IMAGES}/${content.profile_path}`:(process.env.PUBLIC_URL+'/movie.jpg')} 
              alt={content.name} />
        </div>
        <div id="contentDetailsInfo" class="detailsInfo">
          <div id="contentDetailsInfoHeader" class="detailsInfoHeader">
             <p class="title">NAME</p>
            <h1>{content.name}</h1>
          </div>
          <div id="contentDetailsInfoBody" class="detailsInfoBody">
            <p class="title" >PROFILE</p>
            <p style={{textAlign: "justify"}}>{content.biography || '... no biography ...'}</p>
            <p>
              <div style={{float: "left"}}>            
              </div>
              <div id="contentVote" style={{visibility: "hidden", float: "right"}}>
                <hg>Popularity:</hg>&nbsp;&nbsp;<span class={`tag ${setVoteClass(content.popularity)}`}>{content.popularity}</span>
              </div></p>
            <br style={{clear: "both"}}/>
            <p>
              <div>
                <hg>Birthday:</hg>&nbsp;&nbsp;{setDateFormat(content.birthday)}&nbsp;&nbsp;&nbsp;&nbsp;
                <hg>Place of Birth:</hg>&nbsp;&nbsp;{content.place_of_birth}
                <br/>  
                {content.deathday && 
                  <hg>Deathday:</hg>  `${setDateFormat(content.deathday)}` }
              </div></p>
            <p>
              <hg>Home Page:</hg>&nbsp;&nbsp;<a href={content.homepage} target="_blank" rel="noreferrer noopener">{content.homepage}</a></p>
          </div>
        </div>
      </div>
      <div id="contentMovies" class="detailsBox">
        <p class="title">Found {contentMovies.length} MOVIES appearances (ordered by Release Date)</p>
        <div id="contentMoviesIn" class="detailsBoxIn">       
            {contentMovies.map(item => { 
            return (
              < ContentRow key={item.id}
                  rowId={item.id}
                  rowType={item.type}
                  rowLink={item.link}
                  rowImgPath={item.imgpath}
                  rowDescription1={item.title}                  
                  rowDescription2={item.description2}
                  rowDescription3={item.description3}
                   />); })}   
            <br/>
        </div>
      </div>
      <div id="contentTVSeries" class="detailsBox">
        <p class="title">Found {contentTVSeries.length} TV/Series appearances (ordered by Release Date)</p>
        <div id="contentTVSeriesIn" class="detailsBoxIn">
          {contentTVSeries.map(item => { 
              return (
                < ContentRow key={item.id}
                    rowId={item.id}
                    rowType={item.type}
                    rowLink={item.link}
                    rowImgPath={item.imgpath}
                    rowDescription1={item.name}                  
                    rowDescription2={item.description2}
                    rowDescription3={item.description3}
                    />); })}   
              <br/>          
        </div>
      </div>
    </div>
  );
}
// ------------------------------------------------->
export default withRouter(PersonsDetails);
// ------------------------------------------------->