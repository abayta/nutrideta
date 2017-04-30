Ingredients = new Mongo.Collection('ingredients');

ingredientSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Nombre"
    },
    calories: {
        type: Number,
        label: "Calorías",
        min: 0,
        decimal: true
    },
    proteins: {
        type: Number,
        label: "Proteínas",
        min: 0,
        decimal: true
    },
    hydrates: {
        type: Number,
        label: "Hidratos",
        min:0,
        decimal: true
    },
    fat: {
        type: Number,
        label: "Grasas",
        min: 0,
        decimal: true
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
