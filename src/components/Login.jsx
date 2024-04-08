import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import axios from '../api/axios';
const LOGIN_URL = '/auth/login/';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');

  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.access;
      const refreshToken = response?.data?.refresh;
      console.log(refreshToken, 'refresh');

      // const roles = response?.data?.roles; no roles in api
      //check if we have admin in usernameand set 1 if admin or 0 for user
      const roles = username.includes('admin') ? 1 : 0;
      setAuth({ username, password, accessToken, refreshToken, roles });
      setUsername('');
      setPassword('');

      //we navigate user from where he was if he click/movies and
      //  try to log in will go directly to the movies
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  // const getProfile = async () => {
  //   const accessToken = auth.accessToken;
  //   try {
  //     let response = await axios.get('/rent-store/profile/', {
  //       headers: {
  //         Authorization: 'Bearer ' + accessToken, //the token is a variable which holds the token
  //       },
  //     });
  //     console.log(response?.data);
  //     const email = response?.data.email;
  //     email.includes('admin') ? setRoles(1) : setRoles(0);
  //     // setRoles(response?.data.wallet);
  //     setAuth({ ...auth, roles });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getProfile();
  // }, [username, password]);

  return (
    <div className='wrap'>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive' //present the error to user the msg immediately
      >
        {errMsg}
      </p>
      <h1>Log in </h1>
      <form className='wrap' onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          ref={userRef}
          autoComplete='off'
          onChange={e => setUsername(e.target.value)}
          value={username}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          autoComplete='off'
          onChange={e => setPassword(e.target.value)}
          value={password}
          required
        />
        <button className='my-nav-button'>Login</button>
      </form>
    </div>
  );
};

export default Login;
