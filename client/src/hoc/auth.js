import React, { useEffect } from 'react';
import { auth } from '../actions/user_actions';
import { useSelector, useDispatch } from 'react-redux';

export default function (SpectificComponent, option, adminRoute = null) {
  function AuthencticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth())
        .then((res) => {
          if (!res.payload.isAuth) {
            if (option) {
              props.history.push('/login');
            }
            //Loggined In Status
          } else {
            if (adminRoute && !res.payload.isAdmin) {
              props.history.push('/');
            } else {
              if (option === false) {
                props.history.push('/');
              }
            }
          }
        })
        .catch((err) => console.log(err));
    }, []);
    return <SpectificComponent {...props} user={user} />;
  }
  return AuthencticationCheck;
}
