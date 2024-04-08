import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function HistoryChart() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [yearCounts, setYearCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    try {
      let response = await axiosPrivate.get(
        `/rent-store/movies/?page_size=200`,
        // `/rent-store/movies/?page_size=200&from-year=${year}&to-year=${year}`,
        {
          headers: {
            Authorization: 'Bearer ' + auth.accessToken, //the token is a variable which holds the token
          },
        }
      );
      setMovies(response?.data.results);
      //   console.log(response?.data);
    } catch (error) {
      console.log(error);
      //if access and refresh token expire sent user back to login but take the location comming from and replace the login in browser history and thats how we transfer the user back where he was
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // checking if we have data
  useEffect(() => {
    if (!movies) return;
    setLoading(false);
  }, [movies]);

  useEffect(() => {
    // Function to count objects by year
    const countObjectsByYear = () => {
      const counts = {};

      movies?.forEach(item => {
        const year = item.pub_date;

        // Filter the data array for items with the current year
        const filteredMovies = movies?.filter(obj => obj.pub_date === year);
        // console.log('filterdata', filteredData);
        // Count the length of the filtered array
        counts[year] = filteredMovies.length;
      });
      // Update state with the counts
      setYearCounts(counts);
      setLoading(false);
    };

    countObjectsByYear();
  }, [movies]);

  // Sort the years in ascending order
  const sortedYears = Object.keys(yearCounts).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );
  //   // Find the minimum and maximum years
  //   const minYear = parseInt(sortedYears[0]); //starts 0
  //   const maxYear = parseInt(sortedYears[sortedYears.length - 2]); //-1 null -2 is 12345

  const data = {
    datasets: sortedYears.map((year, index) => ({
      label: `Year`,
      data: [
        {
          x: parseInt(year), // Convert year to integer
          y: yearCounts[year],
          r: yearCounts[year],
        },
      ],
      backgroundColor: `rgba(${index * 10}, ${255 - index * 10}, ${
        (index * 5) % 255
      }, 0.6)`, // Dynamic color based on index
      borderColor: 'rgba(0, 0, 0, 1)',
      borderWidth: 1,
    })),
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        min: 1940, // Set min
        max: 2025, // Set max
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        display: false, //hide y axis
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend labels
      },
    },
  };

  //if we dont have data loader
  if (loading || !movies)
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '24px',
        }}
      >
        Loading...
      </div>
    );

  return (
    <>
      <div className='flexGrow'>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <h1>Movies by Year</h1>
      </div>
      <div className='bubble-wrap'>
        <div className='bubble-display'>
          <Bubble options={options} data={data} />;
        </div>
      </div>
    </>
  );
}
