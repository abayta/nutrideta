Ingredients = new Mongo.Collection('ingredients');

ingredientSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    calories: {
        type: Number,
        label: "Calories",
        min: 0
    },
    hydrates: {
        type: Number,
        label: "Hydrates",
        min:0
    },
    proteins: {
        type: Number,
        label: "Proteins",
        min: 0
    },
    fat: {
        type: Number,
        label: "Fat",
        min: 0
    }
});

Ingredients.attachSchema(ingredientSchema);

Ingredients.methods = {};

Ingredients.methods.insert = new ValidatedMethod({
    name: 'Ingredients.methods.insert',
    validate: ingredientSchema.validator(),
    run(newIngredient) {

        if (!this.userId) {
            throw new Meteor.Error('Recipes.methods.insert.not-logged-in',
                'Must be logged in to create an invoice.');
        }

        Ingredients.insert(newIngredient);
    }
});