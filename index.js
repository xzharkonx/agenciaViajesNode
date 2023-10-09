// * Express es como Apache o algo similar y vamos a configurarlo en este archivo.
// const express = require('express'); // Version antigua de common js

// Versión actual Module
// Debes agregar "type":"module" al package.json
import express from 'express';
// En la nueva versión de los import debes colocar la extensión para los archivos
import router from './routes/index.js'
// Importamos la configuración de Sequelize para conectar con mysql.
import db from './config/db.js'

const app = express();

// * Conectar a la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

// ? Variables de entorno.
// Esta asigna el puerto automaticamente.
// process.env.PORT
// Pero como estamos en local se imprimira el 4000,
// porque en la primera aún no nos encontramos en un servidor de producción.

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
// view engine es algo que soporta express
// y queremos usar el template engine de pug.
app.set('view engine', 'pug');

// Obtener el año actual
app.use((req, res, next) => {
    // Al mostrar el response se detiene la carga del middleware.
    // console.log(res);
    // res.locals.unaVariable="HolaMundo"; // Enviar variable: unaVariable
    // span=unaVariable // Recoger el valor de la variable en PUG.

    // Enviamos la fecha.
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';

    // Por lo que existe next para ir al siguiente (que es el de abajo).
    // next();
    // Pero aveces no funciona muy bien así que para asegurarnos
    // lo retornamos
    return next();
});

// Agregar body parser para leer los datos del formulario.
// Con esto rellenara el objeto de body con la info del formulario.
app.use(express.urlencoded({extended:true}));


// Definir la carpeta publica, por lo que
// le indicamos el nombre de la carpeta que hemos creado.
app.use(express.static('public'));

// Agregar Router
// app.use() Soporta app.get() app.post() app.delete() app.put() app.patch()...
// todos los vervos que hay, entonces desde la prágina principal agrega las rutas.    
app.use('/', router);


app.listen(port, ()=>{
    console.log(`El Servidor esta funcionando en el puerto ${port}`);
});