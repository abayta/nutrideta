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
    'submit #editNotasForm': function (event, id) {
        var notaId = Session.get('notaId');
        var titulo = event.target.titulo.value;
        var descripcion = $(event.target).find('#summernote2').code();

        Meteor.call('editarNota', notaId, titulo, descripcion);

        swal({
            title: "¡Correcto!",
            text: "Una nota se ha editado correctamente",
            timer: 2000,
            type: "success"
        });

    },
    'click #editar': function (event) {
        var notaId = this._id;
        Session.set('notaId', notaId);
        event.preventDefault();
        var nota = Notas.findOne(notaId);
        var descripcion = nota.descripcion;
        var titulo = nota.titulo;
        document.getElementById("tituloEdit").value = titulo;
        var description = document.getElementsByClassName('note-editable');
        description[1].innerHTML = descripcion;


    },
    'submit .borrar ': function (event, id) {
        var notaId = this._id;
        event.preventDefault();
        swal({
            title: "¿Estás seguro?",
            text: "Se eliminará la nota que has seleccionado",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Borrar",
            closeOnConfirm: false
        }, function () {
            Meteor.call('borrarNota', notaId, function (error) {
                if (error) {
                    swal({
                        title: "¡Se ha producido un error!",
                        text: "No ha sido posible borrar la nota",
                        type: "error",
                        html: true
                    });
                } else {
                    var help = document.getElementById('helpText');
                    help.className = 'panel-body text-center';
                    swal({
                        title: "¡Correcto!",
                        text: "La nota se ha elimnado correctamente",
                        timer: 2000,
                        type: "success"
                    });
                }
            });
        });
    }
});

Template.notas.helpers({
    'notas': function () {
        var currentUserId = Meteor.userId();
        return Notas.find({}, {sort: {createdAt: -1}, titulo: 1});
    }
});

//Este metodo sirve para cortar o truncar cadenas
Handlebars.registerHelper('trimString', function (passedString, startstring, endstring) {
    var theString = passedString.substring(startstring, endstring);
    return new Handlebars.SafeString(theString)
});
