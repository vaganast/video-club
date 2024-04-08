import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    navigate('/login');
  };

  return (
    <>
      <h1>Home</h1>
      <div className='wrap'>
        <p>You are logged in!</p>
        <Link to='/movies'>Go to the Movies page</Link>
        <Link to='/rentals'>Go to your Rentals</Link>
        <Link to='/profile'>Go to your Profile</Link>
        <Link to='/admin'>Go to the Admin page</Link>
        <Link to='/chart'>Go to the Chart page</Link>
        <div className='flexGrow'>
          <button onClick={logout}>Log Out</button>
        </div>
      </div>
    </>
  );
};

export default Home;
