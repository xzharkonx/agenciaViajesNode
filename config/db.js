// Todo esto es lo que requerimos de Sequelize para conectar con mysql.
import Sequelize from "sequelize";

// Importamos la librería dotenv para las variables de entorno
// import dotenv from 'dotenv'
// Importamos dotenv pero ahora con la configuración para ahorrarnos config()
import dotenv from 'dotenv/config'

// Configuramos dotenv, con esto leera el archivo .env
// dotenv.config();
// pero al importar con dotenv con /config ya no es necesaria la línea de arriba.

// Mostramos la variable de entorno, requerimos detener e iniciar el servidor.
// console.log(process.env.DB_HOST);

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;
// BD, user, pass
const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql', // También Sequelize es compatible con postgresql
    define: {
        timestamps: false // Se pone false porque este tiene a poner
    }, // un par de columnas de cuando fue agregado o actualizado un registro.
    pool: { // Está es configuración de Sequelize
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false

});

export default db;