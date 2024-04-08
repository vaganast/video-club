import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

export default function AdminPage() {
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState();
  const [rating, setRating] = useState();
  const [pubDate, setPubDate] = useState();
  const [duration, setDuration] = useState();
  const [description, setDescription] = useState();
  const [categories, setCategories] = useState([]);

  const addMovie = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/rent-store/movies/',
        {
          title,
          pub_date: pubDate,
          duration,
          rating,
          description,
          categories,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + auth.accessToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      // console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Admins Page</h1>
      <div className='flexGrow'>
        <Link to='/'>Home</Link>
      </div>
      <h3>Add your new movie in your Video Club</h3>
      <form className='add-movie' onSubmit={addMovie}>
        <label htmlFor='title'>Movie Title</label>
        <input
          type='text'
          id='title'
          autoComplete='off'
          onChange={e => setTitle(e.target.value)}
          value={title}
          required
        />
        <label htmlFor='rating'>Rating</label>
        <input
          type='number'
          id='rating'
          autoComplete='off'
          onChange={e => setRating(parseInt(e.target.value, 10))}
          value={rating}
        />
        <label htmlFor='categories'>Categories</label>
        <input
          type='text'
          id='categories'
          autoComplete='off'
          onChange={e => setCategories(e.target.value.split(','))}
          value={categories.join(',')}
          required
        />
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          id='description'
          autoComplete='off'
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
        <label htmlFor='Published Date'>Published Date</label>
        <input
          type='number'
          id='Published Date'
          autoComplete='off'
          onChange={e => setPubDate(parseInt(e.target.value, 10))}
          value={pubDate}
        />
        <label htmlFor='Duration'>Duration</label>
        <input
          type='number'
          id='Duration'
          autoComplete='off'
          onChange={e => setDuration(parseInt(e.target.value, 10))}
          value={duration}
        />
        <button>Add Movie</button>
      </form>
    </div>
  );
}
