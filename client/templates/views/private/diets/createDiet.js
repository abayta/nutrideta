AutoForm.addHooks('insertDietForm', {
    onSubmit: function (doc) {
        dietsSchemaForm.clean(doc);
        console.log("Diet doc with auto values", doc);
        this.done();
        return false;
    },
    onSuccess: function(){
        console.log("El hook ha funcionado");
        swal({
            title: "¡Correcto!",
            text: "Una Dieta se ha añadida",
            timer: 2000,
            type: "success"
        });
    }
});