import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IDeleteProps } from '../../../../interfaces/Interfaces';

const DeleteModal = ({
  showDelete,
  setShowDelete,
  handleDelete,
}: IDeleteProps) => {
  return (
    <Modal
      show={showDelete}
      onHide={() => setShowDelete(false)}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>Deseja excluir esse cliente?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDelete(false)}>
          Fechar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
