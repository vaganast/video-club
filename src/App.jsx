import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/Rentals';
import MoviesList from './pages/MoviesList';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import Home from './pages/Home';
import Unauthorized from './pages/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Profile from './pages/Profile';
import Rentals from './pages/Rentals';
import HistoryChart from './pages/HistoryChart';

const ROLES = {
  User: 0,
  Admin: 1,
};

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path='login' element={<Login />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* protected routes */}
        <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
          <Route path='/' element={<Home />} />
          <Route path='movies' element={<MoviesList />} />
          {/* <Route path='movies/:id' element={<Movie />} /> */}
          <Route path='profile' element={<Profile />} />
          <Route path='rentals' element={<Rentals />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path='admin' element={<AdminPage />} />
          <Route path='chart' element={<HistoryChart />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path='user' element={<UserPage />} />
        </Route>
        {/* catch all */}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
