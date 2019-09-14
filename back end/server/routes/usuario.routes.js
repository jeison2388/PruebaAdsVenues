let express          = require('express');
let router           = express.Router();
let models           = require('../models');

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
    const usuarioQueMeSigueOSigoId = req.body.usuarioQueMeSigueOSigoId
    const condicion = {
        where:{
            seguidor: usuarioId,
            seguido: usuarioQueMeSigueOSigoId
        }
    }

    Promise.all([
        models.usuario.findByPk(usuarioId),
        models.usuario.findByPk(usuarioQueMeSigueOSigoId)
    ]).then(([seguidor, seguido]) =>{
        if(seguidor && seguido){
           return  models.seguidores.findOne(condicion)
        }
        if(!seguidor)
            return Promise.reject({error: 'El usuario a quien siguen no existe '})
        if(!seguido)
            return Promise.reject({error: 'El usuario que me sigue no existe'})
    })
    .then(amistad =>{
        if(amistad){
            return  models.seguidores.destroy(condicion)
        } else{
            return Promise.reject({error: 'no hay seguidores para ese usuario'})
        }
       
    }).then (result =>{
        res.sendStatus(result)
    })
    .catch (error =>{
        res.status(200).send(error)
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
        res.status(400).send({error: 'No fue posible crear el seguidor'})
    })
})

router.post('/aQuienSigo',(req, res)=>{
    const usuarioId = req.body.usuarioId
    condicion = {
        where :{
            seguidor : usuarioId
        },
        include : [
            {
                model: models.usuario,
                as: 'a_quien_sigue'
            }
        ]
    }
    Promise.all([models.usuario.findByPk(usuarioId)])
    .then(([usuario]) =>{
        if(usuario)
            return models.seguidores.findAll(condicion)
        return Promise.reject({error: 'no existe el usuario en el sistema'})
    }).then(result =>{
        res.send(result)
    }).catch(error =>{
        console.log(error)
        res.status(400).send(error)
    })
})

router.post('/quienMeSigue',(req, res)=>{
    const usuarioId = req.body.usuarioId
    condicion = {
        where :{
            seguido : usuarioId
        },
        include : [
            {
                model: models.usuario,
                as: 'quien_sigue'
            }
        ]
    }
    Promise.all([models.usuario.findByPk(usuarioId)])
    .then(([usuario]) =>{
        if(usuario)
            return models.seguidores.findAll(condicion)
        return Promise.reject({error: 'no existe el usuario en el sistema'})
    }).then(result =>{
        res.send(result)
    }).catch(error =>{
        console.log(error)
        res.status(400).send(error)
    })
})

router.get('/amistades',(req, res)=>{
    let getListadoUsuarios = models.usuario.findAll(
        {
            include : [
                {
                model : models.seguidores, as: 'a_quien_sigo'     
                },
                {
                model: models.seguidores, as: 'quien_me_sigue'
                }
            ],
        }
    )
    Promise.all(
        [getListadoUsuarios]
    ).then(([usuarios]) => {
       
        arrayReturn = []
        for(let usuario of usuarios){
            let objectReturn = {}
            let quien_me_sigue = usuario.dataValues.a_quien_sigo
            let a_quien_sigo = usuario.dataValues.quien_me_sigue
            objectReturn.idUsuario = usuario.dataValues.idUsuario
            objectReturn.nombreUsuario = usuario.dataValues.nombreUsuario
            objectReturn.quien_me_sigue = quien_me_sigue
            objectReturn.a_quien_sigo = a_quien_sigo  
            arrayReturn.push(objectReturn)
        }
        return res.send(arrayReturn)
    }).catch(error =>{
        return res.status(400).send({error: 'No se pueden obtener los usuarios'})
    })
})


module.exports = router;