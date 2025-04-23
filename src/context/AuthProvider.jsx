import invariant from 'invariant';
import { createContext, useContext, useEffect, useState } from 'react';

import api from '@/api';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  invariant(authContext, 'useAuth must be used within an AuthProvider');

  return authContext;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const { data } = await api.get('/me');
        setToken(data.accessToken);
      } catch {
        setToken(null);
      }
    };
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
