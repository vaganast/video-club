import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

//hook to use the refresh token and get new access token
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  //interceptors
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        //forbiden
        if (error?.response.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    //clean up func
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
