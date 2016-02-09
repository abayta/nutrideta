/**
 * Created by Danjimgar on 08/02/2016.
 */



Template.notas.onRendered(function () {

    // Initialize summernote plugin
    $('#summernote').summernote({
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
    'submit #notasForm': function (event) {

        event.preventDefault();

        var error = false;

        var titulo = event.target.titulo.value;
        var descripcion = $(event.target).find('#summernote').code();
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
            //Llamamos al metodo de añadir los roles
            Meteor.call('crearNota',titulo, descripcion);

            //Router.current().render(Template.notas).data();

            swal({
                title: "¡Correcto!",
                text: "Una nota se ha añadido a la colección",
                timer: 2000,
                type: "success"
            });

        }
        ;


    }
});

Template.notas.helpers({
    'nota': function(){
        var currentUserId = Meteor.userId();
        return Notas.find({}, {sort: {createdAt: -1}, titulo: 1});
    }
});

//Este metodo sirve para cortar o truncar cadenas
Handlebars.registerHelper('trimString', function(passedString, startstring, endstring) {
    var theString = passedString.substring( startstring, endstring );
    return new Handlebars.SafeString(theString)
});
