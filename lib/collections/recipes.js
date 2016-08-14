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
    },
    ingredients: {
        type: [Object],
        autoform: {
            initialCount:1
        }
    },
    "ingredients.$.name": {
        type: String
    },
    "ingredients.$.id": {
        type: String,
        label: "Nombre",
        autoform: {
            type: "select2",
            options: function () {
                return _.map(Ingredients.find().fetch(), function(ingredient) {
                    return {
                        label: ingredient.name,
                        value: ingredient._id
                    };
                });
            }
        }
    },
    "ingredients.$.quantity": {
        type: Number,
        label: "Cantidad"
    }
});
recipeSchemaForm = new SimpleSchema({
    name: {
        type:  String,
        label: "Name"
    },
    description: {
        type: String,
        label: "Description",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    preparation: {
        type: String,
        label: "Preparation",
        max: 20,
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
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
    },
    ingredients: {
        type: [Object],
        autoform: {
            initialCount:1
        }
    },
    "ingredients.$.id": {
        type: String,
        label: "Nombre",
        autoform: {
            type: "select2",
            options: function () {
                return _.map(Ingredients.find().fetch(), function(ingredient) {
                    return {
                        label: ingredient.name,
                        value: ingredient._id
                    };
                });
            }
        }
    },
    "ingredients.$.quantity": {
        type: Number,
        label: "Cantidad"
    }
});

Recipes.attachSchema(recipeSchema);

Recipes.methods = {};

Recipes.methods.insert = new ValidatedMethod({
    name: 'Recipes.methods.insert',
    validate: recipeSchemaForm.validator(),
    run(newRecipe) {

        if (!this.userId) {
            throw new Meteor.Error('Recipes.methods.insert.not-logged-in',
                'Must be logged in to create an invoice.');
        }

        var len = newRecipe.ingredients.length;
        for (i=0;i<len;i++) {
            var ingredient = Ingredients.findOne({_id: newRecipe.ingredients[i].id});
            newRecipe.ingredients[i].name = ingredient.name;
        }

        Recipes.insert(newRecipe);
    }
});


Recipes.methods.remove = new ValidatedMethod({
    name: "Recipes.methods.remove",
    validate: new SimpleSchema({
        _id: { type: String }
    }).validator(),
    run(idRecipe) {
        var recipe = Ingredients.find({_id: idRecipe});

        if (!this.userId) {
            throw new Meteor.Error('Recipes.methods.insert.not-logged-in',
                'Must be logged in to create an invoice.');
        } else if (!this.userId==recipe.author) {
            throw new Meteor.Error('Recipes.methods.removed.not-author', 'You Must be author');
        }

        Recipes.remove({_id:idRecipe._id});
    }
});