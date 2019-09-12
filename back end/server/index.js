const express            = require('express');
var app                  = express();
var bodyParser           = require('body-parser');
var models               = require('./models');
var usuarioRoutes           = require('./routes/usuario.routes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: 1048576}));
app.use((req, res, next) => {
	res.removeHeader("X-Powered-By");
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Length, Accept, Content-Type');
	if ('OPTIONS' === req.method) {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.send();
	}
	next();
});

app.use('/form', usuarioRoutes)

//Sync with models
models.sequelize.sync({force: true});

//Start the server
var port = process.env.PORT || 1337;
app.listen(port);


module.exports = app;