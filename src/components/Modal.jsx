import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

import popcorn from '../assets/images/popcorn.jpg';
export default function Modal({
  movie,
  handleClose,
  rentMovie,
  isRent,
  onImageError,
}) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  return (
    <div className='overlay' onClick={handleClose}>
      <div className='modalContainer'>
        <button className='closeBtn' onClick={handleClose}>
          X
        </button>
        <div className='content'>
          <div className='left'>
            <img
              src={movie?.poster_url ? movie?.poster_url : popcorn}
              alt='movie-poster'
              className='movie-img-modal'
              onError={onImageError}
            />
          </div>
          <div className='right'>
            <h3 className='movie-title'>{movie?.title}</h3>
            <h3 className='movie-desc'>{movie?.description}</h3>
            <div className='movie-extras-wrap'>
              <h5 className='movie-dur'>Duration: {movie?.duration}</h5>
              <h5 className='movie-pub'>Published Date: {movie?.pub_date}</h5>
              <h5>Rating: {movie?.rating}</h5>
              <h5>Categories: {movie?.categories.map(cat => cat + ' ')}</h5>
            </div>
          </div>
        </div>
        <div className='button-wrapper'>
          {auth.roles === 0 ? (
            <button
              className={`rent-btn ${isRent ? 'hide' : 'show'}`}
              id={movie?.uuid}
              onClick={() => rentMovie(movie?.uuid)}
              disabled={isRent}
            >
              Rent movie
            </button>
          ) : (
            ''
          )}
          {isRent && (
            <button
              className={`rent-btn`}
              id={movie?.uuid}
              onClick={() => navigate('/rentals')}
            >
              Return movie
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
