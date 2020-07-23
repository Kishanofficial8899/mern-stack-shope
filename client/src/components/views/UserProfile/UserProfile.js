import React, { useState, useEffect } from 'react';

import HistoryPage from '../historyPage/historyPage';
import axios from 'axios';
import UploadedProduct from './UplodedProduct';
import { Card, Button } from 'antd';

const { Meta } = Card;
const UserProfile = ({ user }) => {
  const [toggle, setIsToggle] = useState(true);
  const [userProduct, setUserProduct] = useState([]);
  const toggleHistory = () => {
    setIsToggle(!toggle);
  };

  console.log(userProduct);
  return (
    <div style={{ width: '70%', margin: '1rem auto' }}>
      <div style={{ textAlign: 'center' }}></div>
      <Card
        cover={
          <div
            style={{
              textAlign: 'center',
              margin: '1rem auto',
            }}>
            {user.userData && (
              <div>
                <img
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                  }}
                  alt='example'
                  src={user.userData.image}
                />
                <h2 style={{ paddingTop: '0.5rem', color: 'grey' }}>
                  {user.userData.name}
                </h2>
                <h2 style={{ color: 'grey', fontSize: '1rem' }}>
                  {user.userData.email}
                </h2>
                <div style={{ marginTop: '2rem' }}>
                  {!toggle ? (
                    <Button type='primary' size='large' onClick={toggleHistory}>
                      Show More
                    </Button>
                  ) : (
                    <Button type='primary' size='large' onClick={toggleHistory}>
                      Show Less
                    </Button>
                  )}
                </div>

                <div style={{ marginTop: '1rem' }}>
                  {toggle && <UploadedProduct />}
                </div>
                {toggle && <HistoryPage user={user} />}
              </div>
            )}
          </div>
        }></Card>
    </div>
  );
};

export default UserProfile;
