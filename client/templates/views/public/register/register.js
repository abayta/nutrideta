if (Meteor.isClient) {
    Template.register.onRendered(function () {

        // Initialize iCheck plugin
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });

    });

    Template.register.events({
        'submit #registerForm': function (event) {

            event.preventDefault();

            var error = false;

            var email = event.target.email.value;
            var password = event.target.password.value;
            var nombre = event.target.nombre.value;
            var apellidos = event.target.apellidos.value;
            var usuario = event.target.usuario.value;
            var repeatPassword = event.target.repeatPassword.value;
            var direccion = event.target.direccion.value;
            var codigoPostal = event.target.codigoPostal.value;

            //Comprobamos los campos que sean obligatorios
            var todosArray = [['Nombre', nombre], ['Apellidos', apellidos], ['Usuario', usuario], ['Email', email], ['Contraseña', password], ['Repetir contraseña', repeatPassword], ['Direccion', direccion], ['Codigo Postal', codigoPostal]];
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

            if (error == false) {
                var user = {
                    'email': email, password: password, profile: {
                        nombre: nombre,
                        apellidos: apellidos,
                        usuario: usuario,
                        direccion: direccion,
                        codigoPostal: codigoPostal
                    }
                };


                //Creamos el usuario con los atributos que recogemos por formulario
                Accounts.createUser(user, function (err) {
                    if (err) {
                        swal({
                            title: "¡Error!",
                            text: "Ha ocurrido un error a la hora de crear la cuenta",
                            type: "error",
                            html: true
                        });
                    } else {

                        //Llamamos al metodo de añadir los roles
                        Meteor.call('addUserRoleFreeNutritionist', Meteor.userId());

                        Router.go('/login');
                        swal({
                            title: "¡Usuario creado satisfactoriamente!",
                            text: "Bienvenido a Nutrideta.com",
                            timer: 2000,
                            type: "success"
                        });
                    }
                });
            }
        }
    });
}