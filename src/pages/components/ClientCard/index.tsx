import { Menu, MenuItem} from '@mui/material';
import React, { useContext, useState } from 'react';
import { ClientsContext } from '../../../contexts/ClientsContext';
import DeleteModal from '../Modals/DeleteModal';
import UpdateModal from '../Modals/UpdateModal';
import './style.scss';

const ClientsCard = ({ client }: any) => {
  const { deleteClients, updateClients, recoveryClient } =
    useContext(ClientsContext);

  const [detailsCard, setDetailsCard] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<any>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const [selectedClient, setSelectedClient] = useState<string>('');

  const handleDelete = () => {
    deleteClients(client.id);
    setShowDelete(false);
  };
  const handleShowDelete = () => {
    setShowDelete(true);
    setAnchorEl(false);
  };

  const handleUpdate = (
    name: string,
    email: string,
    phone: string,
    address: string,
    postalcode: string,
    access: string
  ) => {
    updateClients(client.id, name, email, phone, address, postalcode, access);
    setShowUpdate(false);
  };
  const handleShowUpdate = (id: string) => {
    setSelectedClient(id);
    setShowUpdate(true);
    setAnchorEl(false);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="bg-white border rounded mb-3 w-75">
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="p-4 container-card w-100"
            onClick={() => setDetailsCard(!detailsCard)}
          >
            <span className="m-2">ID: {client.id}</span>
            <span className="m-2 purple-color-text">{client.name}</span>
          </div>
          <div className="p-4" onClick={(e) => setAnchorEl(e.currentTarget)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-three-dots purple-color-text"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          </div>
        </div>
        {detailsCard && (
          <div className="border-top p-4 ml-5 d-flex flex-column">
            <div className="p-1">
              <label className="purple-color-text">E-mail: </label>
              <span className="m-2">{client.email}</span>
            </div>
            <div className="p-1">
              <label className="purple-color-text">Phone: </label>
              <span className="m-2">{client.phone}</span>
            </div>
            <div className="p-1">
              <label className="purple-color-text">Código Postal:</label>
              <span className="m-2">{client.postalcode}</span>
            </div>
            <div className="p-1">
              <label className="purple-color-text">Endereço: </label>
              <span className="m-2">{client.address}</span>
            </div>
            <div className="p-1">
              <label className="purple-color-text">Nível de Acesso: </label>
              <span className="m-2">{client.access_level}</span>
            </div>
          </div>
        )}
      </div>
      <Menu
        id="basic-menu"
        open={open}
        onClose={() => setAnchorEl(false)}
        anchorEl={anchorEl}
        className="menu-card text-center"
      >
        <span></span>
        <MenuItem onClick={() => handleShowUpdate(client.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-pencil purple-color-text"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
          <span className="mx-2 purple-color-text">Editar</span>
        </MenuItem>
        <MenuItem onClick={handleShowDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-trash purple-color-text"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
          <span className="mx-2 purple-color-text">Excluir</span>
        </MenuItem>
      </Menu>
      {showDelete && (
        <DeleteModal
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          handleDelete={handleDelete}
        />
      )}
      {showUpdate && (
        <UpdateModal
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          handleUpdate={handleUpdate}
          selectedClient={selectedClient}
        />
      )}
    </div>
  );
};

export default ClientsCard;
