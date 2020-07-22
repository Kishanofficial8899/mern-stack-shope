import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Descriptions } from 'antd';

const ProductInfo = ({ details, addToCart }) => {
  const user = useSelector((state) => state.user);
  const [Info, setInfo] = useState({});

  const addToCarthandler = () => {
    addToCart(details._id);
  };

  useEffect(() => {
    setInfo(details);
  }, [details]);
  return (
    <div>
      <Descriptions title='Product Info' bordered layout='vertical'>
        <Descriptions.Item label='Price'>{Info.price}</Descriptions.Item>
        <Descriptions.Item label='Sold'>{Info.sold}</Descriptions.Item>
        <Descriptions.Item label='View'>{Info.views}</Descriptions.Item>
        <Descriptions.Item label='Descriptions'>
          {Info.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {user.userData && user.userData.isAuth && (
          <Button type='primary' onClick={addToCarthandler}>
            Add To Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
