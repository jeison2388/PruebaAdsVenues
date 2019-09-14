# Usuario

### GET /usuario/listaUsuarios
Esta peticion retorna todos los usuarios de la red social, el json que retorna se ve acontinuacion 
```json
[
    {
        "idUsuario": 10,
        "nombreUsuario": "ALBERTO"
    },
    {
        "idUsuario": 17,
        "nombreUsuario": "ALEJANDRA"
    }
]
```

En case de no obtener resultados, el json que retorna es: []

#### Error
|Status Codigo|Descripcion|
|---|---|
|`200`|Exito|
|`500`|Error interno en el servidor|

### GET /usuario/aQuienSigo
Esta peticion permite saber a quien sigo yo como usuario
Usted debe proveer en el body de la peticion la siguiente informacion
```json
{
    usuarioId : 20
}
```
Si la peticion es correcta el sistema le devolvera la siguiente informacion
```json
[
    {
        "id": 4,
        "seguidor": 20,
        "seguido": 27,
        "a_quien_sigue": {
            "idUsuario": 27,
            "nombreUsuario": "YAISON"
        }
    },
    {
        "id": 5,
        "seguidor": 20,
        "seguido": 8,
        "a_quien_sigue": {
            "idUsuario": 8,
            "nombreUsuario": "KAREN"
        }
    }
]
```
si el usuario no sigue a nadie el sistema devolvera la siguiente informacion []
#### Error
|Status Codigo|Descripcion|
|---|---|
|`200`|Exito|
|`400`|no existe el usuario en el sistema|
|`500`|Error interno en el servidor|

### GET /usuario/quienMeSigue
Esta peticion permite saber que usuarios me siguen
Usted debe proveer en el body de la peticion la siguiente informacion
```json
{
    usuarioId : 20
}
```
Si la peticion es correcta el sistema le devolvera la siguiente informacion
```json
[
    {
        "id": 4,
        "seguidor": 20,
        "seguido": 27,
        "quien_sigue": {
            "idUsuario": 20,
            "nombreUsuario": "DAYANI"
        }
    }
]
```
si nadie sigue al usuario el sistema devolvera la siguiente informacion []
#### Error
|Status Codigo|Descripcion|
|---|---|
|`200`|Exito|
|`400`|no existe el usuario en el sistema|
|`500`|Error interno en el servidor|

### POST /usuario/eliminarAmistad
Esta peticion permite a un usuario eliminar su amistad con otro ya sea seguidor o seguido
Usted debe proveer en el body de la peticion la siguiente informacion
```json
{
    usuarioId : 20
    usuarioQueMeSigueOSigoId : 27
}
```

#### Error
|Status Codigo|Descripcion|
|---|---|
|`200`|Exito|
|`400`|No fue posible eliminar la amistad ó El usuario a quien siguen no existe ó El usuario que me sigue no existe ó no hay seguidores para ese usuario|
|`500`|Error interno en el servidor|

### POST /usuario/seguirUsuario
Esta peticion permite a un usuario seguir a otro 
Usted debe proveer en el body de la peticion la siguiente informacion
```json
{
    usuarioId : 20
    usuarioAseguirId : 27
}
```
Si la peticion es correcta el sistema le devolvera la siguiente informacion
```json
{
    "id": 1,
    "seguidor": "20",
    "seguido": "27"
}
```
#### Error
|Status Codigo|Descripcion|
|---|---|
|`200`|Exito|
|`400`|No fue posible crear el seguidor ó El seguidor no existe ó El usuario a seguir no existe|
|`500`|Error interno en el servidor|



