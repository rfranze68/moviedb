import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from 'react-router-dom';

import '../ContainerDetails.css';
import ContentRow from '../../components/ContentRow.js'

const MoviesDetails = (props) => {
  
  const movieID = props.id.match.params.id;
  const API_IMAGES = `https://image.tmdb.org/t/p/w1280`;
  const movieURLDetails = `https://api.themoviedb.org/3/movie/${movieID}?api_key=ddeaf71f8f5eb42fd183f981de0978e8&language=en-US&append_to_response=videos,images`;
  const movieURLCredits = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=ddeaf71f8f5eb42fd183f981de0978e8&language=en-US`;
  const [content, setContentDetails] = useState([]);
  const [contentDirector, setContentDirector] = useState([]);
  const [contentProducer, setContentProducer] = useState([]);
  const [contentScreenPlayer, setContentScreenPlayer] = useState([]);
  const [contentEditor, setContentEditor] = useState([]);
  const [contentProductionCountry, setContentProductionCountry] = useState([]);
  const [contentGenres, setContentGenres] = useState('');
  const [contentCast, setcontentCast] = useState([]);  

  const getContentDetails = async () => {
    let { data } = await axios.get(movieURLDetails);
    if (data) {
      setContentDetails(data);       
      if (data.hasOwnProperty("genres")) {
        let movieGenres = '';
        data.genres.map(item => {      
          movieGenres += ((movieGenres) ? ', ' : '') + item.name;
        });
        setContentGenres(movieGenres);
      }
      if (data.hasOwnProperty("production_countries")) {
        let movieProductionCountry = '';
        data.production_countries.map(item => {      
          movieProductionCountry += ((movieProductionCountry) ? ', ' : '') + item.name;
        });
        setContentProductionCountry(movieProductionCountry);
      }
    } // if (data) {
  };

  const getContentCredits = async () => {
    const { data } = await axios.get(movieURLCredits);
    if ((data) && (data.hasOwnProperty("crew"))) {
      const movieDirector = [];
      const movieProducer = [];
      const movieScreenPlayer = [];
      const movieEditor = [];
      data.crew.map((item) => {
        item.link = `/persons/details/${item.id}`;
        if (item.job === "Director") {
          item.nameComma = ((movieDirector.length > 0) ? ', ' : '') + item.name;   
          movieDirector.push(item);
        } else if (item.job === "Producer") {
          item.nameComma = ((movieProducer.length > 0) ? ', ' : '') + item.name;
          movieProducer.push(item);
        }  else if (item.job === "Screenplay") {
          item.nameComma = ((movieScreenPlayer.length > 0) ? ', ' : '') + item.name;
          movieScreenPlayer.push(item);
        }  else if (item.job === "Editor") {
          item.nameComma = ((movieEditor.length > 0) ? ', ' : '') + item.name;
          movieEditor.push(item);
        }
      }); //data.crew.map((item) => {
      setContentDirector(movieDirector);
      setContentProducer(movieProducer);
      setContentScreenPlayer(movieScreenPlayer);
      setContentEditor(movieEditor);
    } //if ((data) && (data.hasOwnProperty("crew"))) {
    if ((data) && (data.hasOwnProperty("cast"))) {
      const movieCast = [];
      data.cast.map((item) => {
        item.link = `/persons/details/${item.id}`;   
        item.imgpath = (item.profile_path ? (API_IMAGES + item.profile_path) : (process.env.PUBLIC_URL+'/person.jpg'));
        movieCast.push(item);
      }); //data.cast.map((item) => {
      setcontentCast(movieCast);
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

  // ------ "RENDER" ------- //
  return ( 
    <div className="contentContainer">
      <div id="ContentDetails" class="details">
        <div id="contentDetailsImg" class="detailsImg">
          <img src={content.poster_path ? `${API_IMAGES}/${content.poster_path}`:(process.env.PUBLIC_URL+'/movie.jpg')} 
              alt={content.name || content.title} />
        </div>
        <div id="contentDetailsInfo" class="detailsInfo">
          <div id="contentDetailsInfoHeader" class="detailsInfoHeader">
            <p class="title">MOVIE TITLE</p>
              <h1>{content.title}</h1>
          </div>
          <div id="contentDetailsInfoBody" class="detailsInfoBody">
            <p class="title">OVERVIEW</p>
            <p style={{textAlign: "justify"}}>{content.overview || '... no synopsis ...'}</p>
            <p>
              <div style={{float: "left"}}>
                <hg>Running time:</hg>&nbsp;&nbsp;{content.runtime}&nbsp;minutes               
              </div>
              <div id="contentVote" style={{visibility: "hidden", float: "right"}}>
                <hg>Popularity:</hg>&nbsp;&nbsp;<span class={`tag ${setVoteClass(content.vote_average)}`}>{content.vote_average}</span>
              </div></p>
            <p style={{clear: "both"}}>
              <div>
                <br/><hg>Directed by:</hg>&nbsp;&nbsp;{(contentDirector.map(item => {
                    return (<Link to={(item.link)}>{item.nameComma}</Link>)
                  }))}
                <br/><hg>Produced by:</hg>&nbsp;&nbsp;{(contentProducer.map(item => {
                    return (<Link to={(item.link)}>{item.nameComma}</Link>)
                  }))}
                <br/><hg>Screenplay by:</hg>&nbsp;&nbsp;{(contentScreenPlayer.map(item => {
                    return (<Link to={(item.link)}>{item.nameComma}</Link>)
                  }))}
                <br/><hg>Edited by:</hg>&nbsp;&nbsp;{(contentEditor.map(item => {
                    return (<Link to={(item.link)}>{item.nameComma}</Link>)
                  }))}
              </div></p>
            <p>
              <div>
                <hg>Release date:</hg>&nbsp;&nbsp;{setDateFormat(content.release_date)}&nbsp;&nbsp;&nbsp;&nbsp;<hg>Country:</hg>&nbsp;&nbsp;{contentProductionCountry}
              </div></p>
            <p style={{clear: "both"}}>
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
        <p class="title">Found {contentCast.length} MOVIE CASTs</p>
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
export default withRouter(MoviesDetails);
// ------------------------------------------------->