import axios from '../api/axios';
import useAuth from './useAuth';

const REFRESH_URL = '/auth/refresh/';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const TokenRefresh = auth.refreshToken;

  const refresh = async () => {
    const response = await axios.post(
      REFRESH_URL,
      JSON.stringify({ refresh: TokenRefresh }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    setAuth(prev => {
      console.log(JSON.stringify(prev));
      console.log(response.data.access);
      return { ...prev, accessToken: response.data.access };
    });
    return response.data.access;
  };

  return refresh;
};

export default useRefreshToken;
