import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function ArtistView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [artistData, setArtistData] = useState([]);

  useEffect(() => {
    const API_URL = `http://localhost:4000/album/${id}`;
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const resData = await response.json();
      setArtistData(resData.results);
    };
    fetchData();
  }, [id]);

  const justAlbums = artistData.filter(
    (entry) => entry.collectionType === "Album"
  );

  const navButtons = () => {
    return (
      <div>
        <button type="button" onClick={(e) => navigate(-1)}>
          Back
        </button>
        <button type="button" onClick={(e) => navigate("/")}>
          Home
        </button>
      </div>
    );
  };

  const renderAlbums = justAlbums.map((album, i) => {
    return (
      <div key={i}>
        <Link to={`/album/${album.collectionId}`}>
          <p>{album.collectionName}</p>
        </Link>
        <p>{album.collectionName}</p>
      </div>
    );
  });

  return (
    <div>
      <h1>{artistData.length ? artistData[0].artistName : "Loading..."}</h1>
      {navButtons()}
      {renderAlbums}
    </div>
  );
}

export default ArtistView;
