import { Fragment, useRef, useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import AlbumView from "./components/AlbumView";
import ArtistView from "./components/ArtistView";
import { SearchContext } from "./context/SearchContext";
import { createResource as fetchData } from "./utility/FetchHelper";

function App() {
  let searchInput = useRef("");
  let [message, setMessage] = useState("Search for Music!");
  let [data, setData] = useState(null);

  const API_URL = "https://itunes.apple.com/search?term=";

  const handleSearch = (e, term) => {
    e.preventDefault();
    if (term) {
      const fetchedData = fetchedData(term);
      setData(fetchedData);
    }
  };

  const renderGallery = () => {
    if (data) {
      return (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Gallery data={data} />
        </Suspense>
      );
    }
  };

  return (
    <div className="application">
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
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <Gallery data={data} />
                  </Suspense>
                </Fragment>
              }
            />
            <Route path="/album/:id" element={<AlbumView />} />
            <Route path="/artist/:id" element={<ArtistView />} />
          </Routes>
        </Router>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
