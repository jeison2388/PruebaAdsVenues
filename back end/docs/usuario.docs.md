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



