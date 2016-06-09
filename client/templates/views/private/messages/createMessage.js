/**
 * Created by Casa on 12/05/2016.
 */

AutoForm.addHooks(['createMessages'], {
    onSuccess: function(formType, result) {
        $('select').each(function() { //Select2 doesnt clear on its own
            $(this).select2('val', '');
        });
    }
})