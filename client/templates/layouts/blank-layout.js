Template.blankLayout.onRendered(function () {
    $('body').addClass('blank');
});

Template.blankLayout.onDestroyed(function () {
    $('body').removeClass('blank');
});
