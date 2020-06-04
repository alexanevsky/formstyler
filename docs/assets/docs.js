$(document).ready(function() {
    if (location.hash) {
        $('#nav').find('a[href="'+location.hash+'"]').tab('show');
    } else {
        $('#nav').find('a:first').tab('show');
    }

    $('input, select').formstyler({
        file: {
            class: 'form-control',
            buttonClass: 'btn btn-success',
            multipleLimit: 5
        },
        locale: {
            file: {
                placeholder: 'Nothing selected'
            }
        }
    });
});