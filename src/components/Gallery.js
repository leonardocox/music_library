import GalleryItem from "./GalleryItem";

function Gallery(props) {
  const { data } = props;

  const display = data.map((item, index) => {
    return <GalleryItem item={item} key={index} />;
  });
  return <div>{display}</div>;
}

export default Gallery;