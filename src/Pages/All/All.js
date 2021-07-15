import axios from "axios";
import { useEffect, useState } from "react";
import ContentCard from "../../components/ContentCard";
import ContentPagination from "../../components/ContentPagination";

const All = (props) => {

  const [page, setPage] = useState(1);  
  const [numOfPages, setNumOfPages] = useState();
  const [content, setContent] = useState([]);
  const [contentResults, setContentResults] = useState(0);
  const [loadingError, setLoadingError] = useState('');
  const API_IMAGES = props.API_IMAGES;
  
  const fetchAll = async () => {
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
    fetchAll();
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
    fetchAll();
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
                                    const cardMediaType = item.media_type;
                                    let imgPath = 'question.jpg';
                                    let title = '';
                                    let voteAverage = '*';
                                    let tagColor = 'red';
                                    let overview = '... no synopsis ...';
                                    if (cardMediaType === 'movie') {
                                      imgPath = item.poster_path ? (API_IMAGES + item.poster_path) : 'movie.jpg';
                                      title = item.title;
                                      voteAverage = item.vote_average;
                                      tagColor = setVoteClass(item.vote_average);
                                      overview = (item.overview.trim() !== '') ? item.overview : overview;
                                    } else if (cardMediaType === 'tv') {
                                      imgPath = item.poster_path ? (API_IMAGES + item.poster_path) : 'tv.png';
                                      title = item.name;
                                      voteAverage = item.vote_average;
                                      tagColor = setVoteClass(item.vote_average);
                                      overview = (item.overview.trim() !== '') ? item.overview : overview;
                                    } else if (cardMediaType === 'person') {
                                      imgPath = (item.profile_path ? (API_IMAGES + item.profile_path) : 'person.jpg');
                                      title = item.name;
                                      voteAverage = item.popularity;
                                      tagColor = setVoteClass(item.popularity);
                                    }
                                    return (<ContentCard key={item.id}
                                        cardId={item.id}
                                        cardMediaType={cardMediaType}                                      
                                        cardImgPath={imgPath}
                                        cardTitle={title}
                                        cardVoteAverage={voteAverage}
                                        cardTagColor={tagColor}
                                        cardOverview={overview} />); })
        )}
      </div>
      {numOfPages > 1 && (
        <ContentPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};
export default All;
// END ------------------>> 
