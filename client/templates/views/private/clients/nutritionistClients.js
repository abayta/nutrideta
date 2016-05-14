if (Meteor.isClient) {
    AutoForm.hooks({
        signUpClientForm: {
            onSubmit: function (data) {
                this.event.preventDefault();
                Meteor.call('createNewClient', data, function(err, result) {
                    if (err) {
                        swal({
                            title: "¡Error!",
                            text: "Ha ocurrido un error al crear el cliente",
                            type: "error",
                            html: true
                        });
                    } else {
                        //Llamamos al metodo de añadir los roles
                        Meteor.call('addUserRoleUser', result);
                        var email = data.email;
                        //Mandamos mensaje de bienvenida
                        Meteor.call('sendRegisterEmail', email);
                        //Añadimos el cliente al nutricionista
                        Meteor.call('addClientToNutricionist', result);
                        //Añadimos el nutricionista al cliente
                        Meteor.call('addNutricionistToClient', result);
                        //Return to clients view
                        Session.set("activeClients","allClients");
                        Router.go('/clients');

                        swal({
                            title: "¡Cliente creado satisfactoriamente!",
                            text: "Gracias por crear el nuevo cliente",
                            timer: 2000,
                            type: "success"
                        });
                    }
                });
            }
        }
    });

}

Template.allClients.helpers({
    'clients': function () {
        var currentUserId = Meteor.userId();
        return Meteor.users.find({});
    }
});