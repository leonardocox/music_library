import GalleryItem from "./GalleryItem";

function Gallery(props) {
  const { data } = props;
  const results = data.result.read();

  const display = results.map((item, index) => {
    return <GalleryItem item={item} key={index} />;
  });
  return <div>{display}</div>;
}

export default Gallery;
