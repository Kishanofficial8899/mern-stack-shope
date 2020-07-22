import axios from 'axios';
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  AUTH_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER,
  ON_SUCCESS_BUY_USER,
} from './types';

//REGISTER USER

export const registerUser = async (dataTosubmit) => {
  const res = await axios.post('/api/1.0/register', dataTosubmit);
  const data = await res.data;

  return {
    type: REGISTER_USER,
    payload: data,
  };
};

//LOGIN USER
export const loginUser = async (dataToSubmit) => {
  const res = await axios.post('/api/1.0/login', dataToSubmit);
  const data = await res.data;

  return {
    type: LOGIN_USER,
    payload: data,
  };
};

//AUTHENTICATION
export const auth = async () => {
  try {
    const res = await axios.get('/api/1.0/auth');
    const data = await res.data;

    return {
      type: AUTH_USER,
      payload: data,
    };
  } catch (error) {
    console.log(error);
  }
};

//LOGOUT
export const logoutUser = async () => {
  const res = await axios.get('api/1.0/logout');
  const data = await res.data;

  return {
    type: LOGOUT_USER,
    payload: data,
  };
};

//Add User to Cart
export const addUserToCart = async (_id) => {
  const res = await axios.get(`/api/1.0/addToCartUser?productId=${_id}`);
  const data = res.data;

  return {
    type: ADD_TO_CART_USER,
    payload: data,
  };
};

export const getCartItems = async (cardItemsId, userCardData) => {
  const res = await axios.get(
    `/api/1.0/getProductById?id=${cardItemsId}&type=array`
  );
  const data = await res.data;

  userCardData.forEach((cardItem) => {
    data.forEach((productDetail, i) => {
      if (cardItem.id === productDetail._id) {
        data[i].quantity = cardItem.quantity;
      }
    });
    return data;
  });
  return {
    type: GET_CART_ITEMS_USER,
    payload: data,
  };
};

export const removeItemFromCart = async (productId) => {
  const res = await axios.get(`/api/1.0/removeItemFromCart?_id=${productId}`);

  const data = await res.data;
  data.cart.forEach((item) => {
    data.cartDetail.forEach((k, i) => {
      if (item.id === k._id) {
        data.cartDetail[i].quantity = item.quantity;
      }
    });
    return data;
  });
  return {
    type: REMOVE_CART_ITEM_USER,
    payload: data,
  };
};

//On Success Payment

export const onSuccessBuy = async (userData) => {
  const res = await axios.post('/api/1.0/successBuy', userData);
  const data = await res.data;
  return {
    type: ON_SUCCESS_BUY_USER,
    payload: data,
  };
};
