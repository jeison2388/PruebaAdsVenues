import axios from 'axios';
import {GET_USUARIOS} from '../../../assets/constantesApp'


const getUsuarios = () =>{
  return axios.get(GET_USUARIOS)
}

export {getUsuarios}
