Template.navigation.onRendered(function() {

    // Initialize metsiMenu plugin to sidebar menu
    $('#side-menu').metisMenu();

});

Template.navigation.events({

    // Colapse menu in mobile mode after click on element
    'click #side-menu a:not([href$="\\#"])': function(){
        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        }
    }

});