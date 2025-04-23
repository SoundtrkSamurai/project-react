import invariant from 'invariant';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  invariant(authContext, 'useAuth must be used within an AuthProvider');

  return authContext;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
