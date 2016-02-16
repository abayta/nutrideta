Template.header.events({

    // Cierra sesion
    'click #logout': function(event){
        event.preventDefault();

        Meteor.logout(function(error){
            if(error){
                swal({
                    title: "¡Error!",
                    text: "No puedes cerrar sesión, inténtalo más tarde",
                    type: "error"
                });
            } else {
                Router.go('/login');
                swal({
                    title: "¡Hasta la próxima!",
                    text: "Has cerrado sesión correctamente",
                    timer: 2000,
                    type: "success"
                });
            }
        });
    },

    'click .hide-menu': function (event) {

        event.preventDefault();

        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        } else {
            $("body").toggleClass("hide-sidebar");
        }
    },

    'click .right-sidebar-toggle': function (event) {
        event.preventDefault();
        $('#right-sidebar').toggleClass('sidebar-open');
    }


});