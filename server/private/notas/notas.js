/**
 * Created by danjimgar on 08/02/2016.
 */

// Run this when the meteor app is started
// Añadimos usuarios por defecto
Meteor.startup(function () {

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

    //@Method que edita una nota en la bd
    editarNota: function (id, titulo, descripcion) {
        check(titulo, String);

        Notas.update(id, {$set: {titulo: titulo, descripcion: descripcion}}, function (error) {
            if (error) {
                // display the error to the user
                Logger.log("Error a la hora de editar la nota " + id);
            }
        })
    },

    //@Method que elimina una nota en la bd
    borrarNota: function (id) {
        check(id, String);

        Notas.remove(id, function (error) {
            if (error) {
                // display the error to the user
                Logger.log("Error a la hora de borrar la nota " + id);
            }
        })
    },

    //@Method que busca una nota en la bd
    findNota: function (id) {
        check(id, String);

        return Notas.findOne(id);
    },

});
