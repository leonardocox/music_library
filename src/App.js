import { Fragment, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import AlbumView from "./components/AlbumView";
import ArtistView from "./components/ArtistView";
import { SearchContext } from "./context/SearchContext";

function App() {
  let searchInput = useRef("");
  let [message, setMessage] = useState("Search for Music!");
  let [data, setData] = useState([]);

  const API_URL = "https://itunes.apple.com/search?term=";

  const handleSearch = (e, term) => {
    e.preventDefault();
    if (term) {
      const fetchData = async () => {
        document.title = `${term} Music`;
        const response = await fetch(API_URL + term);
        const resData = await response.json();
        if (resData.results.length > 0) {
          setData(resData.results);
        } else {
          setMessage("Not Found");
        }
      };
      fetchData();
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        handleSearch,
      }}
    >
      {message}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <SearchBar />
                <Gallery data={data} />
              </Fragment>
            }
          />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </SearchContext.Provider>
  );
}

export default App;
