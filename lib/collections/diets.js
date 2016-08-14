/**
 * Created by abayta on 7/08/16.
 */
Diets = new Mongo.Collection('diets');

moment = new Date();

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

Diets.methods = {};

Diets.methods.insert = new ValidatedMethod({
    name: 'Diets.methods.insert',
    validate: dietsSchemaForm.validator(),
    run(newDiet) {
        if (!this.userId) {
            throw new Meteor.Error('Recipes.methods.insert.not-logged-in',
                'Must be logged in to create an invoice.');
        }

        newDiet.days = [];
        var comidas = [];

        for (comida in newDiet.comidas){
            comidas.push({name: newDiet.comidas[comida].name, recipes:[]})
        }

        for (i=0;i<newDiet.duration;i++){
            newDiet.days.push({numbreDay:i,comidas:comidas})
        }

        delete newDiet.duration;
        delete newDiet.comidas;

        Diets.insert(newDiet);

    }
});
