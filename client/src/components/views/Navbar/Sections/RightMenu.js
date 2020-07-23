import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  UploadOutlined as Uploadoutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Menu, Badge, Avatar } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const RightMenu = (props) => {
  const user = useSelector((state) => state.user);

  //handle LogoutHandler
  const logoutHanlder = async () => {
    const res = await axios.get('/api/1.0/logout');
    if (res.status === 200) {
      props.history.push('/login');
    } else {
      alert('Log Out Failed');
    }
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode} style={{ marginTop: '0.8rem' }}>
        <Menu.Item key='mail'>
          <Link to='/login'>Signin</Link>
        </Menu.Item>
        <Menu.Item key='app'>
          <Link to='/register'>Signup</Link>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        {/* history */}

        <Menu.Item key='history' style={{ paddingBottom: '0.2rem' }}>
          <Link to='/history'>History</Link>
        </Menu.Item>
        <Menu.Item key='upload'>
          <Link to='/upload/product'>
            <span>
              <Uploadoutlined
                style={{
                  fontSize: '2rem',
                  color: 'blue',
                }}
              />
            </span>
          </Link>
        </Menu.Item>
        {/* Cart */}

        <Menu.Item key='cart'>
          <Link to='/user/cart'>
            {/* user.userData && user.userData.cart.length */}
            <Badge count={user.userData && user.userData.cart.length}>
              <span>
                <ShoppingCartOutlined
                  style={{
                    fontSize: '2rem',
                    color: 'blue',
                  }}
                />
              </span>
            </Badge>
          </Link>
        </Menu.Item>

        <SubMenu
          title={
            <span
              style={{
                marginTop: '1rem',
              }}>
              {user.userData && <Avatar src={user.userData.image} size={25} />}
            </span>
          }>
          <Menu.Item key='logout'>
            <Link to='' onClick={logoutHanlder}>
              Logout
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
};

export default withRouter(RightMenu);
