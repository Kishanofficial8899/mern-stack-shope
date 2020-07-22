import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProductImage from './SingleProductPart/ProductImage';
import ProductInfo from './SingleProductPart/ProductInfo';
import { addUserToCart } from '../../../actions/user_actions';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'antd';

const SingleProduct = (props) => {
  const productId = props.match.params.productId;
  const [Products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { single: abortCtrl.signal };

    axios
      .get(`/api/1.0/getProductById?id=${productId}`, opts)
      .then((res) => {
        setProducts(res.data[0]);
      })
      .catch((err) => console.log(err));
    return () => abortCtrl.abort();
  }, []);

  const addToCartUserhandler = (id) => {
    dispatch(addUserToCart(id));
  };

  return (
    <div className='postPage' style={{ width: '100%', padding: '3rem 4rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem',
          borderBottom: '1px solid grey',
          display: 'inline',
        }}>
        <h1>{Products.title}</h1>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <ProductImage details={Products} />
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfo details={Products} addToCart={addToCartUserhandler} />
        </Col>
      </Row>
    </div>
  );
};

export default SingleProduct;
