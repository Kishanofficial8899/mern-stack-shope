import React from 'react';
import { Carousel } from 'antd';

const ImageSlider = ({ Images }) => {
  return (
    <>
      <Carousel autoplay dots={false} effect='scrollx'>
        {Images.map((image, index) => (
          <div key={index}>
            <img
              src={`http://localhost:5000/${image}`}
              alt='productImage'
              style={{ width: '100%', maxHeight: '150px' }}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
};
export default ImageSlider;
