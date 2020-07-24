import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import './Sections/Navbar.css';

import { Link } from 'react-router-dom';

import { MenuOutlined } from '@ant-design/icons';

//Drawer
import { Drawer, Button } from 'antd';

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const hideDrawer = () => {
    setVisible(false);
  };

  return (
    <nav
      className='menu'
      style={{
        position: 'fixed',
        zIndex: 5,
        width: '100%',
        overflowY: 'hidden',
        padding: 0,
        margin: 0,
      }}>
      <div className='menu__logo'>
        <Link to='/'>
          <span style={{ paddingRight: '0.5rem' }}>Logo</span>
        </Link>
      </div>
      <div className='menu__container'>
        <div className='menu_left'>
          <LeftMenu mode='horizontal' />
        </div>
        <div className='menu_rigth'>
          <RightMenu mode='horizontal' />
        </div>
        <Button
          className='menu__mobile-button'
          type='primary'
          onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer
          title='Basic Drawer'
          placement='left'
          className='menu_drawer'
          closable={true}
          onClose={hideDrawer}
          visible={visible}>
          <LeftMenu mode='inline' />
          <RightMenu mode='inline' />
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
