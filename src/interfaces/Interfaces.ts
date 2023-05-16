export interface IAuthError {
  error: boolean;
  message: string;
}
export interface IChild {
  children: React.ReactNode;
}
export interface IData {
  token: string;
}
export interface IUserResponse {
  data: IData;
}
export interface IDataError {
  message: string;
}
export interface IResponseError {
  data: IDataError;
  status: number;
}
export interface IError {
  response: IResponseError;
}
export interface IDataValues {
  dataValues: IUser;
}
export interface IUser {
  username: string;
  id: number;
  access_level: number;
}
export interface IAuthContext {
  authenticated: boolean;
  user: IDataValues | null;
  loadingPage: boolean;
  authError: IAuthError;
  setAuthError: (error: IAuthError) => void;
  login: (user: string) => void;
  logout: () => void;
  clearStorage: () => void;
}

export interface IShowSnack {
  show: boolean;
  message: string;
}

export interface IClients {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  postalcode: string;
  access: number;
}

export interface IClientsContext {
  getClients: () => void;
  clients: IClients[];
  setClients: () => void;
  deleteClients: () => void;
  handleSnackError: () => void;
  handleSnackSuccess: () => void;
  resetSnacks: () => void;
  reload: boolean;
  updateClients: () => void;
  recoveryClient: () => void;
  editUser: IClients[];
  createClients: () => void;
}

export interface IDeleteProps {
  showDelete: boolean;
  setShowDelete: (boolean: boolean) => void;
  handleDelete: () => void;
}

export interface IUpdateProps {
  showUpdate: boolean;
  setShowUpdate: (boolean: boolean) => void;
  handleUpdate: (
    name: string,
    email: string,
    phone: string,
    address: string,
    postalCode: string,
    access: string
  ) => void;
  selectedClient: string;
}
