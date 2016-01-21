Template.pageHeader.events({

    'click .small-header-action': function(event){
        event.preventDefault();
        $('.normalheader').toggleClass('small-header');
        $('#hbreadcrumb').toggleClass('m-t-lg');
        $('.clip-header i').toggleClass('fa-arrow-up').toggleClass('fa-arrow-down');
    }

});