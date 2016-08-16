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
                Meals.insert({name: comidas[comida].name, dayId: dayId, recipes: []});
                // comidas.push({name: comidas[comida].name, recipes:[]});
                // var m = Meals.insert({name: newDiet.comidas[comida].name, recipes:[]});
            }

            // var mealId = Meals.insert({name: newDiet.comidas[comida].name, recipes:[]});
            // newDiet.days.push({numbreDay:i,comidas:mealId});

        }
    }
});


//Helpers ------------------------------------------------------------------------------------------------------------

Diets.helpers({
    days () {
        return Days.find({dietId: this._id},{sort: {numberDay: -1}});
    }
})