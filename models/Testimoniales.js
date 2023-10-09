import Sequelize from 'sequelize';
import db from '../config/db.js';

// * Sería bueno hecharle un vistazo a la documentación de Squelize
// * para ver más información acerca de la creación de los modelos.
// Definimos el nombre de la tabla del cuál traerá la info para el modelo.
// ! El id se da por default
// le pasaremos un objeto con los mismos campos de la tabla.

// Lo exportamos aquí para poder importarlo en el controlador
// para hacer la consulta.
export const Testimonial = db.define('testimoniales',{
    nombre: {
        // Le pasamos el tipo de dato que va a tener.
        // También cuantos caracteres va a utilizar.
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: { // Usualmente usuarioas text pero aquí se maneja también STRING. 
        type: Sequelize.STRING
    }
});