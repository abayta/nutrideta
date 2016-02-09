
/**
 * Created by danjimgar on 08/02/2016.
 */

// Run this when the meteor app is started
// Añadimos usuarios por defecto
Meteor.startup(function () {
        console.log('Creating notes: ');

       /* Tareas.insert({
            createdBy: "pEv6Zgkus8sHwT5Bx",
            createdAt: "1454954995746",
            titulo: "David",
            descripcion: "asd"
        });

        Tareas.insert({
            createdBy: "pEv6Zgkus8sHwT5Bx",
            createdAt: "1454954995746",
            titulo: "Prueba",
            descripcion: "loca"
        });*/
});


Meteor.methods({

        //@Method que crea una nota en la bd
        crearNota: function (titulo, descripcion) {
                check(titulo, String);

                Notas.insert({
                        createdBy: Meteor.userId(),
                        createdAt: moment(new Date()).format('DD-MM-YYYY'),
                        titulo: titulo,
                        descripcion: descripcion
                })
        },

});
