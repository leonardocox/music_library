import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AlbumView() {
  const [albumData, setAlbumData] = useState([]);
  const { id } = useParams();

  return (
    <div>
      <h2>The id passed was: </h2>
      <p>Album Data Goes Here!</p>
    </div>
  );
}

export default AlbumView;
