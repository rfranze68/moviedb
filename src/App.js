import './App.css';
import React from "react";
import { Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import All from './Pages/All/All';
import Movies from './Pages/Movies/Movies';
import MoviesDetails from './Pages/Movies/MoviesDetails';
import Series from './Pages/Series/Series';
import SeriesDetails from './Pages/Series/SeriesDetails';
import Persons from './Pages/Persons/Persons';
import PersonsDetails from './Pages/Persons/PersonsDetails';
import Container from '@material-ui/core/Container';
import { createBrowserHistory } from "history";

export const appHistory = createBrowserHistory();

const API_IMAGES = `https://image.tmdb.org/t/p/w1280`;

const API_ALL = `https://api.themoviedb.org/3/trending/all/week?api_key=ddeaf71f8f5eb42fd183f981de0978e8`;
const API_ALL_SEARCH = `https://api.themoviedb.org/3/search/multi?api_key=ddeaf71f8f5eb42fd183f981de0978e8&language=en-US&include_adult=false`;

const API_MOVIES = `https://api.themoviedb.org/3/trending/movie/week?api_key=ddeaf71f8f5eb42fd183f981de0978e8`;
const API_MOVIES_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=ddeaf71f8f5eb42fd183f981de0978e8&language=en-US&include_adult=false`;

const API_TVS = `https://api.themoviedb.org/3/trending/tv/week?api_key=ddeaf71f8f5eb42fd183f981de0978e8`;
const API_TVS_SEARCH = `https://api.themoviedb.org/3/search/tv?api_key=ddeaf71f8f5eb42fd183f981de0978e8&language=en-US&include_adult=false`;

const API_PERSONS = `https://api.themoviedb.org/3/trending/person/week?api_key=ddeaf71f8f5eb42fd183f981de0978e8`;
const API_PERSONS_SEARCH = `https://api.themoviedb.org/3/search/person?api_key=ddeaf71f8f5eb42fd183f981de0978e8&language=en-US&include_adult=false`;

///---------------------
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchTypeMedia: 'all',
                  searchUrl: API_ALL,
                  searchUrlOptions: API_ALL_SEARCH,
                  searchQuery: '',
                  searchQueryShowOptions: false,
                  searchQueryOptions: []
                  };
  }

  componentDidUpdate = () => {
    //this.setState(state => ({ searchQueryShowOptions: false }));
  }

  searchTypeOnSubmit = (e) => {
    const typeMedia = e.target.value;
    this.setState((state => ({ searchTypeMedia: typeMedia })));
    const queryValue = this.state.searchQuery;    
    this.changeSearchURL(typeMedia, queryValue)
    this.changeSearchPAGE(typeMedia);
  }  

  // input change
  searchQueryOnChange = (e, value, reason) => {     //input onChange
    if (e) {
      if (e.type === 'change') {
        let queryValue = value;
        if ((queryValue === null) || (queryValue === '')) {
          this.clearSearchQuery();
        } else {
          this.setState(state => ({ searchQuery: queryValue}));
          this.setState(state => ({ searchQueryShowOptions: (queryValue.length >= 5 )}));
        }
      } else if (e.type === 'click') { 
        if ((reason === 'clear') && ((value === '') || (value === null))) {
          this.clearSearchQuery();
        } else if ((reason === 'reset') && (value.length > 0)) {
          this.setState(state => ({ searchQuery: value}));
        }
      } else if (e.type === 'keydown') {
        if (e.key === 'Enter') {
          this.searchQueryOnSubmit(e);
        }
      } // if (e.type === 'change') {
    } // if (e) {
  }
  // btn onClick
  searchQueryOnSubmit = (e) => { 
    this.setState(state => ({ searchQueryShowOptions: false }));
    this.changeSearchURL(this.state.searchTypeMedia, this.state.searchQuery);
    const history = appHistory;
    if (history.location.pathname.indexOf('details') > -1) {
      this.changeSearchPAGE(this.state.searchTypeMedia);     
    }
  }
  //
  searchQuerySelected = (option, value) => {
    return (option.name === value.name);
  }
  
  clearSearchQuery = () => {
    this.setState(state => ({ searchQuery: ''}));
    this.setState(state => ({ searchQueryShowOptions: false}));
    this.setState(state => ({ searchQueryOptions: []}));
    this.changeSearchURL(this.state.searchTypeMedia, '');
    const history = appHistory;    
    if (history.location.pathname.indexOf('details') > -1) {
      this.changeSearchPAGE(this.state.searchTypeMedia);     
    }
  }

  changeSearchURL = (typeMedia, searchQuery) => {
    this.setState(state => ({ searchQueryShowOptions: false}));
    let strSearchUrl = '';
    let strSearchUrlOptions = '';
    if (typeMedia === 'movies') {
      strSearchUrl = (searchQuery !=='') ? (API_MOVIES_SEARCH + `&query=${searchQuery}`) : API_MOVIES;
      strSearchUrlOptions = API_MOVIES_SEARCH;
    } else if (typeMedia === 'tv') {
      strSearchUrl = (searchQuery !=='') ? (API_TVS_SEARCH + `&query=${searchQuery}`) : API_TVS;
      strSearchUrlOptions = API_TVS_SEARCH;    
    } else if (typeMedia === 'person') { 
      strSearchUrl = (searchQuery !=='') ? (API_PERSONS_SEARCH + `&query=${searchQuery}`) : API_PERSONS;
      strSearchUrlOptions = API_PERSONS_SEARCH;
    } else {
      strSearchUrl = (searchQuery !=='') ? (API_ALL_SEARCH + `&query=${searchQuery}`) : API_ALL;
      strSearchUrlOptions = API_ALL_SEARCH;
    }
    this.setState(state => ({ searchUrl: strSearchUrl }));
    this.setState(state => ({ searchUrlOptions: strSearchUrlOptions }));
  }
  
  changeSearchPAGE = (typeMedia) => {
    this.setState(state => ({ searchQueryShowOptions: false}));
    const history = appHistory;
    if (typeMedia === 'movies') {
      history.push("/movies/");
    } else if (typeMedia === 'tv') {
      history.push("/series/");
    } else if (typeMedia === 'person') { 
      history.push("/persons/");
    } else {
      history.push("/");
    }
  }

  //---> RENDER <---//
  render() {
    return (
    <Router history={appHistory}>
      <div class='app'>
        <Container maxWidth='lg'>
          <Header key={10101}
                  searchTypeMedia={this.state.searchTypeMedia} 
                  searchTypeOnSubmit={this.searchTypeOnSubmit} 
                  searchQueryValue={this.state.searchQuery}         
                  searchQueryOnChange={this.searchQueryOnChange} 
                  searchQueryOnSubmit={this.searchQueryOnSubmit} 
                  searchQuerySelected={this.searchQuerySelected}
                  searchQueryShowOptions={this.state.searchQueryShowOptions} 
                  API_URL_OPTIONS={this.state.searchUrlOptions}/>     
          <Switch>
            <Route path='/movies/details/:id' 
                   render={(props) => <MoviesDetails id={props} />} />
            <Route path='/movies/' exact>
              <Movies key={1201} API_URL={this.state.searchUrl}
                      API_URL_OPTIONS={this.state.searchUrlOptions}
                      API_IMAGES={API_IMAGES}/></Route>          
            <Route path='/series/details/:id' 
                   render={(props) => <SeriesDetails id={props} />} />
            <Route path='/series/' exact >
              <Series key={1301} API_URL={this.state.searchUrl}
                      API_URL_OPTIONS={this.state.searchUrlOptions}
                      API_IMAGES={API_IMAGES}/></Route>
            <Route path='/persons/details/:id' 
                   render={(props) => <PersonsDetails id={props} />} />
            <Route path='/persons/' exact >
              <Persons key={1401} API_URL={this.state.searchUrl}
                       API_URL_OPTIONS={this.state.searchUrlOptions}
                       API_IMAGES={API_IMAGES}/></Route>
            <Route path='/' exact>
              <All key={1101} API_URL={this.state.searchUrl}
                   API_URL_OPTIONS={this.state.searchUrlOptions}
                   API_IMAGES={API_IMAGES}/></Route> 
          </Switch>
        </Container>       
      </div>
    </Router>

  )};
}

export default App;
