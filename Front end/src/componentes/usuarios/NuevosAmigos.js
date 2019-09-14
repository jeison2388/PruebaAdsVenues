import React, { Component } from 'react';
import {getAmistades,seguirUsuario, deleteAmistad} from './utils/servicioConexion'
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
import {filtrarUsuarios} from './utils/utilUser'
import {connect} from 'react-redux';

const theme = createMuiTheme({

  palette: {
    primary:blue,
  },
});

const placeholderFind = "Buscar por nombre"
const headerTittleTable = ['Nombre usuario', 'Relacion', 'Acciones']

class NuevosAmigos extends Component {

  constructor(props)
    {
      super(props);
      const objeckKey = Object.keys(this.props.usuarioReducer)
    if(objeckKey.length === 0)
      {
        this.redirectTo('/usuarios/listaUsuarios')
        this.state ={
          rows: [],
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
      this.obtenerUsuarios()
    }

    obtenerUsuarios = () =>{
      getAmistades()
      .then(usuarios =>{
        let usuariosLista = this.eliminarMiUsuarioDeLaLista(usuarios.data)
        let usuariosListaConvertida = this.convertirLista(usuariosLista)

        const cantResult = usuarios.data.length

        if(cantResult === 0 ){
          this.setState({existenUsuarios: false, mostrarTabla: false, mostrarCargando: false})}
          else{
          this.setState({mostrarTabla: true,existenUsuarios: true, rows : usuariosListaConvertida, temporaryRows : usuariosListaConvertida, mostrarCargando: false})
          }
      }).catch(error =>{
        this.setState({msjShowModal: ' Error al obtener informacaion de los usuarios, revise su conexión a internet, si el problema persiste comuniquese con el personal encargado',
        tittleShowModal:'Error al obetner la informacion de los usuarios', mostrarCargando: false},this.showModal(true))
      })
    }

    eliminarMiUsuarioDeLaLista = (usuarios) =>{
      let usuariosRetornar =[]
      for (let usuario of usuarios)
      {
        if(this.props.idUsuario !== usuario.idUsuario){
          usuariosRetornar.push(usuario)
        }
      }
      return usuariosRetornar
    }

    handleChangePage = (page) => {
      this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
      this.setState({ page: 0, rowsPerPage: parseInt(event.target.value)});
    };

    convertirLista = (usuarios) =>{
      let usuariosRetornar = []

      for(let usuario of usuarios)
      {
        let objetoUsuario = {}
        objetoUsuario.idUsuario = usuario.idUsuario
        objetoUsuario.nombreUsuario = usuario.nombreUsuario
        let loSigo = false

        for(let usuarioQueLoSigue of usuario.quien_me_sigue){

            if(usuarioQueLoSigue.seguidor === this.props.idUsuario)
            {
              loSigo = true
            }
        }
        objetoUsuario.esAmigo = loSigo
        usuariosRetornar.push(objetoUsuario)
      }
      return usuariosRetornar
    }

    showModal = (state) =>
    {
      this.setState({showModal: state})
    }
    mostrarCargando = (state) =>{
      this.setState({mostrarCargando: state})
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
        return filtrarUsuarios(item, event.target.value)
      })
      this.setState({rows: updateList})
      }
    }

    seguirUsuario = (idASeguir) =>{
      this.mostrarCargando()
      seguirUsuario(this.props.idUsuario, idASeguir)
      .then(result =>{
          this.obtenerUsuarios()
      }).catch(error =>{
        this.setState({msjShowModal: ' Error al intnetar seguir al usuario, revise su conexión a internet, si el problema persiste comuniquese con el personal encargado',
        tittleShowModal:'Error al intnetar seguir al usuario', mostrarCargando: false},this.showModal(true))
      })
    }

    dejarDeSeguir = (idDejarSeguir) =>{
      this.mostrarCargando()
        deleteAmistad(this.props.idUsuario, idDejarSeguir)
        .then(result =>{
          this.obtenerUsuarios()
        }).catch(error =>{
          this.setState({msjShowModal: ' Error al intnetar dejar de seguir al usuario, revise su conexión a internet, si el problema persiste comuniquese con el personal encargado',
          tittleShowModal:'Error al intnetar dejar de seguir al usuario', mostrarCargando: false},this.showModal(true))
        })
    }

    render() {
      const { rows, rowsPerPage, page } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
      return (
        <div>
        <Row className="justify-content-center">
        <Col  xs="12" md="9" lg="12" >
          <Card  body outline >
            <CardBody >
            <MuiThemeProvider theme={theme}>
            <Row>
            <ElementFinder filterList = {(event) => this.filtrarLista(event)}
            placeholder = {placeholderFind}></ElementFinder>
            </Row>
            {this.state.mostrarCargando?
              <ElementLoading tittle="Buscando Datos de los usuarios"></ElementLoading>:
              null
            }

            {!this.state.existenUsuarios?
              <h3><Badge color="success">No se encontraron usuarios registrados</Badge></h3> : null
            }

            {this.state.mostrarTabla?
            <ElementTable state = {this.state} headerTittleTable = {headerTittleTable}
            handleChangePage = {(event) => this.handleChangePage(event)} handleChangeRowsPerPage={(page) => this.handleChangeRowsPerPage(page)}
            rows = {
                    <TableBody>
                      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                        <TableRow key={row.idUsuario}>
                          <TableCell align="left" component="th" scope="row">{row.nombreUsuario}</TableCell>
                          <TableCell align="left" component="th" scope="row">{row.esAmigo? 'Lo sigo':'No lo seguido'}</TableCell>
                          <TableCell align="left">
                                      {row.esAmigo?
                                        <Button outline color="danger" size="sm" onClick={() => this.dejarDeSeguir(row.idUsuario)}>Dejar de seguir</Button>:
                                        <Button outline color="success" size="sm" onClick={() => this.seguirUsuario(row.idUsuario)}>Seguir</Button>
                                      }

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
      );
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

export default  connect(mapStateToProps,mapDispatchToProps) (NuevosAmigos);
