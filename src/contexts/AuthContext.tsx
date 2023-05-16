import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services';
import jwt from 'jwt-decode';
import {
  IAuthContext,
  IAuthError,
  IChild,
  IDataValues,
  IUserResponse,
} from '../interfaces/Interfaces';

export const AuthContext = createContext<IAuthContext>({
  authenticated: false,
  user: null,
  loadingPage: false,
  login: () => undefined,
  logout: () => undefined,
  clearStorage: () => undefined,
  authError: { error: false, message: '' },
  setAuthError: () => undefined,
});

export const AuthProvider = ({ children }: IChild) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<IDataValues | null>(null);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [authError, setAuthError] = useState<IAuthError>({
    error: false,
    message: '',
  });

  useEffect(() => {
    const recoveredToken = localStorage.getItem('token');
    if (recoveredToken) {
      const recoveredUser = jwt<any>(recoveredToken);
      api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;
      setUser(recoveredUser);
    }
    setLoadingPage(false);
  }, []);

  const login = async (user: string) => {
    await api
      .post('/auth', { user })
      .then((res: IUserResponse) => {
        const token = res.data.token;
        const loggedUser = jwt<any>(token);
        localStorage.setItem('token', token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(loggedUser);
        navigate('/');
      })
      .catch(() => {
        setAuthError({ error: true, message: 'Ocorreu um Erro!' });
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = null;
    setUser(null);
    navigate('/login');
  };

  const clearStorage = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loadingPage,
        login,
        logout,
        clearStorage,
        authError,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
