import axios from 'axios';
import {GET_USUARIOS, GET_A_QUIEN_SIGO, GET_QUIEN_ME_SIGUE,
        DELETE_AMISTAD} from '../../../assets/constantesApp'


const getUsuarios = () =>{
  return axios.get(GET_USUARIOS)
}

const getAquienSigo = (idUsuario) =>{
  return axios.post(GET_A_QUIEN_SIGO, {usuarioId: idUsuario})
}

const getQuienMeSigue = (idUsuario) =>{
  return axios.post(GET_QUIEN_ME_SIGUE,{usuarioId: idUsuario})
}

const deleteAmistad = (usuarioId, idSeguidor) =>{
  return axios.post(DELETE_AMISTAD,
                    {
                      usuarioId: usuarioId,
                      usuarioQueMeSigueOSigoId : idSeguidor
                    })
}

export {getUsuarios, getAquienSigo, getQuienMeSigue, deleteAmistad}
