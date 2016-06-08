/**
 * Created by a618052 on 08/06/2016.
 */

AutoForm.addHooks(['insertDateForm'], {
    onSuccess: function(formType, result) {
        $('select').each(function() { //Select2 doesnt clear on its own
            $(this).select2('val', '');
        });
    }
})