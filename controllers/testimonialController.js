import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {

    // req.body será lo que el usuario coloque dentro de un formulario.
    // Al mostrarlo verás que saldrá undefined, esto es por que
    // en versiones previas de express tienes que instalar una dependencia
    // que se llamaba "body parser", pero ahora ya es parte del core de express
    // solo habría que importarlo en el index principal y ya mostrará la información.
    console.log(req.body); 

    // En este lugar podremos hacer la validación de los campos.
    // En express existe algo llamado express validator pero en esta
    // vez lo haremos de está forma, ya despues podemos agregar alguna dependencia.

    // validator...
    const {nombre, correo, mensaje} = req.body;

    // Agregaremos los errores a una lista para poder agregarlos e iterarlos 
    // por lo que al volver a enviar la petición se recargará y si uno esta bien
    // lo quitará en automático.
    const errores = [];

    if (nombre.trim() == '') {
        errores.push({mensaje: 'El nombre está vació.'})
    }
    if (correo.trim() == '') {
        errores.push({mensaje: 'El correo está vació.'})
    }
    if (mensaje.trim() == '') {
        errores.push({mensaje: 'El mensaje está vació.'})
    }

    // console.log(errores);
    if (errores.length > 0) {

        // Consultamos los Testimoniale Existentes para
        // que no nos de error al mostrar los testimoniales
        // en está sección.
        const testimoniales = await Testimonial.findAll();
        
        // Mostrar la vista con errores.
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        // Alamacenarlo en la base de datos.
        // Se tendría que crear la tabla y el modelo.
        // Pero Sequelize tiene algo para migrar los datos
        // sin embargo si se ejecuta ese comando limpia todas
        // las tablas aunque tengan información, por lo que
        // es mejor crear la tabla.

        try {

            // Recuerda que usamos async await para el manejo de datos.
            // Aquí utilizamos el modelo para guardar los datos.
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            // Por último redireccionamos para finalizar.
            res.redirect('/testimoniales');


        } catch (error) {
            console.log(error);

            // errores.push({mensaje: error});
            // errores.push({mensaje: error.name});
            errores.push({mensaje: error.errors[0].message});
// 

            // Consultamos los Testimoniale Existentes para
            // que no nos de error al mostrar los testimoniales
            // en está sección.
            const testimoniales = await Testimonial.findAll();
            
            // Mostrar la vista con errores.
            res.render('testimoniales', {
                pagina: 'Testimoniales',
                errores,
                nombre,
                correo,
                mensaje,
                testimoniales
            });
        }

    }

}


export {
    guardarTestimonial
}