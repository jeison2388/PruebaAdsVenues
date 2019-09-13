import React  from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ElementModalConfirmAction = (props) =>  {

    return (
      <div>
        <Modal isOpen={props.show} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={props.closeModalWindows} className={props.className} size='lg'>
          <ModalHeader toggle={props.closeModalWindows} > <strong>{props.tittle}</strong> </ModalHeader>
          <ModalBody>
            {props.body}
          </ModalBody>
          <ModalFooter>

          <Button color="primary" onClick={props.toAccept}>Estoy seguro</Button>
          <Button color="secondary" onClick={props.closeModalWindows}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

export default ElementModalConfirmAction;
