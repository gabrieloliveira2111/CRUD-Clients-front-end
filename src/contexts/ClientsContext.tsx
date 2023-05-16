import { Alert, Snackbar } from '@mui/material';
import { createContext, useContext, useState } from 'react';
import { IChild, IClients, IError, IShowSnack } from '../interfaces/Interfaces';

import api from '../services';
import { AuthContext } from './AuthContext';

export const ClientsContext = createContext<any>({});

export const ClientsProvider = ({ children }: IChild) => {
  const { user } = useContext(AuthContext);

  const [clients, setClients] = useState<IClients[]>([]);
  const [success, setSuccess] = useState<IShowSnack>({
    show: false,
    message: '',
  });
  const [error, setError] = useState<IShowSnack>({ show: false, message: '' });
  const [editUser, setEditUser] = useState<IClients[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSnackSuccess = (show: boolean, message: string) => {
    setSuccess({ show: show, message: message });
  };

  const handleSnackError = (show: boolean, message: string) => {
    setError({ show: show, message: message });
  };

  const resetSnacks = () => {
    setSuccess({ show: false, message: '' });
    setError({ show: false, message: '' });
  };

  const getClients = async () => {
    setLoading(true);
    await api
      .get(`/clients/${user?.dataValues?.access_level}`)
      .then((res) => {
        setClients(res.data);
        setLoading(false);
      })
      .catch((err: IError) => {
        console.log(err);
      });
  };

  const updateClients = async (
    id_client: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    postalcode: string,
    access: number
  ) => {
    await api
      .put(`/clients/${id_client}`, {
        name,
        email,
        phone,
        address,
        postalcode,
        access,
      })
      .then(() => {
        setReload(!reload);
        handleSnackSuccess(true, 'Cliente editado com sucesso!');
      })
      .catch(() => {
        handleSnackError(true, 'Ocorreu um erro!');
      });
  };

  const deleteClients = async (id_client: number) => {
    await api
      .delete(`/clients/${id_client}`)
      .then(() => {
        setReload(!reload);
        handleSnackSuccess(true, 'Cliente excluído com sucesso!');
      })
      .catch(() => {
        handleSnackError(true, 'Ocorreu um erro!');
      });
  };

  const createClients = async (
    user_access: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    postalcode: string
  ) => {
    await api
      .post(`/clients/${user_access}`, {
        name,
        email,
        phone,
        address,
        postalcode,
      })
      .then(() => {
        setReload(!reload);
        handleSnackSuccess(true, 'Cliente criado com sucesso!');
      })
      .catch(() => {
        handleSnackError(true, 'Ocorreu um erro!');
      });
  };

  const recoveryClient = async (id_client: number) => {
    await api
      .get(`/recovery/client/${id_client}`)
      .then((res) => {
        setEditUser(res.data);
      })
      .catch((err: IError) => {
        console.log(err);
      });
  };

  return (
    <ClientsContext.Provider
      value={{
        getClients,
        clients,
        setClients,
        deleteClients,
        handleSnackError,
        handleSnackSuccess,
        resetSnacks,
        reload,
        updateClients,
        recoveryClient,
        editUser,
        createClients,
        loading,
      }}
    >
      {children}

      <Snackbar
        open={success.show}
        autoHideDuration={5000}
        onClose={resetSnacks}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={resetSnacks}
          severity="success"
          sx={{
            width: '100%',
            background: 'green',
            color: 'white',
          }}
        >
          <span>{success.message}</span>
        </Alert>
      </Snackbar>

      <Snackbar
        open={error.show}
        autoHideDuration={5000}
        onClose={resetSnacks}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={resetSnacks}
          severity="error"
          sx={{
            width: '100%',
            background: 'red',
            color: 'white',
          }}
        >
          <span>{error.message}</span>
        </Alert>
      </Snackbar>
    </ClientsContext.Provider>
  );
};
