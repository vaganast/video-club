import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

export default function Profile() {
  const { auth } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState();

  const getProfile = async () => {
    try {
      let response = await axios.get('/rent-store/profile/', {
        headers: {
          Authorization: 'Bearer ' + auth.accessToken,
        },
      });
      setFirstName(response?.data.first_name);
      setLastName(response?.data.last_name);
      setEmail(response?.data.email);
      setWallet(response?.data.wallet);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section>
      <h1>
        Welcome to your profile page {firstName} {lastName}
      </h1>
      <h3>Your email address: {email}</h3>
      <h3>Wallet: {wallet}€</h3>
      <div className='flexGrow'>
        <Link to='/'>Home</Link>
      </div>
    </section>
  );
}
