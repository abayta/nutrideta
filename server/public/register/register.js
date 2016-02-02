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

            Roles.addUsersToRoles(id, userData.roles);

        });
    }

});


Meteor.methods({

    //@Method añade roles al usuario pasado por id
    addUserRole: function (id, rol) {
        Roles.addUsersToRoles(user, rol);
    },

    //@Method añade el rol 'free' al usuario pasado por id
    addUserRoleFreeNutritionist: function (id) {
        Roles.addUsersToRoles(id, 'free');
    },

    //@Method añade el rol 'paid' al usuario pasado por id
    addUserRolePaidNutritionist: function (id) {
        Roles.addUsersToRoles(user, 'paid');
    },
});