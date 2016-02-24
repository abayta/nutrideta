if (Meteor.isClient) {
    Template.register.onRendered(function () {

        // Initialize iCheck plugin
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });

    });

    AutoForm.hooks({
        signUpForm: {
            onSubmit: function (data) {
                this.event.preventDefault();
                Accounts.createUser(data, function (err) {
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
                        var email = data.email;
                        //Mandamos mensaje de bienvenida
                        Meteor.call('sendRegisterEmail', email);

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