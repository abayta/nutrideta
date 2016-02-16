Template.landingPage.onRendered(function(){

    $('body').addClass('landing-page');

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 80
    });

});

Template.landingPage.onDestroyed(function(){

    $('body').removeClass('landing-page');

});

Template.landingPage.events({

    // Page scrolling feature
    'click a.page-scroll': function(event){
        event.preventDefault();
        var link = $(event.target);
        $('html, body').stop().animate({
            scrollTop: $(link.attr('href')).offset().top - 50
        }, 500);
    }


});