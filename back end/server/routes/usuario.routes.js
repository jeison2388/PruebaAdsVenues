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

/*router.post('/eliminarSeguidor',(requ, res)=>{
    const seguidorId = req.body.seguidorId
    const seguidoId = req.body.seguidoId
    const condicion = {
        where:{
            seguidor: seguidorId,
            seguido: seguidoId
        }
    }

    models.seguidores.findOne(condicion).then((seguidores)=>{
        if(seguidores){
           return  models.usuario.destroy({
                seguidor: seguidorId,
            seguido: seguidoId
            })
        }
        return Promise.reject({error: 'no hay seguidores para ese usuario'})
    }).then(result =>{
        res.send()
    }).catch(errror =>{
        res.status(400).send(errror)
    })
})

router.post('/crearSeguidor',(req, res)=>{
    const seguidorId = req.body.seguidorId
    const seguidoId = req.body.seguidoId

    Promise.all([
        models.usuario.findByPk(seguidorId),
        models.usuario.findByPk(seguidoId)
    ]).then(([seguidor, seguido]) =>{
        if(seguidor && seguido)
            return models.seguidores.create({
                seguidor: seguidorId,
                seguido: seguidoId
            })
        if(!seguidor)
            return Promise.reject({error: 'El seguidor no existe '})
        return Promise.reject({error: 'el seguido no existe'})
    }).then(result =>{
        res.send(result)
    })
    .catch(errror =>{
        res.status(400).send(errror)
    })
})*/

module.exports = router;