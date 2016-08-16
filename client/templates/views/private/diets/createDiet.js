AutoForm.addHooks('insertDietForm', {
    OnSubmit: function () {
        dietsSchemaForm.clean(this.currentDoc);
        console.log("Diet doc with auto values", this.currentDoc);
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