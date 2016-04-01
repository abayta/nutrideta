/**
 * Created by danjimgar on 16/02/2016.
 */

messages = "messages";  // avoid typos, this string occurs many times.

Messages = new Mongo.Collection(messages);

/**
 * Create the schema for Messages.
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
messageSchema = new SimpleSchema({
    title: {
        label: "Titulo",
        type: String,
        optional: false,
        max: 35,
        autoform: {
            group: messages,
            placeholder: "Escribe un titulo"
        }
    },
    message: {
        label: "Mensaje",
        type: String,
        optional: false,
        max: 2000,
        autoform: {
            group: messages,
            placeholder: 'Escribe un mensaje..',
            rows: 5
        }
    },
    category: {
        label: "Categoría",
        type: String,
        optional: true,
        allowedValues: ['Destacado', 'Importante', 'Borrador', 'Privado'],
        autoform: {
            group: messages,
            type: 'select-radio-inline'
        }
    },
    recipients: {
        label: "Destinatarios",
        type: [String],
        optional: false,
        allowedValues: ['Usuario 1', 'Usuario 2', 'Usuario 3', 'Usuario 4'],
        autoform: {
            group: messages,
            type: 'select-multiple'

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
    viewed: {
        type: Boolean,
        optional: true,
        defaultValue: false,
        autoform: {
            type: "hidden"
        }
    },
    sender: {
        type: String,
        label: "Sender",
        optional: true,
        autoValue: function() {
            return Meteor.userId();
        },
        autoform: {
            type: "hidden"
        }
    },
});

Messages.attachSchema(messageSchema);

Messages.methods = {};

Messages.methods.insert = new ValidatedMethod({
    name: 'Messages.methods.insert',
    validate: messageSchema.validator(),
    run(newMessage) {

        if (!this.userId) {
            throw new Meteor.Error('Messages.methods.insert.not-logged-in',
                'Must be logged in to create a message.');
        }
        Messages.insert(newMessage);
    }
});