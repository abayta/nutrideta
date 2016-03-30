Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

/////////////////// Public route /////////////////////

// Principal route

Router.route('/', function () {
    this.render('landingPage');
    this.layout('landingLayout');
});

Router.route('/inicio', function () {
    this.render('landingPage');
    this.layout('landingLayout');
});

// Register route

Router.route('/register', function () {
    this.render('register');
    this.layout('blank-layout');
});

// Login route

Router.route('/login', function () {
    this.render('login');
    this.layout('blank-layout');
});

/////////////////// Private route /////////////////////

// Dashboard route

Router.route('/dashboard', function () {
    this.render('dashboard');
});

// Profile route

Router.route('/profile', {
    name: 'profile',
    waitOn: function() {
        return Meteor.subscribe('user', this.params._id);
    },
    data: function() { return Meteor.users.findOne(this.params._id); }
});

// Profile edit route

Router.route('/profileEdit', {
    name: 'profileEdit',
    waitOn: function() {
        return Meteor.subscribe('user', this.params._id);
    },
    data: function() { return Meteor.users.findOne(this.params._id); }
});

// Notes route

Router.route('/notes', function () {
    Meteor.subscribe('notesByUser', Meteor.userId());
    this.render('notes');
});

// Messages route

Router.route('/messages', function () {
    this.render('messages');
});

//TEST ROUTE ABA RECIPES

Router.route('/createRecipe', function () {
    this.render('createRecipe');
});

Router.route('/createIngredient', function () {
    this.render('createIngredient');
});

Router.route('/listIngredients', function () {
  this.render('listIngredients');
});


// Global - Remove splash screen after rendered layout

Router.onAfterAction(function () {
    setTimeout(function () {
        $('.splash').css('display', 'none')
    })
});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}
