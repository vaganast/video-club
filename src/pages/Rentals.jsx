import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

import useAxiosPrivate from '../hooks/useAxiosPrivate';

export default function Rentals() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const [rentals, setRentals] = useState();
  const [count, setCount] = useState(1);
  const [maxCount, setMaxCount] = useState();
  const [sortBy, setSortBy] = useState(null); // track sorting
  const [sortOrder, setSortOrder] = useState(null); //track sorting order

  const getRentals = async () => {
    try {
      let response = await axiosPrivate.get(
        `/rent-store/rentals/?page=${count}`,
        {
          headers: {
            Authorization: 'Bearer ' + auth.accessToken, //the token is a variable which holds the token
          },
        }
      );
      setRentals(response?.data.results);
      console.log(response?.data);
      setMaxCount(Math.ceil(response?.data.count / 5));
    } catch (error) {
      console.log(error);
      //if access and refresh token expire sent user back to login but take the location comming from and replace the login in browser history and thats how we transfer the user back where he was
      navigate('/login', { state: { from: location }, replace: true });
    }
  };
  const returnMovie = async id => {
    try {
      let response = await axiosPrivate.patch(
        `/rent-store/rentals/${id}`,
        JSON.stringify({ rental_uuid: id }),
        {
          headers: {
            Authorization: 'Bearer ' + auth.accessToken, //the token is a variable which holds the token
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortLetter = v => {
    if (sortBy === v) {
      // If already sorted by the same val, reverse the order
      setRentals([...rentals].reverse());
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Otherwise, sort the data by the selected val
      setRentals(prev => prev.toSorted((a, b) => a[v].localeCompare(b[v])));
      setSortBy(v);
      setSortOrder('asc');
    }
  };

  const handleSortNum = val => {
    if (sortBy === val) {
      // If already sorted by the same val, reverse the order
      setRentals([...rentals].reverse());
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Otherwise, sort the data by the selected val
      setRentals(prev =>
        prev.toSorted((a, b) => (a[val] === b[val] ? 0 : a[val] ? 1 : -1))
      );
      setSortBy(val);
      setSortOrder('asc');
    }
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

  useEffect(() => {
    getRentals();
  }, [count]);

  console.log(rentals, 'my rentals');
  return (
    <div>
      <h1>My Rentals</h1>
      <div className='wrap-sort'>
        <Link to='/'>Home</Link>
      </div>

      <div className='wrap-table'>
        <table>
          <tr>
            {auth.roles === 1 ? (
              <th onClick={() => handleSortLetter('user')}>
                User {sortBy === 'user' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            ) : (
              ''
            )}
            <th onClick={() => handleSortLetter('movie')}>
              Movie Title{' '}
              {sortBy === 'movie' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSortLetter('rental_date')}>
              Rental Date{' '}
              {sortBy === 'rental_date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSortNum('is_paid')}>
              Active Rental{' '}
              {sortBy === 'is_paid' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
          {rentals?.map(rental => (
            <tr key={rental.uuid}>
              {auth.roles === 1 ? <td>{rental.user}</td> : ''}
              <td>{rental.movie}</td>
              <td>{rental.rental_date}</td>
              {auth.roles === 1 ? (
                <td>{rental.is_paid ? 'returned movie' : 'Active Rental'}</td>
              ) : (
                <td>
                  {rental.is_paid ? (
                    'returned movie'
                  ) : (
                    <button
                      onClick={() => {
                        returnMovie(rental.uuid);
                      }}
                    >
                      Return Movie
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </table>
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
          disabled={count === maxCount ? true : false}
          onClick={() => nextPage()}
          className={`my-nav-button ${count === maxCount ? 'hide' : 'show'}`}
        >
          next page
        </button>
      </div>
    </div>
  );
}
