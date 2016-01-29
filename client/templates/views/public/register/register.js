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
                    text: "Los siguientes campos obligatorios no están rellenos:<br>"+cadena,
                    type: "warning",
					html: true
                });
                error = true;
                return false;
            }

            if (error == false) {

                //Crear usuario
                var user = {email:email,
                    password:password,
                    perfil:{nombre:nombre,
                        apellidos:apellidos,
                        usuario:usuario,
                        direccion:direccion,
                        codigoPostal:codigoPostal}};
                Accounts.createUser(user,function(err){
                    if(err) {
                        swal({
                            title: "¡Error!",
                            text: "Ha ocurrido un error a la hora de crear la cuenta",
                            type: "error",
                            html: true
                        });
                    } else {
                        Router.go('/login');
                    }
                });
            }
        }
    });
}