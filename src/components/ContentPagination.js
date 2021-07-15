import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from '@material-ui/lab/PaginationItem';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme) =>({
  selected: {
        background: "#FFF",
        color:"#FFF",
        fontWeight: "bold",
    },
  }),
);

export default function ContentPagination({ setPage, numOfPages = 10 }) {
  const classes = useStyles();
  // Scroll to top when page changes
  const handlePageChange = (e, page) => {
    setPage(page);
    window.scroll(0, 0);
  };
//                  onChange={(e) => handlePageChange(e.target.textContent)}
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",        
        fontFamily: "inherit",
        fontWeight: "bold",
        backgroundColor: "#373b69",
        overflow: "hidden",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination id="navBottom"
                    count={numOfPages} 
                    onChange={handlePageChange}
                    variant="outlined" 
                    shape="rounded"  
                    color="primary"
                    showFirstButton 
                    showLastButton
                    renderItem={(item)=> <PaginationItem {...item} classes={{selected:classes.selected}} />} />
      </ThemeProvider>
    </div>
  );
}
