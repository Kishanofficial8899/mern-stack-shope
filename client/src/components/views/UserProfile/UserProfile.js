import React from 'react';

import { Card } from 'antd';
import HistoryPage from '../historyPage/historyPage';

const { Meta } = Card;
const UserProfile = ({ user }) => {
  console.log(user);
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
                <HistoryPage user={user} />
              </div>
            )}
          </div>
        }></Card>
    </div>
  );
};

export default UserProfile;
