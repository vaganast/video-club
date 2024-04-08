import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // compare values of roles in array
  return allowedRoles.includes(auth?.roles) ? (
    <Outlet />
  ) : auth?.username ? ( //check if there is username and if is we send it to unauthorized if there isnt go to log in
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

// old
// console.log(auth?.roles);
// console.log(allowedRoles);
//   return auth?.username ? (
//     <Outlet />
//   ) : (
//     <Navigate to='/login' state={{ from: location }} replace />
//   );
// };
export default RequireAuth;
