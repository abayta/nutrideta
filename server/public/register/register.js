/**
 * Created by danjimgar on 28/01/2016.
 */

Accounts.onCreateUser(function(options, user) {

    // Use provided profile in options, or create an empty object
    user.profile = options.profile || {};

    // Assigns first and last names to the newly created user object
    user.profile.nombre = options.nombre;
    user.profile.apellidos = options.apellidos;
    user.profile.usuario = options.usuario;
    user.profile.direccion = options.direccion;
    user.profile.codigoPostal = options.codigoPostal;

    // Returns the user object
    return user;
});