/**
 * Created by abayta on 7/08/16.
 */
Diets = new Mongo.Collection('diets');

moment = new Date();

dietsSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Título"
    },
    description: {
        type: String,
        label: "Descripción",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    isTemplate: {
        type: Boolean,
        defaultValue: true,
        autoform: {
            type: "hidden"
        }
    },
    creationMoment: {
        type: Date,
        optional: true,
        autoValue: function () {
            return new Date();
        },
        autoform: {
            type: "hidden"
        }
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
    energyPerDay: {
        type: Number,
        label: "Calorias al dia"
    },
    isFollow: {
        type: String,
        optional: true,
        autoform: {
            type: "hidden"
        }
    }
});

dietsSchemaForm = new SimpleSchema({
    title: {
        type: String,
        label: "Título"
    },
    description: {
        type: String,
        label: "Descripción",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    isTemplate: {
        type: Boolean,
        defaultValue: true,
        autoform: {
            type: "hidden"
        }
    },
    creationMoment: {
        type: Date,
        optional: true,
        autoValue: function () {
            return new Date();
        },
        autoform: {
            type: "hidden"
        }
    },
    duration: {
        type: Number,
        label: "Duración",
        max: 60

    },
    energyPerDay: {
        type: Number,
        label: "Calorias al dia"
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
    comidas: {
        type: [Object],
        max: 8
    },
    "comidas.$.name": {
        label: "Nombre",
        type: String,
        max: 20
    }

});

Diets.attachSchema(dietsSchema);

Diets.methods = {};

Diets.methods.insert = new ValidatedMethod({
    name: 'Diets.methods.insert',
    validate: dietsSchemaForm.validator(),
    run(newDiet) {
        if (!this.userId) {
            throw new Meteor.Error('Recipes.methods.insert.not-logged-in',
                'Must be logged in to create an invoice.');
        }

        var comidas = newDiet.comidas;
        var duration = newDiet.duration;

        delete newDiet.duration;
        delete newDiet.comidas;

        var dietId = Diets.insert(newDiet);

        // for (comida in comidas) {
        //     comidas.push({name: newDiet.comidas[comida].name, recipes: []});
        //     // var m = Meals.insert({name: newDiet.comidas[comida].name, recipes:[]});
        // }
        for (i = 0; i < duration; i++) {
            var dayId = Days.insert({numberDay: i, dietId: dietId});

            for (comida in comidas) {
                Meals.insert({name: comidas[comida].name, dayId: dayId, dietId: dietId, recipes: []});
                // comidas.push({name: comidas[comida].name, recipes:[]});
                // var m = Meals.insert({name: newDiet.comidas[comida].name, recipes:[]});
            }

            // var mealId = Meals.insert({name: newDiet.comidas[comida].name, recipes:[]});
            // newDiet.days.push({numbreDay:i,comidas:mealId});

        }
    }
});
mealsSchemaForm = new SimpleSchema({
    _id: {
        type: String,
        autoform: {
            type: "hidden"
        }
    },
    recipes: {
        type: [Object]
    },
    "recipes.$.id": {
        type: String,
        label: "Nombre",
        autoform: {
            type: "select2",
            options: function () {
                return _.map(Recipes.find().fetch(), function(recipe) {
                    return {
                        label: recipe.name,
                        value: recipe._id
                    };
                });
            }
        }
    }
});

mealsSchemaValidated = new SimpleSchema({
    _id: {type: String},
    modifier: {type: Object, blackbox: true}
});

Diets.methods.addRecipe = new ValidatedMethod({
    name: 'Diets.methods.addRecipe',
    validate: mealsSchemaValidated.validator(),
    run(objectForm){

        if (!this.userId) {
            throw new Meteor.Error('Recipes.methods.insert.not-logged-in',
                'Must be logged in to create an invoice.');
        }

        recipes = [];

        for (recipe in objectForm.modifier.$set.recipes) {
            var rec = Recipes.findOne({_id: objectForm.modifier.$set.recipes[recipe].id});
            recipes.push({_id: rec._id, name: rec.name});
        }
        Meals.update({_id: objectForm._id}, {$set: {recipes: recipes}});
    }
});

dietsSchemaAssign = new SimpleSchema({
    cliente: {
        type: String,
        label: "Nombre",
        autoform: {
            type: "select2",
            options: function () {
                return _.map(Recipes.find().fetch(), function(recipe) {
                    return {
                        label: recipe.name,
                        value: recipe._id
                    };
                });
            },
            row:6
        }
    },
    startDate: {
        type: Date,
        autoform: {
            row:6
        }
    },
    diet: {
        type: String,
        optional: true,
        autoform: {
            type: "hidden"
        }
    }
});

Diets.methods.assign = new ValidatedMethod({
    name: 'Diets.methods.assign',
    validate: dietsSchemaAssign.validator(),
    run(formObject){
        var diet = Diets.findOne({_id: formObject.diet});

    }
});

Diets.methods.delete = new ValidatedMethod({
    name: 'Diets.methods.delete',
    validate:new SimpleSchema({
        _id: { type: String }
    }).validator(),
    run(idDiet){
        var diet = Diets.find({_id: idDiet._id});

        if (!this.userId) {
            throw new Meteor.Error('Diets.methods.delete.not-logged-in',
                'Must be logged in to delete a diet.');
        } else if (!this.userId==diet.author) {
            throw new Meteor.Error('Diets.methods.delete.not-author', 'You Must be author');
        }

        Diets.remove({_id:idDiet._id});
    }
});

//Helpers ------------------------------------------------------------------------------------------------------------

Diets.helpers({
    days () {
        return Days.find({dietId: this._id},{sort: {numberDay: -1}});
    }
});