import axios from 'axios';
import {GET_USUARIOS, GET_A_QUIEN_SIGO, GET_QUIEN_ME_SIGUE,
        DELETE_AMISTAD, AMISTADES, SEGUIR_USUARIO} from '../../../assets/constantesApp'


const getUsuarios = () =>{
  return axios.get(GET_USUARIOS)
}

const getAmistades = ()=>{
  return axios.get(AMISTADES)
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

const seguirUsuario = (usuarioId, idASeguir) =>{
  return axios.post (SEGUIR_USUARIO,{
    usuarioId : usuarioId,
    usuarioAseguirId : idASeguir
  })
}


export {getUsuarios, getAquienSigo, getQuienMeSigue, deleteAmistad, getAmistades, seguirUsuario}
