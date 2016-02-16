Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();

        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                console.log(error.reason);
                swal({
                    title: "¡Login incorrecto!",
                    text: "El email/usuario o contraseña no es válido",
                    type: "error"
                });
            } else {
                Router.go('/dashboard');
                swal({
                    title: "¡Login correcto!",
                    text: "Bienvenido a la página principal",
                    timer: 2000,
                    type: "success"
                });
            }
        });

    }
});