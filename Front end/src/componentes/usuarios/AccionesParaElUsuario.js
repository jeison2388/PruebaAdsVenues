import React, { Component } from 'react';
import AQuienSigueElUsuario from './AQuienSigueElUsuario'
import QuienSigueAlUsuario from './QuienSigueAlUsuario'
import NuevosAmigos from './NuevosAmigos'
import { Card, Button, ButtonToolbar, ButtonGroup, Row, Col, CardBody } from 'reactstrap';

class AccionesParaElUsuario extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mostrarTabUno : true,
      mostrarTabDos : false,
      mostrarTabTres : false
    }
  }

  cambiarDeVista = (idVista) =>{
    switch (idVista) {
      case 1:
        this.setState({mostrarTabUno: true, mostrarTabDos : false,mostrarTabTres : false})
        break;
      case 2:
        this.setState({mostrarTabUno: false, mostrarTabDos : true,mostrarTabTres : false})
        break;
      case 3:
        this.setState({mostrarTabUno: false, mostrarTabDos : false,mostrarTabTres : true})
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <Row className="justify-content-center">
          <Col xs="12" md="9" lg="12" >
            <Card body outline >
              <CardBody >
              <ButtonToolbar>
              <ButtonGroup>
                <Button color='danger'>Acciones</Button>

                <Button color="secondary" onClick={() => this.cambiarDeVista(1)}>A Quien Sigue</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button color="secondary" onClick={() => this.cambiarDeVista(2)}>Quien lo Sigue</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button color="secondary" onClick={() => this.cambiarDeVista(3)}>Nuevos Amigos</Button>
              </ButtonGroup>
              </ButtonToolbar>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {this.state.mostrarTabUno ?
          <AQuienSigueElUsuario></AQuienSigueElUsuario>: null
        }
        {this.state.mostrarTabDos ?
          <QuienSigueAlUsuario></QuienSigueAlUsuario>:null
        }
        {this.state.mostrarTabTres ?
         <NuevosAmigos></NuevosAmigos>: null
        }


      </div>
    );
  }
}

export default AccionesParaElUsuario;
