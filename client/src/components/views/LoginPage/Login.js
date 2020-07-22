import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../actions/user_actions';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const { Title } = Typography;

const Login = (props) => {
  const dispatch = useDispatch();
  const remeberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [ErrorMessage, setFormErrorMessage] = useState('');
  //FOR THE REMEBERING PASSWORD
  const [rememberMe, setRememberMe] = useState(remeberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const instialEmail = localStorage.getItem('rememberMe')
    ? localStorage.getItem('rememberMe')
    : '';

  return (
    <Formik
      initialValues={{
        email: instialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };

          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push('/');
              } else {
                setFormErrorMessage('Check out your Account or Password again');
              }
            })
            .catch((err) => {
              setFormErrorMessage(err.response);

              setTimeout(() => {
                setFormErrorMessage('');
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}>
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <div className='app'>
            <Title level={2}>Log IN</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>
              {/* FOR THE EMAIL */}
              <Form.Item required>
                <Input
                  id='email'
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Enter your email'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className='input-feedback'>{errors.email}</div>
                )}
              </Form.Item>
              {/* FOR THE PASSWORD */}
              <Form.Item required>
                <Input
                  id='password'
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Enter your password'
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className='input-feedback'>{errors.password}</div>
                )}
              </Form.Item>

              {ErrorMessage && (
                <label style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                  <label>
                    <p
                      style={{
                        color: '#ff0000bf',
                        fontSize: '0.7rem',
                        border: '1px solid',
                        padding: '1rem',
                        borderRadius: '10px',
                      }}>
                      {ErrorMessage}
                    </p>
                  </label>
                </label>
              )}

              {/* for The remebering Password */}
              <Form.Item>
                <Checkbox
                  id='rememberMe'
                  onChange={handleRememberMe}
                  checked={rememberMe}>
                  Remeber Me
                </Checkbox>
                <Link
                  className='login-form-forgot'
                  to='/reset_user'
                  style={{ float: 'right' }}>
                  forgot password
                </Link>
                <div>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'
                    style={{ minWidth: '100%', marginTop: '1rem' }}
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}>
                    Log in
                  </Button>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Link to='/register'>Register now!</Link>
                </div>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(Login);
