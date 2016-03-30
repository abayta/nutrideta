/**
 * Created by danjimgar on 14/03/2016.
 */
Meteor.methods({

    //@Method que crea un mensaje en la bd
    createMessage: function (doc){
        check(doc, Messages.simpleSchema());
        Messages.insert(doc, function(err, docID) {console.log("DocID: ", docID);})
    },
});
