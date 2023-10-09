// Controllers de la app
// DOCUMENTACIÓN SEQUELIZE.
// URL: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-insert-queries
import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {


    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));

    // Consultar 3 viajes del modelo Viaje

    try {

        // Uno por uno.
        // const viajes = await Viaje.findAll({limit: 3});
        // const testimoniales = await Testimonial.findAll({limit: 3});

        // Ambas consultas a la vez.
        const resultado = await Promise.all(promiseDB);

        res.render('inicio',{
            pagina:'Inicio',
            clase: 'home', // Le pasamos el nombre de está clase de css para cambiar el estilo.
            viajes: resultado[0],
            testimoniales: resultado[1]
        });    
    } catch (error) {
        console.log(error);
    }

    
};

const paginaNosotros = (req,res) => {
    res.render('nosotros',{
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req,res) => {

    // Consultar DB.
    const viajes = await Viaje.findAll();

    // Mostrar en consola lo que se está ejecutando.
    // No se mostrará en el navegador si no aquí con nodemon que es
    // donde se ejecuta.
    console.log(viajes);
    // Ver la cantidad de datos traida.
    console.log(`size: ${viajes.length}`);


    res.render('viajes',{
        pagina: 'Próximos Viajes',
        viajes
    });
};

const paginaTestimoniales = async (req,res) => {
    
    try {

        // Consultamos el modelo de testimoniales
        // con findAll() siempre nos va aretornar un arreglo de objetos
        // del modelo y con findOne() solo un objeto.
        const testimoniales = await Testimonial.findAll();
        
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }

};

// Muestra un viaje por su slug
// Agregamos async y await porque traeremos datos
// de la base de datos.
const paginaDetalleViaje = async (req, res) => {

    // Recuerda que en el request va la petición
    // y con ella la info que estamos mandando
    // en los params, solo buscamos el comodín que le
    // hemos asignado en este caso /:viaje => 'viaje'.
    console.log(req.params);
    console.log(req.params.slug);

    const { slug } = req.params;

    try {
        // Con findOne para encontrar 1 elemento.
        // SELECT * FROM WHERE 
        const viaje = await Viaje.findOne({where: {slug}});

        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })

    } catch (error) {
        console.log(error);
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}