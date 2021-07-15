import './Header.css';
import React, { useEffect } from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import InputAutoComplete from './Autocomplete';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

// HEADER() ------------>
// --------------------->
const Header = (props) => {

  useEffect(() => {
    document.getElementById("inpSearch").focus(); 
  }, []);

  // RENDER() ------------>
  // --------------------->
  return (
    <>
    <div class="contentHeader">
      <div class="header">
        <div id="col1" class="headerColumn">
          <img id="imgLogo" alt="App icon" width="40" src={process.env.PUBLIC_URL+'/green_app_icon.svg'} class="imgLogo"/>
          <label class="lblLogo">MovieDB Search</label>
          <label class="hg">&nbsp;||&nbsp;</label>
        </div>
        <div id="col2" class="headerColumn">
          <label id="lblSearch" class="lblSearch">Search:&nbsp;</label>
          <RadioGroup id="radMediaType" class="radSearch" row aria-label="lblSearch"
                      value={props.searchTypeMedia} 
                      onChange={props.searchTypeOnSubmit}>
            <FormControlLabel value="all" control={<GreenRadio />} label="All" />
            <FormControlLabel value="movies" control={<GreenRadio />} label="Movies" />
            <FormControlLabel value="tv" control={<GreenRadio />} label="TV Series" />
            <FormControlLabel value="person" control={<GreenRadio />} label="Actors" />
          </RadioGroup>         
        </div>        
        <div id="col3" class="headerColumn">
            <InputAutoComplete key={75656} {...props} class="headerColumn"/>
            <img id="imgSearch" name="imgSearch" alt="Search" class="imgSearch" 
              onClick={props.searchQueryOnSubmit}
              src={process.env.PUBLIC_URL+'/lupa.png'} />                              
        </div>
      </div>
    </div>
    </>
  );
};
export default Header;
