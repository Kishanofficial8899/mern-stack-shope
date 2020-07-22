import React from 'react';

import { Button } from 'antd';

const UserCartBlock = ({ cartDetails, removeFromCart }) => {
  //Here,Rendering Images
  const renderCartImage = (Images) => {
    if (Images && Images.length > 0) {
      let image = Images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  //For the Rending Table data
  const renderItems = () =>
    cartDetails &&
    cartDetails.map((cartDetail) => (
      <tr key={cartDetail._id}>
        <td>
          <img
            // src={`http://localhost:5000/${cartDetail.images[0]}`}
            src={renderCartImage(cartDetail.images)}
            style={{ width: '70px' }}
            alt='product'
          />
        </td>
        <td>{cartDetail.quantity}</td>
        <td>
          <span>₹</span> {cartDetail.price}
        </td>
        <td>
          <Button type='primary' onClick={() => removeFromCart(cartDetail._id)}>
            Remove
          </Button>
        </td>
      </tr>
    ));
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Product Image</th>
            <th style={{ textAlign: 'center' }}>Product Quantity</th>
            <th style={{ textAlign: 'center' }}>Product Price</th>
            <th style={{ textAlign: 'center' }}>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
};

export default UserCartBlock;
