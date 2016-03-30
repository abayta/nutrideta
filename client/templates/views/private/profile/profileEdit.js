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

AutoForm.addHooks(['profileEdit'],{
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
        // You must call this.done()!
        //this.done(); // submitted successfully, call onSuccess
        //this.done(new Error('foo')); // failed to submit, call onError with the provided error
        //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
    },
    // Called when any submit operation fails
    onError: function(updateDoc, error) {
        swal({
            title: "¡Se ha producido un error!",
            text: "No ha sido posible editar el perfil",
            type: "error",
            html: true
        });
    },
    // Called when any submit operation succeeds
    onSuccess: function(updateDoc, result) {
        Router.go('/profile', {
            data: function() { return Meteor.users.findOne(Meteor.userId()); }
        });
        swal({
            title: "¡Correcto!",
            text: "Perfil modificado correctamente",
            timer: 2000,
            type: "success"
        });
    }
});
