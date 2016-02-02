/**
 * Created by danjimgar on 02/02/2016.
 */

Meteor.methods({
    addUserRole: function (user,rol) {
        Roles.addUsersToRoles(user, rol);
    },

    addUserRoleFreeNutritionist: function (user) {
        Roles.addUsersToRoles(user, ['free'], 'nutritionist');
    },

    addUserRolePaidNutritionist: function (user) {
        Roles.addUsersToRoles(user, ['paid'], 'nutritionist');
    },
});