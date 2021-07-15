import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';

import ContentCard from "../../components/ContentCard";
import ContentPagination from "../../components/ContentPagination";

const Persons = (props) => {

  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();  
  const [content, setContent] = useState([]);
  const [contentResults, setContentResults] = useState(0);
  const [loadingError, setLoadingError] = useState('ERROR: No Results Found!!!');
  const API_IMAGES = props.API_IMAGES;
  
  const fetchPersons = async () => {
    try {
      setLoadingError(`WAIT ... loading data from API...`);
      const strURL = props.API_URL+`&page=${page}`;
      const { data } = await axios.get(strURL);
      if (data.results.length > 0) {  
        setContent(data.results);
        setNumOfPages(data.total_pages);
        setContentResults(data.total_results);
      } else {
        setLoadingError(`ERROR NO DATA AVAILABLE ON THIS SEARCH`);
      }
    } catch (error) {
      setLoadingError(`ERROR Loading API: ${{error}}`);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchPersons();
   }, [page, props.API_URL]);

   const setVoteClass = (vote) => {
    if (vote >= 8) { return 'green'; }
    else if (vote >= 6) { return 'orange'; }
    else { return 'red'; }
  };  
  // ---> RENDER/RETURN <---
  return (
    <div>
      <div className="contentContainer">
        {(contentResults === 0) ? (<h3>{loadingError}</h3>)
                                : (content.map(item => {
                                      return (<ContentCard key={item.id}
                                        cardId={item.id}
                                        cardMediaType={'person'}                                      
                                        cardImgPath={(item.profile_path ? (API_IMAGES + item.profile_path) : 'person.jpg')}
                                        cardTitle={item.name}
                                        cardVoteAverage={item.popularity}
                                        cardTagColor={setVoteClass(item.popularity)}
                                        cardOverview={'... no synopsis ...'} />);
                                    })) }
      </div>
      {numOfPages > 1 && (
        <ContentPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};
export default withRouter(Persons);
// END ------------------>> 
