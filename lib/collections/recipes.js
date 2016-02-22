Recipes = new Mongo.Collection('recipes');

recipeSchema = new SimpleSchema({
    name: {
        type:  String,
        label: "Name"
    },
    description: {
        type: String,
        label: "Description"
    },
    preparation: {
        type: String,
        label: "Preparation"
    },
    preparationTime: {
        type: String,
        label: "Preparation Time"
    },
    energy: {
        type: Number,
        label: "Energy"
    },
    fats: {
        type: Number,
        label: "Fats"
    },
    carbohydrates: {
        type: Number,
        label: "Carbohydrates"
    },
    protein: {
        type: Number,
        label: "Protein"
    },
    author: {
        type: String,
        label: "Author",
        optional: true,
        autoValue: function() {
            return this.userId;
        },
        autoform: {
            type: "hidden"
        }
    },
    createdAt: {
        type: Date,
        label: "Created At",
        optional: true,
        autoValue: function() {
            return new Date();
        },
        autoform: {
            type: "hidden"
        }
    }
});

Recipes.attachSchema(recipeSchema);

Recipes.methods = {};

Recipes.methods.insert = new ValidatedMethod({
    name: 'Recipes.methods.insert',
    validate: recipeSchema.validator(),
    run(newRecipe) {

        if (!this.userId) {
            throw new Meteor.Error('Recipes.methods.insert.not-logged-in',
                'Must be logged in to create an invoice.');
        }

        Recipes.insert(newRecipe);
    }
});