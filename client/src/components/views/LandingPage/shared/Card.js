import React from 'react';
import { Col, Card } from 'antd';

import PropTypes from 'prop-types';
import ImageSlider from './ImageSlider';
import { Link } from 'react-router-dom';

let { Meta } = Card;

const RenderCard = ({ products }) => {
  return (
    <>
      {products &&
        products.map((product) => {
          return (
            <Col
              className='gutter-row'
              xs='8'
              sm='16'
              md='24'
              lg='32'
              lg='32'
              key={product._id}>
              <Card
                hoverable
                style={{ width: 240, height: '250px' }}
                cover={
                  <Link to={`/product/${product._id}`}>
                    {' '}
                    <ImageSlider Images={product.images} />
                  </Link>
                }>
                <Meta title={product.title} />
                <h2
                  style={{
                    fontSize: '1.3rem',
                    marginTop: '0.5rem',
                    color: 'grey',
                  }}>
                  <span>₹</span>
                  {''} {product.price}
                </h2>
              </Card>
            </Col>
          );
        })}
    </>
  );
};

RenderCard.propTypes = {
  products: PropTypes.array,
};

export default RenderCard;

// products.map((product) => (
//   <Col className='gutter-row' xs='8' sm='16' md='24' lg='32' lg='32'>
//     <Card
//       hoverable
//       style={{ width: 240 }}
//       cover={<img alt={product.title} src={product.images} />}>
//       <Meta title={product.title} description={product.description} />
//     </Card>
//   </Col>
// ));
