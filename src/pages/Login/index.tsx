import { Snackbar, Alert } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './style.scss';

const Login = () => {
  const { login, clearStorage, authError, setAuthError } =
    useContext(AuthContext);

  const [user, setUser] = useState<string>('');

  const clearError = () => {
    setAuthError({ error: false, message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
    clearError();
  };
  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(user);
  };

  useEffect(() => {
    clearStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="vw-100 vh-100  d-flex justify-content-center align-items-center bg-login">
      <div className="d-flex bg-white shadow-sm rounded login-container">
        <div className="col-12 col-lg-6 mt-5">
          <form
            className="align-items-center d-flex flex-column w-100 p-3 pt-1"
            onSubmit={(e) => handleSubmitLogin(e)}
          >
            <div className="content-logo mt-5 mb-5">
              <img
                className="login-img img-fluid"
                src="/images/login.png"
                alt="Logo"
              />
            </div>
            <input
              className="login-input mb-5 mt-5 w-75 p-2"
              maxLength={70}
              type="text"
              id="user"
              name="user"
              autoComplete="username"
              placeholder="Usuário"
              required
              onChange={(e) => handleChange(e)}
            />
            <button className="btn-login mt-4 w-75" type="submit">
              Log In
            </button>
          </form>
        </div>
        <figure className="logo-container col-lg-6">
          <img src="/images/login.svg" alt="foto de sessão de massagem" />
        </figure>
        <Snackbar
          open={authError.error}
          autoHideDuration={5000}
          onClose={clearError}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={clearError}
            severity="error"
            sx={{
              width: '100%',
              background: 'rgb(211, 47, 47)',
              color: 'white',
            }}
          >
            <span>{authError.message}</span>
          </Alert>
        </Snackbar>
      </div>
    </section>
  );
};

export default Login;
