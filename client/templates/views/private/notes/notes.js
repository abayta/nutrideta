/**
 * Created by Danjimgar on 08/02/2016.
 */



Template.notes.onRendered(function () {

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

Template.notes.events({
    'submit #createNotesForm': function (event) {

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
                    document.getElementById("createNotesForm").reset();
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
    'submit #editNotesForm': function (event, id) {
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
        var nota = Notes.findOne(notaId);
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
    },
    'click #left': function (event) {
        var currentPage = Session.get("activePageNotes");
        if (currentPage === 1) {
            Session.set("activePageNotes", 1);
        } else {
            Session.set("activePageNotes", currentPage - 1);
        }

    },
    'click #right': function (event) {
        var currentPage = Session.get("activePageNotes");
        Session.set("activePageNotes", currentPage + 1);
    }
});

Template.notes.helpers({
    'notes': function () {
        var currentPage = Session.get("activePageNotes");
        var skipp = currentPage;
        var limits = 0;
        if (currentPage !== 1) {
            skipp = (currentPage * 5) - 5;
            limits = skipp + 5;
        } else {
            skipp = 0;
            limits = 5;
        }

        var count = Notes.find({}, {skip: skipp, limit: 5}).count();

        if (count > 0) {
            return Notes.find({}, {skip: skipp, limit: 5});
        } else {
            return Notes.find({}, {skip: 0, limit: 5});
        }
    },
    'firstPage': function () {
        return Session.get("activePageNotes") === 1;
    },
    'lastPage': function () {
        var activePage = Session.get("activePageNotes");
        var count = Notes.find({}).count();
        var maxPages = Math.floor(count / 5);
        var nextPage = count % 5;
        if (nextPage != 0) {
            maxPages++;
        }
        return activePage === maxPages;
    }
});

