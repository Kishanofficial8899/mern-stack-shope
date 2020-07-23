import React from 'react';
import { Empty } from 'antd';

const History = ({ user }) => {
  return (
    <div style={{ width: '80%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Payement History</h1>
      </div>
      <br />

      {user.userData && user.userData.history.length > 0 ? (
        <table>
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th>Payment Id</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date of Purchase</th>
            </tr>
          </thead>
          <tbody>
            {user.userData &&
              user.userData.history &&
              user.userData.history.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.dateOfPurchase}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div>
          <Empty description='No History Found' />
        </div>
      )}
    </div>
  );
};

export default History;
