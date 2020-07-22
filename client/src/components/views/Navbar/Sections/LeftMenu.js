import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import '../Sections/Navbar.css';

const LeftMenu = (props) => {
  return (
    <Menu mode={props.mode}>
      <Menu.Item style={{ position: 'relative', marginTop: '0.8rem' }}>
        <Link to='/'>Home</Link>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
