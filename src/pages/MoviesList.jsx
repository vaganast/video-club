import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from '../api/axios';
import Modal from '../components/Modal';
import popcorn from '../assets/images/popcorn.jpg';

export default function MoviesList() {
  const { auth, setAuth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [maxCount, setMaxCount] = useState();
  const [count, setCount] = useState(1);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [rentMovies, setRentMovies] = useState([]);
  const [isRent, setIsRent] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const onImageError = e => {
    e.target.src = popcorn;
  };
  const getMovies = async () => {
    try {
      let response = await axiosPrivate.get(
        // `/rent-store/movies/?page=${count}&from-year=2015`,
        `/rent-store/movies/?page=${count}&page_size=10`,
        {
          headers: {
            Authorization: 'Bearer ' + auth.accessToken, //the token is a variable which holds the token
          },
        }
      );
      setMovies(response?.data.results);
      setMaxCount(Math.ceil(response?.data.count / 10));
      console.log(response?.data);
    } catch (error) {
      console.log(error);
      //if access and refresh token expire sent user back to login but take the location comming from and replace the login in browser history and thats how we transfer the user back where he was
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  const rentMovie = async id => {
    const response = await axios.post(
      '/rent-store/rentals/',
      JSON.stringify({ movie: id }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.accessToken, //the token is a variable which holds the token
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    setRentMovies(response.data);
    setIsRent(true);
    setAuth({ ...auth, rentMovies: rentMovies });
  };

  const nextPage = () => {
    console.log(count, 'prev');
    if (count <= maxCount) {
      setCount(count => count + 1);
    }
  };

  const prevPage = () => {
    if (count > 1) {
      setCount(count => count - 1);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function handleShow(movie) {
    console.log(movie);
    setMovie(movie);
    setShow(true);
  }

  useEffect(() => {
    getMovies();
    handleScrollToTop();
  }, [count]);

  useEffect(() => {
    const handleScrollBtnVis = () => {
      window.scrollY > 300 ? setShowBtn(true) : setShowBtn(false);
    };
    window.addEventListener('scroll', handleScrollBtnVis);
    return () => {
      window.removeEventListener('scroll', handleScrollBtnVis);
    };
  });

  return (
    <div>
      <h1>Movies</h1>
      <div className='flexGrow'>
        <Link to='/'>Home</Link>
      </div>
      <div className='movies-card-wrap'>
        {movies?.map(movie => (
          <div
            className='movie-wrapper'
            key={movie?.uuid}
            onClick={() => handleShow(movie)}
          >
            <img
              src={movie?.poster_url ? movie?.poster_url : popcorn}
              onError={onImageError}
              alt='movie-poster'
              className='movie-img'
            />
            <div className='movie-title-wrap '>
              <h3 className='movie-title'>{movie?.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className='nav-wrap'>
        <button
          onClick={() => prevPage()}
          disabled={count > 1 ? false : true}
          className={`my-nav-button ${count > 1 ? 'show' : 'hide'}`}
        >
          prev page
        </button>
        <p className='count'>{count}</p>
        <button
          disabled={count === 157 ? true : false}
          onClick={() => nextPage()}
          className={`my-nav-button ${count === maxCount ? 'hide' : 'show'}`}
        >
          next page
        </button>
      </div>
      {show && (
        <Modal
          movie={movie}
          handleClose={handleClose}
          rentMovie={rentMovie}
          isRent={isRent}
          onImageError={onImageError}
        />
      )}
      {showBtn && (
        <div className='back-to-top'>
          <button className='btn-back' onClick={handleScrollToTop}>
            Back to top
          </button>
        </div>
      )}
    </div>
  );
}
