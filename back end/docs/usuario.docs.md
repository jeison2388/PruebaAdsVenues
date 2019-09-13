# Usuario

### GET /usuario/buscar/todos
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

En case de no obtener resultados, el json que retorna es: []

#### Error
|Status Codigo|Descripcion|
|---|---|
|`200`|Exito|
|`500`|Error interno en el servidor|

### GET /usuario/seguirUsuario
Esta peticion permite a un usuario seguir a otro 
Usted debe proveer en el body de la peticion la siguiente informacion
```json
{
    usuarioId : 20
    usuarioAseguirId : 27
}```
Si la peticion es correcta el sistema le devolvera la siguiente informacion
```json
{
    "id": 1,
    "seguidor": "20",
    "seguido": "27"
}```
#### Error
|Status Codigo|Descripcion|
|---|---|
|`200`|Exito|
|`400`|No fue posible crear el seguidor ó El seguidor no existe ó El usuario a seguir no existe|
|`500`|Error interno en el servidor|



