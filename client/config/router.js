Router.configure({
    layoutTemplate: 'layout',
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

Router.route('/profile', function () {
    this.render('profile');
});

// Profile edit route

Router.route('/profileEdit', function () {
    name: 'profileEdit',
        this.render('profileEdit', {
            data: function () {
                return Meteor.users.findOne({_id: Meteor.userId()});
            }
        });
});

// Profile route

Router.route('/notas', function () {
    Meteor.subscribe('notasByUser', Meteor.userId());
    this.render('notas');
});

// Mensajes route

Router.route('/mensajes', function () {
    this.render('mensajes');
});

// Global - Remove splash screen after rendered layout

Router.onAfterAction(function () {
    setTimeout(function () {
        $('.splash').css('display', 'none')
    })
});