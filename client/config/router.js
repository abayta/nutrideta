'use strict'

/////////////////////////////////////////////////////////////////////////////
// Routing
////////////////////////////////////////////////////////////////////////////
Meteor.navigateTo = function (path) {
    Router.go(path)
}

function emailVerified(user) {
    return _.some(user.emails, function (email) {
        return email.verified
    })
}

var filters = {

    /**
     * ensure user is logged in and
     * email verified
     */
    authenticate: function () {
        var user

        if (Meteor.loggingIn()) {

            console.log('[authenticate filter] loading')
            this.layout('layout')
            this.render('loading')

        } else {

            user = Meteor.user()

            if (!user) {
                console.log('[authenticate filter] signin')
                Meteor.navigateTo('/login')

                /*Otra opcion es cargar la plantilla*/

                // this.layout('blank-layout')
                // this.render('login')
                return
            }

            if (!emailVerified(user)) {
                console.log('[authenticate filter] awaiting-verification')
                this.layout('layout')
                this.render('awaiting-verification')
                return
            }

            console.log('[authenticate filter] done')
            this.layout('layout')

            this.next()
        }
    },  // end authenticate
    nutricionista: function () {
        console.log('[nutricionist]')
        var idU = Meteor.userId()
        if (Roles.userIsInRole(Meteor.userId(), ['free'], 'nutricionist')) {
            this.next()
        } else {
            Meteor.navigateTo('/')
        }
    }

}  // end filters

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

//Pruebas

// Dashboard route

Router.route('/dashboard', function () {
    Meteor.subscribe('currentUser');
    this.render('dashboard');
});

// Profile route

Router.route('/profile', function () {
    Meteor.subscribe('currentUser');
    this.render('profile');
});

// Profile edit route

Router.route('/profileEdit', function () {
    Session.set("activeTab", "btnStep1");
    Meteor.subscribe('currentUser');
    this.render('profileEdit');
});

// Notes route

Router.route('/notes', function () {
    Session.set("activePageNotes", 1);
    Meteor.subscribe('notesByUser', Meteor.userId());
    this.render('notes');
});

// Messages route

Router.route('/messages', function () {
    Session.set("messages", "mailbox");
    Session.set("activeMessages", "inbox");
    this.render('messages');
});

// Clients route

Router.route('/clients', function () {
    Session.set("clients", "allClients");
    Meteor.subscribe('clientsByNutritionist');
    this.render('clients');
})

Router.route('/chat', function () {
    var currentUser = Meteor.userId();
    if (!(Meteor.userId())) {
        Router.go('notFound');
    } else if (Roles.userIsInRole(Meteor.userId(), ['free', 'paid'], 'nutricionist')) {
        Meteor.subscribe('usersOnlineNutri');
    } else if (Roles.userIsInRole(currentUser, ['user'], 'user')) {
        Meteor.subscribe('nutricionistOnline');
    }
    Session.set("activeChat", "none");
    this.render('chat');
});

/*Router.route('/calendar', function () {
 Meteor.subscribe('clientsByNutritionist');
 Meteor.subscribe('calendar');
 this.render('calendar');
 });*/

Router.route('calendar', {
    path: 'calendar',
    waitOn: function () {
        Meteor.subscribe('clientsByNutritionist');
        return Meteor.subscribe('calendar')
    },
    data: function () {
        if (this.ready()) {
            this.render();
            return Dates.find();
        } else {
            this.render('loading')
        }
    }
});


//TEST ROUTE ABA RECIPES

Router.route('/createRecipe', function () {
    Meteor.subscribe('ingredients');
    this.render('createRecipe');
});

Router.route('/createIngredient', {
    template: 'createIngredient',
    before: [filters.authenticate, filters.nutricionista]
});

Router.route('/listIngredients', {
    template: 'listIngredients',
    before: [filters.authenticate]
});

Router.route('/listRecipes', {
    template: 'listRecipes',
    before: [filters.authenticate, filters.nutricionista]
});

Router.route('/createDiet', {
    template: 'createDiet',
    before: [filters.authenticate, filters.nutricionista]
});

Router.route('/listDiets', {
    template: 'listDiets',
    before: [filters.authenticate, filters.nutricionista]
});

Router.route('/detailsDiet/:_id', {
    // template: 'detailsDiet',
    name: 'detailsDiet',
    waitOn: function () {
        return [Meteor.subscribe('oneDiet',this.params._id),
            Meteor.subscribe('daysOfDiet', this.params._id),
            Meteor.subscribe('mealsOfDiet',this.params._id),
            Meteor.subscribe('recipes')];},
    data: function() {return Diets.findOne(this.params._id)},
    before: [filters.authenticate, filters.nutricionista]
});

Router.route('/detailsRecipe/:_id', {
    // template: 'detailsDiet',
    name: 'detailsRecipe',
    waitOn: function () {
        return [Meteor.subscribe('oneRecipe',this.params._id),
            Meteor.subscribe('ingredientsOfRecipe', this.params._id)];},
    data: function() {return Recipes.findOne(this.params._id)},
    before: [filters.authenticate, filters.nutricionista]
});
// Global - Remove splash screen after rendered layout

Router.onAfterAction(function () {
    setTimeout(function () {
        $('.splash').css('display', 'none')
    })
});

var requireLogin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('notFound');
        }
    } else {
        this.next();
    }
}
