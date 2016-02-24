/**
 * Created by danjimgar on 02/02/2016.
 */

// Run this when the meteor app is started
// Añadimos usuarios por defecto
Meteor.startup(function () {

    if (Meteor.users.find().fetch().length === 0) {

        console.log('Creating users: ');

        var users = [
            {
                nombre: "Nutri free",
                email: "free@nutrideta.com",
                apellidos: "Nutri",
                usuario: "nutriFree",
                direccion: "Calle loca 12",
                codigoPostal: "41500",
                roles: ['free']
            },
            {
                nombre: "Nutri paid",
                email: "paid@nutrideta.com",
                apellidos: "Nutri",
                usuario: "nutriPaid",
                direccion: "Calle loca 32",
                codigoPostal: "41510",
                roles: ['paid']
            }
        ];

        _.each(users, function (userData) {
            var id,
                user;

            console.log(userData);

            id = Accounts.createUser({
                'email': userData.email, password: 'prueba', profile: {
                    nombre: userData.nombre,
                    apellidos: userData.apellidos,
                    usuario: userData.usuario,
                    direccion: userData.direccion,
                    codigoPostal: userData.codigoPostal
                }
            });

            Roles.addUsersToRoles(id, userData.roles, 'nutricionista');

        });
    }

});


Meteor.methods({
    //@Method envia un correo al registrarte en la pagina
    sendRegisterEmail: function (to) {
        check([to], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: 'info@nutrideta.com',
            subject: 'Bienvenid@ a nutrideta.com',
            text: 'Gracias por unirte al equipo de nutrideta.com'
        });
    },

    //@Method añade roles y grupo al usuario pasado por id
    addUserRole: function (id, rol, grupo) {
        check(id, String);
        Roles.addUsersToRoles(user, rol, grupo);
    },

    //@Method añade el rol 'free' y el grupo 'nutricionista' al usuario pasado por id
    addUserRoleFreeNutritionist: function (id) {
        check(id, String);
        Roles.addUsersToRoles(id, 'free', 'nutricionista');
    },

    //@Method añade el rol 'paid' y el grupo 'nutricionista' al usuario pasado por id
    addUserRolePaidNutritionist: function (id) {
        check(id, String);
        Roles.addUsersToRoles(user, 'paid', 'nutricionista');
    },

    //@Method añade el rol 'user' y el grupo 'usuario' al usuario pasado por id
    addUserRoleUser: function (id) {
        check(id, String);
        Roles.addUsersToRoles(user, 'user', 'usuario');
    },
});