import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ClientsContext } from '../../../../contexts/ClientsContext';
import { IUpdateProps } from '../../../../interfaces/Interfaces';
import '../style.scss';
import InputMask from 'react-input-mask';

const UpdateModal = ({
  showUpdate,
  setShowUpdate,
  handleUpdate,
  selectedClient,
}: IUpdateProps) => {
  const { recoveryClient, editUser } = useContext(ClientsContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [access, setAccess] = useState<string>('');

  useEffect(() => {
    recoveryClient(selectedClient);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setName(editUser.user?.name);
    setEmail(editUser.user?.email);
    setPhone(editUser.user?.phone);
    setAddress(editUser.user?.address);
    setPostalCode(editUser.user?.postalcode);
    setAccess(editUser.user?.access_level);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editUser]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdate(name, email, phone, address, postalCode, access);
  };

  return (
    <Modal show={showUpdate} onHide={() => setShowUpdate(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="purple-color-text">
          Editação de Cliente
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Body>
          <div>
            <label htmlFor="nome" className="text-label-modal">
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              required
              value={name}
              className="form-modal-input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-label-modal">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              className="form-modal-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-label-modal">
              Phone:
            </label>
            <InputMask
              mask="(999) 999-9999"
              maskChar={null}
              type="text"
              id="phone"
              required
              className="form-modal-input"
              value={phone}
              onChange={(e: any) => setPhone(e.target.value)}
            ></InputMask>
          </div>
          <div>
            <label htmlFor="address" className="text-label-modal">
              Endereço:
            </label>
            <input
              type="text"
              id="address"
              required
              className="form-modal-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="postalcode" className="text-label-modal">
              Código Postal:
            </label>
            <input
              type="text"
              id="postalcode"
              required
              className="form-modal-input"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="access_level" className="text-label-modal">
              Nível de Acesso:
            </label>
            <select
              onChange={(e) => setAccess(e.target.value)}
              value={access}
              required
              className="select-modal"
            >
              {editUser.access?.map((item: any, index: number) => (
                <option key={index} value={item.value} selected>
                  {item.access_level}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdate(false)}>
            Fechar
          </Button>
          <Button type="submit" className="btn-submit">
            Alterar Cliente
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdateModal;
