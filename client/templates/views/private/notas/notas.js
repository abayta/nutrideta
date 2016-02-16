/**
 * Created by Danjimgar on 08/02/2016.
 */



Template.notas.onRendered(function () {

    // Initialize summernote plugin
    $('#summernote1').summernote({
        toolbar: [
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['textsize', ['fontsize']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']]
        ],
        placeholder: 'Escribe una descripción...',
        height: 200,   // set editable area's height
        focus: true    // set focus editable area after Initialize summernote
    });
    $('#summernote2').summernote({
        toolbar: [
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['textsize', ['fontsize']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']]
        ],
        placeholder: 'Escribe una descripción...',
        height: 200,   // set editable area's height
        focus: true    // set focus editable area after Initialize summernote
    });

});

Template.notas.events({
    'submit #createNotasForm': function (event) {

        event.preventDefault();

        var error = false;

        var titulo = event.target.titulo.value;
        var descripcion = $(event.target).find('#summernote1').code();
        var fechaCreacion = (new Date()).getTime();


        //Comprobamos los campos que sean obligatorios
        var todosArray = [['Titulo', titulo], ['Descripcion', descripcion]];
        var errorArray = [];
        for (obj in todosArray) {
            if (todosArray[obj][1] == "") {
                errorArray.push(todosArray[obj][0]);
            }
        }

        if (errorArray.length > 0) {
            var cadena = '';
            for (elem in errorArray) {
                cadena += errorArray[elem] + '<br>';
            }

            //Lanzamos alert con el tipo de error
            swal({
                title: "¡Error de validación!",
                text: "Los siguientes campos obligatorios no están rellenos:<br>" + cadena,
                type: "warning",
                html: true
            });
            error = true;
            return false;
        }

        //Creamos la nota
        if (error == false) {
            //Llamamos al metodo de crear nota
            Meteor.call('crearNota', titulo, descripcion, function (error) {
                if (error) {
                    swal({
                        title: "¡Se ha producido un error!",
                        text: "No ha sido posible crear la nota",
                        type: "error",
                        html: true
                    });
                } else {
                    //Ponemos los campos del formulario vacios para insertar otro
                    $('#summernote1').code('');
                    document.getElementById("createNotasForm").reset();
                    document.getElementById("cerrarBtn1").click();
                    swal({
                        title: "¡Correcto!",
                        text: "Una nota se ha añadido a la colección",
                        timer: 2000,
                        type: "success"
                    });
                }
            });
        }
        ;
    },
    'submit #editNotasForm': function (event) {
        var descripcion = $(event.target).find('#descripcion').value();
        var _id = $(event.target).find('#_id').value();
        var titulo = $(event.target).find('#titulo').value();
        Meteor.call('editarNota', id, titulo, descripcion);

        swal({
            title: "¡Correcto!",
            text: "Una nota se ha editado correctamente",
            timer: 2000,
            type: "success"
        });

    },
    'click #editar': function (event) {
        var descripcionNota = $(event.target).find('#descripcionNota').code();
        var tituloNota = $(event.target).find('#tituloNota').value();
        var fechaNota = $(event.target).find('#fechaNota').value();

        document.getElementById("tituloEdit").value = tituloNota;

    }
});

Template.notas.helpers({
    'nota': function () {
        var currentUserId = Meteor.userId();
        return Notas.find({}, {sort: {createdAt: -1}, titulo: 1});
    }
});

//Este metodo sirve para cortar o truncar cadenas
Handlebars.registerHelper('trimString', function (passedString, startstring, endstring) {
    var theString = passedString.substring(startstring, endstring);
    return new Handlebars.SafeString(theString)
});
