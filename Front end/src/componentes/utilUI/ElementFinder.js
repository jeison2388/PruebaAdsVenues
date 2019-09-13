import React from 'react';
import { Col,InputGroup,InputGroupAddon,Input } from 'reactstrap';

const ElementFinder = (props) =>
{
  return(
    <Col xs="8" md="5" lg="8">
    <InputGroup>
          <Input placeholder={props.placeholder} autoFocus onChange={(event) => props.filterList(event)}></Input>
          <InputGroupAddon addonType="append" >Buscar</InputGroupAddon>
    </InputGroup>
  </Col>
  );
}

export default ElementFinder
