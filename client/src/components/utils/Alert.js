import React from 'react';

import { Alert } from 'antd';

export const Snakbar = (props) => {
  const { message, type, handleClose, description, width, Open } = props;
  return (
    <>
      <Alert
        message={message}
        style={{
          fontWeight: 'bold',
          width: width || '300px',
          textAlign: 'center',
        }}
        type={type || 'success'}
        onClose={handleClose}
        description={description ? description : ''}
        closable={true}
        showIcon
      />
    </>
  );
};
