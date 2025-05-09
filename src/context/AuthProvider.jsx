import invariant from 'invariant';
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '@/api';
import { addUser } from '@/state/users/usersSlice';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  invariant(authContext, 'useAuth must be used within an AuthProvider');

  return authContext;
};

export const AuthProvider = ({ children }) => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [token, setToken] = useState(undefined);
  const [userId, setUserId] = useState(undefined);

  // Provides easy access to user object
  const user = users[userId];

  const setUser = useCallback((user) => {
    if (user) {
      dispatch(addUser(user));
      setUserId(user.id);
    } else {
      setUserId(null);
    }
  }, [dispatch])

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const { data } = await api.get('/api/me');
        setToken(data.accessToken);
        setUser(data.user);
      } catch {
        setToken(null);
        setUser(null);
      }
    };
    fetchMe();
  }, [setUser]);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.message === 'Unauthorized'
        ) {
          try {
            const { data } = await api.get('/api/refreshToken');

            setToken(data.accessToken);
            setUser(data.user);8

            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setToken(null);
            setUser(null);
            // If refresh token fails, we can log out the user or redirect to login
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [setUser, token]);

  return (
    <AuthContext.Provider value={{ token, setToken, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
