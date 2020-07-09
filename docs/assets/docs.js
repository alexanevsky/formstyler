$(document).ready(function() {
    if (location.hash) {
        $('#nav').find('a[href="'+location.hash+'"]').tab('show');
    } else {
        $('#nav').find('a:first').tab('show');
    }

    $('input, select').formstyler({
        file: {
            inputClass: 'form-control',
            browseClass: 'btn btn-primary'
        },
        select: {
            searchClass: 'form-control form-control-sm'
        }
    });
});