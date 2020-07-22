import React, { useEffect, useState } from 'react';
import ImageGallay from 'react-image-gallery';

const ProducImage = ({ details }) => {
  const [Images, setImages] = useState([]);
  useEffect(() => {
    if (details.images && details.images.length > 0) {
      let images = [];
      details.images &&
        details.images.map((item) => {
          images.push({
            original: `http://localhost:5000/${item}`,
            thumbnail: `http://localhost:5000/${item}`,
          });
        });
      setImages(images);
    }
  }, [details]);

  return (
    <div>
      <ImageGallay
        showPlayButton={
          details.images && details.images.length > 1 ? true : false
        }
        showBullets={details.images && details.images.length > 1 ? true : false}
        items={Images}
      />
    </div>
  );
};

export default ProducImage;
