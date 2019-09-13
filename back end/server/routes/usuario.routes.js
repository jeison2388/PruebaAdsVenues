var express          = require('express');
var router           = express.Router();
var models           = require('../models');

router.get('/listaUsuarios',(req, res)=>{
    let getListadoUsuarios = models.usuario.findAll({})
    Promise.all(
        [getListadoUsuarios]
    ).then(([usuarios]) => {
        return res.send(usuarios)
    }).catch(error =>{
        return res.status(400).send({error: 'No se pueden obtener los usuarios'})
    })
})

router.post('/eliminarAmistad',(req, res)=>{
    const usuarioId = req.body.usuarioId
    const usuarioQueMeSigueId = req.body.usuarioQueMeSigueId
    const condicion = {
        where:{
            seguidor: usuarioId,
            seguido: usuarioQueMeSigueId
        }
    }

    Promise.all([
        models.usuario.findByPk(usuarioId),
        models.usuario.findByPk(usuarioQueMeSigueId)
    ]).then(([seguidor, seguido]) =>{
        if(seguidor && seguido){
           return  models.seguidores.findOne(condicion)
        }
        if(!seguidor)
            return Promise.reject({error: 'El usuario a quien siguen no existe '})
        if(!seguido)
            return Promise.reject({error: 'El usuario a que me sigue no existe'})
    })
    .then(amistad =>{
        if(amistad){
            return  models.seguidores.destroy(condicion)
        } 
        return Promise.reject({error: 'no hay seguidores para ese usuario'})
    }).then (result =>{
        console.log('si elimine loco : '+ result)
    })
    .catch (error =>{
        console.log( error)
    })
})

router.post('/seguirUsuario',(req, res)=>{
    const usuarioId = req.body.usuarioId
    const usuarioAseguirId = req.body.usuarioAseguirId

    Promise.all([
        models.usuario.findByPk(usuarioId),
        models.usuario.findByPk(usuarioAseguirId)
    ]).then(([seguidor, seguido]) =>{
        if(seguidor && seguido)
            return models.seguidores.create({
                seguidor: usuarioId,
                seguido: usuarioAseguirId
            })
        if(!seguidor)
            return Promise.reject({error: 'El seguidor no existe '})
        return Promise.reject({error: 'El usuario a seguir no existe'})
    }).then(result =>{
        res.send(result)
    })
    .catch(errror =>{
        console.log(errror)
        res.status(400).send({error: 'No fue posible crear el seguidor'})
    })
})

router.post('/eliminarUsuarioQueMeSigue',(req, res)=>{

})

module.exports = router;