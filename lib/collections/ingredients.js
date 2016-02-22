Ingredients = new Mongo.Collection('ingredients');

Ingredients.attachSchema(new SimpleSchema({
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
}));

