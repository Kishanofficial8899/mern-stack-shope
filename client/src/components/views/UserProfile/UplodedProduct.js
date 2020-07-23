import React, { useState, useEffect } from 'react';
import axios from 'axios';
const UploadedProduct = () => {
  const [userAddedProduct, setUserAddedProduct] = useState([]);

  useEffect(() => {
    axios
      .get('/api/1.0/getingUserAddedProduct')
      .then((res) => {
        if (res.data.success) {
          setUserAddedProduct(res.data.doc);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const renderImage = (Images) => {
    if (Images && Images.length > 0) {
      let image = Images[0];
      return `http://localhost:5000/${image}`;
    }
  };
  return (
    <div style={{ width: '80%', margin: '3rem auto' }}>
      {userAddedProduct && userAddedProduct.length > 0 && (
        <h1>Your Added Product</h1>
      )}

      <table>
        {userAddedProduct && userAddedProduct.length > 0 && (
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th>Product Image</th>
              <th>Product Title</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
        )}
        <tbody>
          {userAddedProduct &&
            userAddedProduct.length > 0 &&
            userAddedProduct.map((item) => {
              return (
                <tr>
                  <td>
                    <img
                      style={{ width: '70px' }}
                      src={renderImage(item.images)}
                      alt={item.title}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.sold}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UploadedProduct;
