import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import './style.scss';
import { Menu, MenuItem } from '@mui/material';
import { ClientsContext } from '../../../contexts/ClientsContext';
import CreateModal from '../Modals/CreateModal';

const Header = () => {
  const { logout, user } = useContext(AuthContext);
  const { clients } = useContext(ClientsContext);

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const [showCreate, setShowCreate] = useState<boolean>(false);

  const handleShowCreate = () => {
    setShowCreate(true);
    setAnchorEl(false);
  };

  return (
    <header className="header bg-white shadow-sm mb-1 d-flex align-items-center justify-content-end p-5">
      <div
        className="user-container"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <span className="m-2 purple-color-text">
          {user?.dataValues?.username}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-person purple-color-text"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
        </svg>
      </div>
      <Menu
        id="basic-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        className="mt-2 menu"
      >
        <div className="d-flex flex-column px-3 py-2 border-bottom">
          <span className="purple-color-text">
            Usuário: {user?.dataValues?.username}
          </span>
          <span className="purple-color-text">ID: {user?.dataValues?.id}</span>
          <span className="purple-color-text">
            Nível de acesso: {user?.dataValues?.access_level}
          </span>
          <span className="purple-color-text">Clientes: {clients?.length}</span>
        </div>
        <MenuItem onClick={handleShowCreate}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-person-plus purple-color-text"
            viewBox="0 0 16 16"
          >
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            <path
              fillRule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
            />
          </svg>
          <span className="mx-2 mt-2 purple-color-text">
            Cadastrar novo cliente
          </span>
        </MenuItem>
        <MenuItem onClick={logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-box-arrow-right purple-color-text"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
            />
          </svg>
          <span className="mx-2 mt-2 purple-color-text">Sair</span>
        </MenuItem>
      </Menu>
      {showCreate && (
        <CreateModal showCreate={showCreate} setShowCreate={setShowCreate} />
      )}
    </header>
  );
};

export default Header;
