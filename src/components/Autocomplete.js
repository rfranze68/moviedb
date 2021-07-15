import '../App.css';
import axios from 'axios';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function InputAutoComplete(props) {

  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    if (props.searchQueryShowOptions) {
      (async () => {
        const strSearchUrlOptions = props.API_URL_OPTIONS + `&page=1&query=${props.searchQueryValue}`;
        const { data } = await axios.get(strSearchUrlOptions);
        await sleep(1e3);
        if (data.results.length > 0) {
          const dataOptions = [];
          data.results.map( item => {
            const option = {};
            option.id = item.id;
            option.name = item.title||item.name;
            dataOptions.push(option);
          });
          setOptions(dataOptions);
        } else {
          setOptions(top100Films);
        }
      })();
    } else {
      setOptions([]);
    }
    setLoading(false);
  }, [props.searchQueryValue]);

  //----> RENDER() <----//
  return (
    <Autocomplete key={9999} autoFocus id="inpSearch" name="inpSearch"
      value={props.searchQueryValue}
      onChange={props.searchQueryOnChange}
      inputValue={props.searchQueryValue}
      onInputChange={props.searchQueryOnChange}
      freeSolo={true}
      open={props.searchQueryShowOptions}
      //getOptionSelected={(option, value) => option.name === value.name}
      getOptionSelected={props.searchQuerySelected}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      style={{ width: "250px", 
              height: "26px",  
              marginTop: "8px",
              marginLeft: "0px",
              marginRight: "6px",                       
              paddingTop: "0px",
              paddingBottom: "6px",
              paddingLeft: "2px",
              fontColor: "#fff",
              background: "#b6c0d4",
              overflow: "hidden"}}      
      renderInput={(params) => (
        <TextField key={83833}
          {...params}
          label=""
          margin="normal"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}


const top100Films = [
  { name: 'The Shawshank Redemption', year: 1994 },
  { name: 'The Godfather', year: 1972 },
  { name: 'The Godfather: Part II', year: 1974 },
  { name: 'The Dark Knight', year: 2008 },
  { name: '12 Angry Men', year: 1957 },
  { name: "Schindler's List", year: 1993 },
  { name: 'Pulp Fiction', year: 1994 },
  { name: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { name: 'The Good, the Bad and the Ugly', year: 1966 },
  { name: 'Fight Club', year: 1999 },
  { name: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { name: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { name: 'Forrest Gump', year: 1994 },
  { name: 'Inception', year: 2010 },
];