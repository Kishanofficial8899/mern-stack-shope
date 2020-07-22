import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getCartItems,
  removeItemFromCart,
  onSuccessBuy,
} from '../../../actions/user_actions';
import UserCartBlock from './sections/UserCartBlock';
import Payment from '../../utils/Payment';

import { Result, Empty } from 'antd';

const Cart = ({ user }) => {
  const dispatch = useDispatch();

  const [Total, SetTotal] = useState();
  const [showSuccess, setshowSuccess] = useState(false);
  const [ShowTotal, SetshowTotal] = useState(false);

  useEffect(() => {
    let cartItems = [];
    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, user.userData.cart)).then(
          (response) => {
            if (response.payload.length > 0) {
              calculatTotalAmout(response.payload);
            }
          }
        );
      }
    }
  }, [user.userData]);

  useEffect(() => {
    if (user.cartDetail && user.cartDetail.length > 0) {
      calculatTotalAmout(user.cartDetail);
    }
  }, [user.cartDetail]);

  const calculatTotalAmout = (cartDetails) => {
    let total = 0;

    cartDetails.map((cartDetail) => {
      total += parseInt(cartDetail.price, 10) * cartDetail.quantity;
    });

    SetTotal(total);
    SetshowTotal(true);
  };

  const transtionSuccess = (data) => {
    // console.log(data);
    dispatch(
      onSuccessBuy({
        cartDetail: user.cartDetail,
        paymentData: data,
      })
    )
      .then((res) => {
        if (res.payload.success) {
          setshowSuccess(true);
          SetshowTotal(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const transactionError = () => {
    console.log('Paypal error');
  };
  const transactionCanceled = () => {
    console.log('Transaction canceled');
  };
  //Remove From Cart

  const removeFromCart = async (productID) => {
    dispatch(removeItemFromCart(productID)).then((res) => {
      if (res.payload.cartDetail.length <= 0) {
        SetshowTotal(false);
      } else {
        calculatTotalAmout(res.payload.cartDetail);
      }
    });
  };

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <div>
        {user.cartDetail && user.cartDetail.length > 0 && (
          <div>
            <h1>Cart</h1>
            <UserCartBlock
              cartDetails={user.cartDetail}
              removeFromCart={removeFromCart}
            />
          </div>
        )}

        {ShowTotal ? (
          <div style={{ marginTop: '2rem' }}>
            <h1>
              Totle Amount Is : <span>₹</span> {''}
              {Total}
            </h1>
          </div>
        ) : showSuccess ? (
          <Result status='success' title='SuccessFully Purchansed Item' />
        ) : (
          <div
            style={{
              width: '100%',
              display: 'flex',
              marginTop: '5rem',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <br />
            <Empty description={false} />
            <h2 style={{ textAlign: 'center' }}>No Item in Cart</h2>
          </div>
        )}
      </div>
      {ShowTotal && (
        <Payment
          toPay={Total}
          onPayementSuccess={transtionSuccess}
          transactionError={transactionError}
          transactionCanceled={transactionCanceled}
        />
      )}
    </div>
  );
};

export default Cart;
