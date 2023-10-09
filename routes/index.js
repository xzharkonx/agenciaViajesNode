import express from 'express';

// Desta forma utilizaremos su Router para las rutas
const router = express.Router();

// Exportamos los controllers

import { 
    paginaInicio, 
    paginaNosotros, 
    paginaViajes, 
    paginaTestimoniales, 
    paginaDetalleViaje 
} from '../controllers/paginasController.js';

import {
    guardarTestimonial
} from '../controllers/testimonialController.js'

// - req: lo que enviamos a la página.
// - res: lo que recibimos de express.
// router.get('/', (req, res) => {

    // - Text
    // res.send('Hola Mundo');
    // res.send('Inicio');

    // - JSON
    // res.json({
    //     id: 1
    // })

    // - Vistas
    // res.render('inicio')
// });



// router.get('/nosotros', (req, res) =>{
    
//     const viajes = 'Viaje a Alemania';
//     const comidas = 'Tacos';
    
//     // Va a escanear y buscar el archivo de la vista con la extensión .pug
//     res.render('nosotros', {
//         viajes,
//         comidas
//     });
// });

// router.get('/contacto', (req, res) =>{
    //     res.send('Contacto');
    // })
    
router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros);
router.get('/viajes', paginaViajes);
router.get('/testimoniales', paginaTestimoniales);

router.post('/testimoniales', guardarTestimonial);

// Para hacer rutas dinamicas utilizaremos un comodín /:viaje
// el cual recibe la información desde la vista viajes.pug
// en un enlace con una variable dinamica.
// Aquí atrapamos la información mediante el comodín 
// y le podemos dar cualquier nombre para buscarlo en el controller,
// Luego va a cargar un método del controlador el cual va a recibir la info en
// el 'req.params' con el nombre que le hayamos puesto 'req.params.viaje' 
// ahora /:viaje la podemos atrapar como 'viaje' en nuestros params del controller
// para saber como cambiar la página dinamicamente según la selección.
router.get('/viajes/:slug', paginaDetalleViaje);



export default router;