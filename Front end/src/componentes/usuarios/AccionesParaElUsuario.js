import React, { Component } from 'react';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, ButtonToolbar, ButtonGroup, Row, Col, CardBody } from 'reactstrap';
class AccionesParaElUsuario extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1'
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

                <Button color="secondary" onClick={() => this.filterPerLevel(0)}>A Quien Sigue</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button color="secondary" onClick={() => this.filterPerLevel(1)}>Quien lo Sigue</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button color="secondary" onClick={() => this.filterPerLevel(2)}>Nuevos Amigos</Button>
              </ButtonGroup>
              </ButtonToolbar>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

export default AccionesParaElUsuario;
