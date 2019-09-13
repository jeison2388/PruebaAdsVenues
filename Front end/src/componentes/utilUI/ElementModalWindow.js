import React  from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ElementModalWindow = (props) =>  {

    return (
      <div>
        <Modal isOpen={props.show} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={props.closeModalWindows} className={props.className} size='lg'>
          <ModalHeader toggle={props.closeModalWindows} > <strong>{props.tittle}</strong> </ModalHeader>
          <ModalBody>
            {props.body}
          </ModalBody>
          <ModalFooter>
            {props.footer}
          </ModalFooter>
        </Modal>
      </div>
    );
  }

export default ElementModalWindow;
