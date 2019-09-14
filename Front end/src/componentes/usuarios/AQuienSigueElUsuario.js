import React, { Component } from 'react';

import ElementTable from '../utilUI/ElementTable'
import ElementFinder from '../utilUI/ElementFinder'
import ElementLoading from '../utilUI/ElementLoading'
import ElementModalWindow from '../utilUI/ElementModalWindow'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue} from '@material-ui/core/colors';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Row, Col, Card, CardBody, Button,Alert,Badge } from 'reactstrap';
import {filtrarAQuienSigo} from './utils/utilUser'
import {connect} from 'react-redux';
import {getAquienSigo, deleteAmistad} from './utils/servicioConexion'

const theme = createMuiTheme({

  palette: {
    primary:blue,
  },
});

const placeholderFind = "Buscar por nombre"
const headerTittleTable = ['Nombre usuario que me sigue',  'Acciones']

class AQuienSigueElUsuario extends Component {

  constructor(props)
  {
    super(props);

    const objeckKey = Object.keys(this.props.usuarioReducer)
    if(objeckKey.length === 0)
      {
        this.redirectTo('/usuarios/listaUsuarios')
        this.state ={  rows: [],
          page: 0,
          rowsPerPage: 10,}
      }else{
        this.state = {
          showModal: false,
          msjShowModal:'',
          tittleShowModal: '',
          existenUsuarios: true,
          mostrarTabla: false,
          rows: [],
          temporaryRows: [],
          page: 0,
          rowsPerPage: 10,
          mostrarCargando: true
        }
      }
  }

  componentDidMount()
  {
    this.obtenerUsuariosQueSigo()
  }


  obtenerUsuariosQueSigo = () =>{
    this.mostrarCargando(true)
    getAquienSigo(this.props.idUsuario)
    .then(usuarios =>{
      const cantResult = usuarios.data.length
      if(cantResult === 0 ){
        this.setState({existenUsuarios: false, mostrarTabla: false, mostrarCargando: false})}
        else{
        this.setState({mostrarTabla: true,existenUsuarios: true, rows:usuarios.data, temporaryRows:usuarios.data, mostrarCargando: false})
        }

    }).catch(error =>{
      this.setState({msjShowModal: ' Error al obtener informacaion de los usuarios, revise su conexión a internet, si el problema persiste comuniquese con el personal encargado',
      tittleShowModal:'Error al obetner la informacion de los usuarios', mostrarCargando: false},this.showModal(true))
    })
  }

  showModal = (state) =>
  {
    this.setState({showModal: state})
  }
  mostrarCargando = (state) =>{
    this.setState({mostrarCargando: state})
  }

  eliminarAmistad = (idSeguidor) =>{
    this.mostrarCargando(true)
    deleteAmistad(this.props.idUsuario , idSeguidor)
    .then(result =>{
          this.obtenerUsuariosQueSigo()
          this.setState({mostrarCargando: false})
    },error => {
        this.setState({msjShowModal: ' Error al eliminar amistad, revise su conexión a internet, si el problema persiste comuniquese con el personal encargado',
        tittleShowModal:'Error al eliminar amistad', mostrarCargando: false},this.showModal(true))
    })
  }

  filtrarLista = (event) =>
  {
    if(event.target.value.length === 0)
    {
      this.setState({rows: this.state.temporaryRows})
    }else
    {
    let updateList = this.state.temporaryRows;
    updateList = updateList.filter((item) =>
    {
      return filtrarAQuienSigo(item, event.target.value)
    })
    this.setState({rows: updateList})
    }
  }


  redirectTo = (path) =>
  {
    this.props.redirectTo(path)
  }

  handleChangePage = (page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value)});
  };

  render() {
      const { rows, rowsPerPage, page } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <div>
      <Row className="justify-content-center">
      <Col  xs="12" md="9" lg="12" >
        <Card  body outline >
          <CardBody >
          <h1 className="title text-center"> <strong>A QUIEN SIGUE {this.props.nombreUsuario} </strong> </h1><br></br>
          <MuiThemeProvider theme={theme}>
          <Row>

          <ElementFinder filterList = {(event) => this.filtrarLista(event)}
          placeholder = {placeholderFind}></ElementFinder>
          </Row>
          {this.state.mostrarCargando?
            <ElementLoading tittle="realizando accion espera por favor"></ElementLoading>:
            null
          }

          {!this.state.existenUsuarios?
            <h3><Badge color="success">No se encontraron usuarios a quien siga</Badge></h3> : null
          }

          {this.state.mostrarTabla?
          <ElementTable state = {this.state} headerTittleTable = {headerTittleTable}
          handleChangePage = {(event) => this.handleChangePage(event)} handleChangeRowsPerPage={(page) => this.handleChangeRowsPerPage(page)}
          rows = {
                  <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                      <TableRow key={row.id}>
                        <TableCell align="left" component="th" scope="row">{row.a_quien_sigue.nombreUsuario}</TableCell>
                        <TableCell align="left">
                                    <Button outline color="danger" size="sm" onClick={() => this.eliminarAmistad(row.a_quien_sigue.idUsuario)}>Eliminar Amistad</Button>

                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                    }/>:null }
            </MuiThemeProvider>
          </CardBody>
        </Card>
      </Col>
    </Row>

    <ElementModalWindow body={ <Alert color="danger">
    {this.state.msjShowModal}
   </Alert> }
     tittle ={this.state.tittleShowModal}
     show = {this.state.showModal}
     closeModalWindows={()=>this.showModal()}></ElementModalWindow>
      </div>
    )
  }
}

const mapStateToProps = (state) =>
  {
    return {
      idUsuario: state.usuarioReducer.idUsuario,
      nombreUsuario: state.usuarioReducer.nombreUsuario,
      usuarioReducer : state.usuarioReducer
    };
}

const mapDispatchToProps =
  {

  };

export default  connect(mapStateToProps,mapDispatchToProps)(AQuienSigueElUsuario);
