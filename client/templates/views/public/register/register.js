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

            var nombre = $('[name=nombre]').val();
            var apellidos = $('[name=apellidos]').val();
            var usuario = $('[name=usuario]').val();
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            var repeatPassword = $('[name=repeatPassword]').val();
            var direccion = $('[name=direccion]').val();
            var codigoPostal = $('[name=codigoPostal]').val();
            var todosArray = [['Nombre',nombre],['Apellidos',apellidos],['Usuario',usuario],['Email',email],['Contraseña',password],['Repetir contraseña',repeatPassword],['Direccion',direccion],['Codigo Postal',codigoPostal]];
			var errorArray = [];
            for (obj in todosArray){
                if (todosArray[obj][1] == "") {
					errorArray.push(todosArray[obj][0]);
				}
            }
			
            if (errorArray.length > 0) {
				var cadena = '';
				for (elem in errorArray){
					cadena+=errorArray[elem]+'<br>';
				}

                swal({
                    title: "¡Error de validación!",
                    text: "Los siguientes campos obligatorios que no están rellenos:<br>"+cadena,
                    type: "warning",
					html: true
                });
                error = true;
                return false;
            }

            if (error == false) {
                Accounts.createUser({
                    nombre: nombre,
                    apellidos: apellidos,
                    usuario: usuario,
                    email: email,
                    password: password,
                    repeatPassword: repeatPassword,
                    direccion: direccion,
                    codigoPostal: codigoPostal
                });

                Router.go('/login');
            }
        }
    });
}