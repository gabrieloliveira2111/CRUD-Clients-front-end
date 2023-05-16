import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../../../../contexts/AuthContext';
import { ClientsContext } from '../../../../contexts/ClientsContext';
import InputMask from 'react-input-mask';

const CreateModal = ({ showCreate, setShowCreate }: any) => {
  const { createClients } = useContext(ClientsContext);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createClients(
      user?.dataValues?.access_level,
      name,
      email,
      phone,
      address,
      postalCode
    );
    setShowCreate(false);
  };

  return (
    <Modal show={showCreate} onHide={() => setShowCreate(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="purple-color-text">
          Cadastro de Cliente
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
              className="form-modal-input"
              value={name}
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
              className="form-modal-input"
              value={email}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Fechar
          </Button>
          <Button type="submit" className="btn-submit">
            Cadastrar cliente
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateModal;
