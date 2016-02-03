/**
 * Created by Dani on 03/02/2016.
 */

Template.profileEdit.events({
    'submit #profileEditForm': function (event) {

        event.preventDefault();

        var error = false;
        var currentUserId = this._id;

        var perfil = {
            nombre: $(event.target).find('[name=nombre]').val(),
        }

        Meteor.users.update(currentUserId, {$set: {profile: perfil}}, function (error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            } else {
                Router.go('profile', {_id: Meteor.userId()});
                swal({
                    title: "¡Correcto!",
                    text: "Usuario modificado correctamente",
                    timer: 2000,
                    type: "success"
                });

            }
        });

    }
});