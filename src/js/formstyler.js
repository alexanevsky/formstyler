/*
 * jQuery FormStyler v3.1.0
 * https://github.com/Alexanevsky/formstyler
 *
 * Copyright 2020 Alexanevsky (https://lashchevsky.me)
 * Copyright 2012-2017 Dimox (http://dimox.name)
 *
 * Released under the MIT license.
 *
 * Date: 2020-06-04
 */

;(function(factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); // AMD
    }
    else if (typeof exports === 'object') {
        module.exports = factory($ || require('jquery')); // CommonJS
    }
    else {
        factory(jQuery);
    }
}(function($) {
    'use strict';

    var pluginName = 'formstyler';

    // > Set Defaults
    var defaults = {
        idSuffix: '-formstyler',
        locale: 'en',

        // Checkbox Defaults
        checkboxImage: '',
        checkboxIcon: '',
        checkboxSwitch: false,
        checkboxColored: false,

        // Input File Defaults
        fileNumberLimit: 3,
        fileIconUpload: '',
        fileIconFile: '',
        fileImageUpload: '',
        fileImageFile: '',
        fileButtonClass: '',

        // Input Number Defaults
        numberIconPlus: '',
        numberIconMinus: '',
        numberImagePlus: '',
        numberImageMinus: '',
        numberColored: false,

        // Select Defaults
        selectSearchLimit: 30,
        selectSearchClass: '',
        selectTriggerIcon: '',
        selectTriggerImage: '',
        selectVisibleOptions: 0,
        selectSmartPositioning: true,
        multiselectToggleLimit: 10,
        multiselectNumberLimit: 5,
        multiselectOptionImage: '',
        multiselectOptionIcon: '',
        multiselectColored: false,

        // Default Localces
        localeCustom: {},
        locales: {
            'en': {
                filePlaceholder: 'No file selected',
                fileBrowseEmpty: 'Browse a file',
                fileBrowse: 'Browse',
                fileNumber: 'Selected files: %s',
                selectPlaceholder: 'Select...',
                selectSearchNotFound: 'No matches found',
                selectSearchPlaceholder: 'Search...',
                multiselectPlaceholder: 'No option selected',
                multiselectAll: 'All selected',
                multiselectNumber: 'Selected %s of %a',
                multiselectToggle: 'Toggle all'
            },
            'ru': {
                filePlaceholder: 'Файл не выбран',
                fileBrowseEmpty: 'Выберите файл',
                fileBrowse: 'Выбрать',
                fileNumber: 'Выбрано файлов: %s',
                selectPlaceholder: 'Выберите...',
                selectSearchNotFound: 'Совпадений не найдено',
                selectSearchPlaceholder: 'Поиск...',
                multiselectPlaceholder: 'Ничего не выбрано',
                multiselectAll: 'Выбраны все',
                multiselectNumber: 'Выбрано %s из %a',
                multiselectToggle: 'Выбрать все'
            }
        },
        onSelectOpened: function() {},
        onSelectClosed: function() {},
        onFormStyled: function() {}
    };

    // > Class Names
    var classnames = {
        check: {
            checkbox: 'formstyler-checkbox',
            checkblock: 'formstyler-checkblock',
            dot: 'formstyler-checkbox-dot',
            icon: 'formstyler-checkbox-icon',
            image: 'formstyler-checkbox-image'
        },
        switch: {
            switchbox: 'formstyler-switchbox',
            switchblock: 'formstyler-switchblock',
            dot: 'formstyler-switchbox-dot'
        },
        radio: {
            radio: 'formstyler-radio',
            radioblock: 'formstyler-radioblock',
            dot: 'formstyler-radio-dot'
        },
        file: {
            file: 'formstyler-file',
            empty: 'formstyler-file-empty',
            name: 'formstyler-file-name',
            nameValue: 'formstyler-file-name-value',
            nameImage: 'formstyler-file-name-image',
            nameIcon: 'formstyler-file-name-icon',
            button: 'formstyler-file-button',
            buttonSpan: 'formstyler-file-button-span',
            buttonValue: 'formstyler-file-button-value',
            buttonImage: 'formstyler-file-button-image',
            buttonIcon: 'formstyler-file-button-icon'
        },
        number: {
            number: 'formstyler-number',
            button: 'formstyler-number-button',
            buttonAngle: 'formstyler-number-button-angle',
            buttonImage: 'formstyler-number-button-image',
            buttonIcon: 'formstyler-number-button-icon',
            plus: 'formstyler-number-plus',
            minus: 'formstyler-number-minus',
            angle: 'formstyler-number-angle',
            image: 'formstyler-number-image',
            icon: 'formstyler-number-icon'
        },
        select: {
            container: 'formstyler-select',
            multiple: 'formstyler-multiselect',
            select: 'formstyler-select-box',
            selectText: 'formstyler-select-text',
            selectTextPlaceholder: 'formstyler-select-text-placeholder',
            selectTrigger: 'formstyler-select-trigger-angle',
            selectTriggerIcon: 'formstyler-select-trigger-icon',
            selectTriggerImage: 'formstyler-select-trigger-image',
            dropdown: 'formstyler-select-dropdown',
            toggle: 'formstyler-select-toggle',
            search: 'formstyler-select-search',
            searchCustom: 'formstyler-select-search-custom',
            searchInput: 'formstyler-select-search-input',
            searchNotfound: 'formstyler-select-notfound',
            list: 'formstyler-select-list',
            option: 'formstyler-select-option',
            optionPlaceholder: 'formstyler-select-option-placeholder',
            optionOptgrouped: 'formstyler-optgrouped',
            checkDot: 'formstyler-select-check-dot',
            checkImage: 'formstyler-select-check-image',
            checkIcon: 'formstyler-select-check-icon',
            optgroup: 'formstyler-select-optgroup',
            posUp: 'formstyler-select-pos-up',
            posDown: 'formstyler-select-pos-down'
        },
        label: {
            label: 'formstyler-label',
        },
        status: {
            opened: 'formstyler-opened',
            changed: 'formstyler-changed',
            hovered: 'formstyler-hovered',
            focused: 'formstyler-focused',
            disabled: 'formstyler-disabled',
            checked: 'formstyler-checked',
            colored: 'formstyler-colored',
            styled: 'formstyler-styled',
            iconed: 'formstyler-iconed',
            selected: 'formstyler-selected'
        }
    };

    // Set Plugin
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        var locale = this.options.locale;

        if (this.options.locales[locale] === undefined)
            locale = defaults.locale;

        $.extend(this.options, this.options.locales[locale]);

        if (this.options.localeCustom)
            $.extend(this.options, this.options.localeCustom);

        this.init();
    }

    Plugin.prototype = {

        // > Init
        init: function() {

            var $el = $(this.element);
            var opt = this.options;

            var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;
            var Android = (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;

            function Attributes() {
                if ($el.attr('id') !== undefined && $el.attr('id') !== '') {
                    this.id = $el.attr('id') + opt.idSuffix;
                }
                this.title = $el.attr('title');
                this.classes = $el.attr('class');
                this.data = $el.data();
            }

            // > Checkbox
            if ($el.is(':checkbox')) {

                var checkboxStyle = 'default';
                var checkboxIcon = '';
                var checkboxImage = '';

                // Detect Checkbox Style
                if ($el.data('switch') == true) checkboxStyle = 'switch';
                else if ($el.data('image')) checkboxStyle = 'image';
                else if ($el.data('icon')) checkboxStyle = 'icon';
                else if (opt.checkboxSwitch) checkboxStyle = 'switch';
                else if (opt.checkboxImage) checkboxStyle = 'image';
                else if (opt.checkboxIcon) checkboxStyle = 'icon';

                // Checkbox Style Elements
                if (checkboxStyle == 'icon') {

                    checkboxIcon = $el.data('icon') || opt.checkboxIcon;
                    if (!checkboxIcon) checkboxStyle = 'default';
                }
                else if (checkboxStyle == 'image') {

                    checkboxImage = $el.data('image') || opt.checkboxImage;
                    if (!checkboxImage) checkboxStyle = 'default';
                }

                var checkboxOutput = function() {

                    // >> Checkbox Switch
                    if (checkboxStyle == 'switch') {

                        // Wrap switchbox block
                        if ($el.next('label[for='+$el.attr('id')+']').length && !$el.parent().hasClass(classnames.switch.switchblock)) {

                            $el.next('label[for='+$el.attr('id')+']').addClass(classnames.label.label).wrap('<div class="'+classnames.switch.switchblock+'"></div>');
                            $el.prependTo($el.next('.'+classnames.switch.switchblock));
                        }

                        // Create switchbox
                        var att = new Attributes();
                        var $checkbox = $('<div class="'+classnames.switch.switchbox+'"><div class="'+classnames.switch.dot+'"></div></div>')
                            .attr({
                                id: att.id,
                                title: att.title
                            })
                            .addClass(att.classes)
                            .data(att.data)
                        ;

                        $el.after($checkbox).prependTo($checkbox);

                        if ($el.is(':disabled') && $checkbox.parent().hasClass(classnames.switch.switchblock))
                            $checkbox.parent().addClass(classnames.status.disabled);
                    }

                    // >> Default Checkbox
                    else {

                        // Wrap checkbox block
                        if ($el.next('label[for='+$el.attr('id')+']').length && !$el.parent().hasClass(classnames.check.checkblock)) {

                            $el.next('label[for='+$el.attr('id')+']').addClass(classnames.label.label).wrap('<div class="'+classnames.check.checkblock+'"></div>');
                            $el.prependTo($el.next('.'+classnames.check.checkblock));
                        }

                        // Set checkbox style
                        var checkboxDot = '';

                        if (checkboxStyle == 'image')
                            checkboxDot = '<img class="'+classnames.check.image+'" src="'+checkboxImage+'" alt="">';
                        else if (checkboxStyle == 'icon')
                            checkboxDot = '<i class="'+classnames.check.icon+' '+checkboxIcon+'"></i>';
                        else
                            checkboxDot = '<div class="'+classnames.check.dot+'"></div>';

                        // Create checkbox
                        var att = new Attributes();
                        var $checkbox = $('<div class="'+classnames.check.checkbox+'">'+checkboxDot+'</div>')
                            .attr({
                                id: att.id,
                                title: att.title
                            })
                            .addClass(att.classes)
                            .data(att.data)
                        ;

                        $el.after($checkbox).prependTo($checkbox);

                        if ($el.is(':disabled') && $checkbox.parent().hasClass(classnames.check.checkblock))
                            $checkbox.parent().addClass(classnames.status.disabled);
                    }

                    // >> Checkbox Params
                    if ($el.data('colored') === true || (opt.checkboxColored == true && $el.data('colored') !== false))
                        $checkbox.addClass(classnames.status.colored);

                    if ($el.is(':checked'))
                        $checkbox.addClass(classnames.status.checked);

                    if ($el.is(':disabled'))
                        $checkbox.addClass(classnames.status.disabled);

                    // Click pseudocheckbox
                    $checkbox.click(function(e) {
                        e.preventDefault();
                        $el.triggerHandler('click');
                        if (!$checkbox.is('.'+classnames.status.disabled)) {
                            if ($el.is(':checked')) {
                                $el.prop('checked', false);
                                $checkbox.removeClass(classnames.status.checked);
                            } else {
                                $el.prop('checked', true);
                                $checkbox.addClass(classnames.status.checked);
                            }
                            $el.focus().change();
                            $checkbox.removeClass(classnames.status.focused);
                        }
                    });

                    // Click label
                    $el.closest('label').add('label[for="' + $el.attr('id') + '"]').on('click.formstyler', function(e) {
                        if (!$(e.target).is('a') && !$(e.target).closest($checkbox).length) {
                            $checkbox.triggerHandler('click');
                            e.preventDefault();
                        }
                    });

                    $el
                    // Switch by Space or Enter
                    .on('change.formstyler', function() {
                        if ($el.is(':checked')) $checkbox.addClass(classnames.status.checked);
                        else $checkbox.removeClass(classnames.status.checked);
                    })
                    // Switch checkbox in label
                    .on('keydown.formstyler', function(e) {
                        if (e.which == 32) $checkbox.click();
                    })
                    .on('focus.formstyler', function() {
                        if (!$checkbox.is('.'+classnames.status.disabled)) $checkbox.addClass(classnames.status.focused);
                    })
                    .on('blur.formstyler', function() {
                        $checkbox.removeClass(classnames.status.focused);
                    });

                    // Label hover
                    $('label[for="' + $el.attr('id') + '"]').hover(function() {
                        if (!$el.is(':disabled')) $checkbox.addClass(classnames.status.hovered);
                    }, function() {
                        $checkbox.removeClass(classnames.status.hovered);
                    });

                };

                checkboxOutput();

                // Checkbox Refresh
                $el.on('refresh', function() {
                    $el.closest('label').add('label[for="' + $el.attr('id') + '"]').off('.formstyler');
                    $el.off('.formstyler').parent().before($el).remove();

                    if ($el.closest('.'+classnames.check.checkblock).length)
                        $el.closest('.'+classnames.check.checkblock).children().unwrap();

                    if ($el.closest('.'+classnames.switch.switchblock).length)
                        $el.closest('.'+classnames.switch.switchblock).children().unwrap();


                    checkboxOutput();
                });
            }
            // End Checkbox

            // > Radio
            else if ($el.is(':radio')) {

                var radioOutput = function() {

                    // Wrap radio block
                    if ($el.next('label[for='+$el.attr('id')+']').length && !$el.parent().hasClass(classnames.radio.radioblock)) {

                            $el.next('label[for='+$el.attr('id')+']').addClass(classnames.label.label).wrap('<div class="'+classnames.radio.radioblock+'"></div>');
                            $el.prependTo($el.next('.'+classnames.radio.radioblock));
                        }

                    var att = new Attributes();
                    var $radio = $('<div class="'+classnames.radio.radio+'"><div class="'+classnames.radio.dot+'"></div></div>')
                        .attr({
                            id: att.id,
                            title: att.title
                        })
                        .addClass(att.classes)
                        .data(att.data)
                    ;

                    $el.after($radio).prependTo($radio);

                    if ($el.is(':checked'))
                        $radio.addClass(classnames.status.checked);

                    if ($el.is(':disabled'))
                        $radio.addClass(classnames.status.disabled);

                    if ($el.is(':disabled') && $radio.parent().hasClass(classnames.radio.radioblock))
                            $radio.parent().addClass(classnames.status.disabled);

                    // Detect radio parent (http://stackoverflow.com/a/27733847)
                    $.fn.commonParents = function() {
                        var cachedThis = this;
                        return cachedThis.first().parents().filter(function() {
                            return $(this).find(cachedThis).length === cachedThis.length;
                        });
                    };
                    $.fn.commonParent = function() {
                        return $(this).commonParents().first();
                    };

                    // Click pseudoradio
                    $radio.click(function(e) {
                        e.preventDefault();
                        $el.triggerHandler('click');
                        if (!$radio.is('.'+classnames.status.disabled)) {
                            var inputName = $('input[name="' + $el.attr('name') + '"]');
                            inputName.commonParent().find(inputName).prop('checked', false).parent().removeClass(classnames.status.checked);
                            $el.prop('checked', true).parent().addClass(classnames.status.checked);
                            $el.focus().change();
                            $radio.removeClass(classnames.status.focused);
                        }
                    });
                    // Click label
                    $el.closest('label').add('label[for="' + $el.attr('id') + '"]').on('click.formstyler', function(e) {
                        if (!$(e.target).is('a') && !$(e.target).closest($radio).length) {
                            $radio.triggerHandler('click');
                            e.preventDefault();
                        }
                    });
                    // Switch by keys
                    $el.on('change.formstyler', function() {
                        $el.parent().addClass(classnames.status.checked);
                    })
                    .on('focus.formstyler', function() {
                        if (!$radio.is('.'+classnames.status.disabled)) $radio.addClass(classnames.status.focused);
                    })
                    .on('blur.formstyler', function() {
                        $radio.removeClass(classnames.status.focused);
                    });

                    // Label hover
                    $('label[for="' + $el.attr('id') + '"]').hover(function() {
                        if (!$el.is(':disabled')) $radio.addClass(classnames.status.hovered);
                    }, function() {
                        $radio.removeClass(classnames.status.hovered);
                    });

                };

                radioOutput();

                // Radio Refresh
                $el.on('refresh', function() {
                    $el.closest('label').add('label[for="' + $el.attr('id') + '"]').off('.formstyler');
                    $el.off('.formstyler').parent().before($el).remove();

                    if ($el.closest('.'+classnames.radio.radioblock).length)
                        $el.closest('.'+classnames.radio.radioblock).children().unwrap();

                    radioOutput();
                });
            }
            // End Radio

            // > File
            else if ($el.is(':file')) {

                var fileOutput = function() {

                    // Button class
                    var buttonClass = opt.fileButtonClass || $el.data('button-class') || classnames.status.styled;

                    if ($el.is(':disabled'))
                        buttonClass = classnames.status.styled;


                    // File params
                    var placeholder = $el.data('placeholder') || opt.filePlaceholder;
                    var browse = $el.data('browse') || opt.fileBrowse;
                    var browseEmpty = $el.data('browse-empty') || opt.fileBrowseEmpty;
                    var iconFile = '';
                    var iconUpload = '';

                    // File icons
                    if ($el.data('image-file'))
                        iconFile = '<img class="'+classnames.file.nameImage+'" src="'+$el.data('image-file')+'" alt="">';
                    else if ($el.data('icon-file'))
                        iconFile = '<i class="'+classnames.file.nameIcon+' '+$el.data('icon-file')+'"></i>';
                    else if (opt.fileImageFile)
                        iconFile = '<img class="'+classnames.file.nameImage+'" src="'+opt.fileImageFile+'" alt="">';
                    else if (opt.fileIconFile)
                        iconFile = '<i class="'+classnames.file.nameIcon+' '+opt.fileIconFile+'"></i>';
                    if ($el.data('image-upload'))
                        iconUpload = '<img class="'+classnames.file.buttonImage+'" src="'+$el.data('image-upload')+'" alt="">';
                    else if ($el.data('icon-upload'))
                        iconUpload = '<i class="'+classnames.file.buttonIcon+' '+$el.data('icon-upload')+'"></i>';
                    else if (opt.fileImageUpload)
                        iconUpload = '<img class="'+classnames.file.buttonImage+'" src="'+opt.fileImageUpload+'" alt="">';
                    else if (opt.fileIconUpload)
                        iconUpload = '<i class="'+classnames.file.buttonIcon+' '+opt.fileIconUpload+'"></i>';

                    if (iconUpload)
                        buttonClass = buttonClass + ' '+classnames.status.iconed;

                    // Create file
                    var att = new Attributes();
                    var $file =
                        $('<div class="'+classnames.file.file+' '+classnames.file.empty+'">' +
                                '<div class="'+classnames.file.button+' ' + buttonClass + '"><span class="'+classnames.file.buttonSpan+'">' + iconUpload + '<span class="'+classnames.file.buttonValue+'">' + browseEmpty + '</span></span></div>' +
                                '<div class="'+classnames.file.name+'">' + iconFile + '<span class="'+classnames.file.nameValue+'">' + placeholder + '</span></div>' +
                            '</div>')
                        .attr({
                            id: att.id,
                            title: att.title
                        })
                        .addClass(att.classes)
                        .data(att.data)
                    ;

                    $el.after($file).appendTo($file);
                    if ($el.is(':disabled')) $file.addClass(classnames.status.disabled);

                    var value = $el.val();
                    var name = $('.'+classnames.file.nameValue, $file);

                    // Dont clear file name while refreshing
                    if (value) name.text(value.replace(/.+[\\\/]/, ''));

                    $el.on('change.formstyler', function() {
                        var value = $el.val();
                        if ($el.is('[multiple]')) {
                            value = '';
                            var files = $el[0].files;
                            var filescount = files.length;

                            if (filescount > 0) {
                                var number_min = $el.data('number-limit') || opt.fileNumberLimit;

                                if (filescount >= number_min) {
                                    var number = $el.data('number') || opt.fileNumber;
                                    number = number.replace('%s', filescount);
                                    value = number;
                                }
                                else {
                                    var filesnames = [];
                                    $.each(files, function(files_i, files_el) {
                                        filesnames[files_i] = files_el.name;
                                    });
                                    value = filesnames.join(', ');
                                }
                            }
                        }
                        name.text(value.replace(/.+[\\\/]/, ''));
                        if (value === '') {
                            name.text(placeholder);
                            $file.find(classnames.file.buttonValue).text(browseEmpty);
                            $file.addClass(classnames.file.empty);
                        } else {
                            $file.find(classnames.file.buttonValue).text(browse);
                            $file.removeClass(classnames.file.empty);
                        }
                    })
                    .on('focus.formstyler', function() {
                        $file.addClass(classnames.status.focused);
                    })
                    .on('blur.formstyler', function() {
                        $file.removeClass(classnames.status.focused);
                    })
                    .on('click.formstyler', function() {
                        $file.removeClass(classnames.status.focused);
                    });

                    // Label hover
                    $('label[for="' + $el.attr('id') + '"]').hover(function() {
                        if (!$el.is(':disabled')) $file.addClass(classnames.status.hovered);
                    }, function() {
                        $file.removeClass(classnames.status.hovered);
                    });

                };

                fileOutput();

                // File Refresh
                $el.on('refresh', function() {
                    $el.off('.formstyler').parent().before($el).remove();
                    fileOutput();
                });
            }
            // End File

            // > Number
            else if ($el.is('input[type="number"]')) {

                var numberOutput = function() {

                    // Number style
                    var numberButtonClass = '';
                    var numberButtonPlus = '';
                    var numberButtonMinus = '';

                    if ($el.data('image-plus') && $el.data('image-minus')) {
                        numberButtonClass = classnames.number.buttonImage;
                        numberButtonPlus = '<img class="'+classnames.number.image+'" src="'+$el.data('image-plus')+'" alt="">';
                        numberButtonMinus = '<img class="'+classnames.number.image+'" src="'+$el.data('image-minus')+'" alt="">';
                    }
                    else if ($el.data('icon-plus') && $el.data('icon-minus')) {
                        numberButtonClass = classnames.number.buttonIcon;
                        numberButtonPlus = '<i class="'+classnames.number.icon+' '+$el.data('icon-plus')+'"></i>';
                        numberButtonMinus = '<i class="'+classnames.number.icon+' '+$el.data('icon-minus')+'"></i>';
                    }
                    else if (opt.numberImagePlus && opt.numberImageMinus) {
                        numberButtonClass = classnames.number.buttonImage;
                        numberButtonPlus = '<img class="'+classnames.number.image+'" src="'+opt.numberImagePlus+'" alt="">';
                        numberButtonMinus = '<img class="'+classnames.number.image+'" src="'+opt.numberImageMinus+'" alt="">';
                    }
                    else if (opt.numberIconPlus && opt.numberIconMinus) {
                        numberButtonClass = classnames.number.buttonIcon;
                        numberButtonPlus = '<i class="'+classnames.number.icon+' '+opt.numberIconPlus+'"></i>';
                        numberButtonMinus = '<i class="'+classnames.number.icon+' '+opt.numberIconMinus+'"></i>';
                    }
                    else {
                        numberButtonClass = classnames.number.buttonAngle;
                        numberButtonPlus = '';
                        numberButtonMinus = '';
                    }

                    // Create Number
                    var att = new Attributes();
                    var number =
                        $('<div class="'+classnames.number.number+'">' +
                                '<div class="'+classnames.number.button+' '+classnames.number.plus+' '+numberButtonClass+'">'+numberButtonPlus+'</div>' +
                                '<div class="'+classnames.number.button+' '+classnames.number.minus+' '+numberButtonClass+'">'+numberButtonMinus+'</div>' +
                            '</div>')
                        .attr({
                            id: att.id,
                            title: att.title
                        })
                    ;

                    $el.after(number).prependTo(number);

                    if ($el.data('colored') === true || (opt.numberColored == true && $el.data('colored') !== false))
                        number.addClass(classnames.status.colored);

                    if ($el.is(':disabled')) number.addClass(classnames.status.disabled);

                    var min,
                        max,
                        step,
                        timeout = null,
                        interval = null;

                    if ($el.attr('min') !== undefined) min = $el.attr('min');
                    if ($el.attr('max') !== undefined) max = $el.attr('max');
                    if ($el.attr('step') !== undefined && $.isNumeric($el.attr('step')))
                        step = Number($el.attr('step'));
                    else
                        step = Number(1);

                    var changeValue = function(spin) {
                        var value = $el.val(),
                                newValue;

                        if (!$.isNumeric(value)) {
                            value = 0;
                            $el.val('0');
                        }

                        if (spin.is('.'+classnames.number.minus)) {
                            newValue = Number(value) - step;
                        } else if (spin.is('.'+classnames.number.plus)) {
                            newValue = Number(value) + step;
                        }

                        // Zeros fix
                        var decimals = (step.toString().split('.')[1] || []).length;
                        if (decimals > 0) {
                            var multiplier = '1';
                            while (multiplier.length <= decimals) multiplier = multiplier + '0';
                            newValue = Math.round(newValue * multiplier) / multiplier;
                        }

                        if ($.isNumeric(min) && $.isNumeric(max)) {
                            if (newValue >= min && newValue <= max) $el.val(newValue);
                        } else if ($.isNumeric(min) && !$.isNumeric(max)) {
                            if (newValue >= min) $el.val(newValue);
                        } else if (!$.isNumeric(min) && $.isNumeric(max)) {
                            if (newValue <= max) $el.val(newValue);
                        } else {
                            $el.val(newValue);
                        }
                    };

                    if (!number.is('.'+classnames.status.disabled)) {
                        number.on('mousedown', '.'+classnames.number.button, function() {
                            var spin = $(this);
                            changeValue(spin);
                            timeout = setTimeout(function(){
                                interval = setInterval(function(){ changeValue(spin); }, 40);
                            }, 350);
                        }).on('mouseup mouseout', '.'+classnames.number.button, function() {
                            clearTimeout(timeout);
                            clearInterval(interval);
                        }).on('mouseup', '.'+classnames.number.button, function() {
                            $el.change().trigger('input');
                        });
                        $el.on('focus.formstyler', function() {
                            number.addClass(classnames.status.focused);
                        })
                        .on('blur.formstyler', function() {
                            number.removeClass(classnames.status.focused);
                        });
                    }

                    // Label hover
                    $('label[for="' + $el.attr('id') + '"]').hover(function() {
                        if (!$el.is(':disabled')) number.addClass(classnames.status.hovered);
                    }, function() {
                        number.removeClass(classnames.status.hovered);
                    });

                };

                numberOutput();

                // Number Refresh
                $el.on('refresh', function() {
                    $el.off('.formstyler').closest('.'+classnames.number.number).before($el).remove();
                    numberOutput();
                });

                // Type fix
                if (opt.numberValCheck) {

                    $el.keyup(function() {

                        var value = parseInt($el.val());
                        var max = $el.attr('max').length ? parseInt($el.attr('max')) : null;
                        var min = $el.attr('min').length ? parseInt($el.attr('min')) : null;

                        if (max !== null && value > max)
                            $el.val(max);

                        else if (min !== null && value < min)
                            $el.val(min);
                    });
                }
            }
            // End Number

            // > Select
            else if ($el.is('select')) {

                var selectboxOutput = function() {

                    // Stop page scrolling while selectbox is hovered
                    function preventScrolling(selector) {

                        var scrollDiff = selector.prop('scrollHeight') - selector.outerHeight();
                        var wheelDelta = null;
                        var scrollTop = null;

                        selector.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function(e) {

                            wheelDelta = (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) ? 1 : -1;
                            scrollTop = selector.scrollTop();

                            if ((scrollTop >= scrollDiff && wheelDelta < 0) || (scrollTop <= 0 && wheelDelta > 0)) {
                                e.stopPropagation();
                                e.preventDefault();
                            }

                        });
                    }

                    var $option = $('option', $el);
                    var list = '';

                    // Option Checkbox
                    var checkDot = '';

                    if ($el.is('[multiple]')) {

                        if ($el.data('check-image'))
                            checkDot = '<img class="'+classnames.select.checkImage+'" src="'+$el.data('check-image')+'" alt="">';

                        else if ($el.data('check-icon'))
                            checkDot = '<i class="'+classnames.select.checkIcon+' '+$el.data('check-icon')+'"></i>';

                        else if (opt.multiselectOptionImage)
                            checkDot = '<img class="'+classnames.select.checkImage+'" src="'+opt.multiselectOptionImage+'" alt="">';

                        else if (opt.multiselectOptionIcon)
                            checkDot = '<i class="'+classnames.select.checkIcon+' '+opt.multiselectOptionIcon+'"></i>';
                        else
                            checkDot = '<span class="'+classnames.select.checkDot+'"></span>'
                    }


                    // >> Make list of selectbox
                    function makeList() {
                        for (var i = 0; i < $option.length; i++) {
                            var $op = $option.eq(i);
                            var li = '';
                            var liOptgroup = '';
                            var liClasses = [];
                            var liAttrs = [];
                            var data = $op.data();

                            liClasses.push(classnames.select.option);

                            if ($op.prop('selected'))
                                liClasses.push(classnames.status.selected);

                            if ($op.is(':disabled'))
                                liClasses.push(classnames.status.disabled);

                            if ($op.is(':first-child') && $op.val() === '')
                                liClasses.push(classnames.select.optionPlaceholder);

                            if ($op.attr('class') !== undefined)
                                liClasses.push($op.attr('class'));

                            if ($op.attr('id') !== undefined && $op.attr('id') !== '') {
                                liAttrs.push('id="' + $op.attr('id') + opt.idSuffix + '"');
                                liAttrs.push('data-id="' + $op.attr('id') + '"');
                            }

                            if ($op.attr('title') !== undefined && $option.attr('title') !== '')
                                liAttrs.push('title="' + $op.attr('title') + '"');

                            for (var k in data) {
                                if (data[k] !== '')
                                    liAttrs.push('data-' + k + '="' + data[k] + '"');
                            }

                            if ($op.parent().is('optgroup')) {

                                liClasses.push(classnames.select.optionOptgrouped);
                                liAttrs.push('data-optgroup="'+$op.parent().index()+'"');

                                if ($op.is(':first-child'))
                                    liOptgroup = '<li data-index="'+$op.parent().index()+'" class="' + classnames.select.optgroup + '">' + $op.parent().attr('label') + '</label>';
                            }

                            liAttrs.unshift('class="' + liClasses.join(' ') + '"');

                            if ($op.data('html')) {
                                li = '<li ' + liAttrs.join(' ') + ' data-text="'+$op.text()+'">' + checkDot + $op.data('html') + '</li>';
                            } else {
                                li = '<li ' + liAttrs.join(' ') + '>' + checkDot + $op.text() + '</li>';
                            }


                            if (liOptgroup != '')
                                li = liOptgroup + li;

                            list += li;
                        }
                    }

                    // >> Single Select
                    function doSelect() {

                        var searchHTML = '';
                        var selectPlaceholder = $el.data('placeholder') || opt.selectPlaceholder;
                        var selectSearchLimit = $el.data('search-limit') || opt.selectSearchLimit;
                        var selectSearchNotFound = $el.data('search-not-found') || opt.selectSearchNotFound;
                        var selectSearchPlaceholder = $el.data('search-placeholder') || opt.selectSearchPlaceholder;
                        var selectSmartPositioning = $el.data('smart-positioning') || opt.selectSmartPositioning;
                        var selectTrigger = '';

                        if ($el.data('image'))
                            selectTrigger = '<img class="'+classnames.select.selectTriggerImage+'" src="'+$el.data('image')+'" alt="">';

                        else if ($el.data('icon'))
                            selectTrigger = '<i class="'+classnames.select.selectTriggerIcon+' '+$el.data('icon')+'"></i>';

                        else if (opt.selectTriggerImage)
                            selectTrigger = '<img class="'+classnames.select.selectTriggerImage+'" src="'+opt.selectTriggerImage+'" alt="">';

                        else if (opt.selectTriggerIcon)
                            selectTrigger = '<i class="'+classnames.select.selectTriggerIcon+' '+opt.selectTriggerIcon+'"></i>';

                        else
                            selectTrigger = '<div class="'+classnames.select.selectTrigger+'"></div>';

                        var att = new Attributes();
                        var $select =
                            $('<div class="'+classnames.select.container+'">' +
                                    '<div class="'+classnames.select.select+'">' +
                                        '<div class="'+classnames.select.selectText+'"></div>' +
                                        selectTrigger +
                                    '</div>' +
                                '</div>')
                            .attr({
                                id: att.id,
                                title: att.title
                            })
                            .addClass(att.classes)
                            .data(att.data)
                        ;

                        $el.after($select).prependTo($select);

                        var selectZIndex = $select.css('z-index');
                        selectZIndex = (selectZIndex > 0 ) ? selectZIndex : 1;
                        var $selectbox = $('.'+classnames.select.select, $select);
                        var $selectText = $('.'+classnames.select.selectText, $select);
                        var $optionSelected = $option.filter(':selected');

                        makeList();

                        var searchClass = $el.data('search-class') || opt.selectSearchClass || classnames.select.searchInput;
                        var searchInputClass = $el.data('search-class') || opt.selectSearchClass || classnames.select.searchInput;

                        if (searchInputClass != classnames.select.searchInput)
                            searchClass = classnames.select.search+' '+classnames.select.searchCustom;
                        else
                            searchClass = classnames.select.search;

                        if (selectSearchLimit !== false && selectSearchLimit <= $option.length) searchHTML =
                            '<div class="'+searchClass+'"><input type="text" class="'+searchInputClass+'" autocomplete="off" placeholder="' + selectSearchPlaceholder + '"></div>' +
                            '<div class="'+classnames.select.searchNotfound+'">' + selectSearchNotFound + '</div>';
                        var $dropdown =
                            $('<div class="'+classnames.select.dropdown+'">' +
                                    searchHTML + '<ul class="'+classnames.select.list+'">' + list + '</ul>' +
                                '</div>');
                        $select.append($dropdown);
                        var $list = $('.'+classnames.select.list, $dropdown);
                        var $li = $('.'+classnames.select.option+', .'+classnames.select.optgroup, $dropdown);
                        var $search = $('.'+classnames.select.search+' input', $dropdown);
                        var $notfound = $('.'+classnames.select.searchNotfound, $dropdown).hide();
                        if ($li.length < selectSearchLimit) $search.parent().hide();

                        // Display placeholder
                        if ($option.first().text() !== '' && $option.first().val() === '' && $option.first().is(':selected') && selectPlaceholder === false) {
                            $selectText.text($optionSelected.text()).addClass(classnames.select.selectTextPlaceholder);
                        } else if ($option.first().val() === '' && $option.first().is(':selected') && selectPlaceholder !== false) {
                            $selectText.text(selectPlaceholder).addClass(classnames.select.selectTextPlaceholder);
                        } else {
                            $selectText.text($optionSelected.text());
                        }

                        // Hide first  empty option
                        if ($option.first().text() === '' && $el.data('placeholder') !== '') {
                            $li.first().hide();
                        }

                        var selectHeight = $select.outerHeight(true);
                        var searchHeight = $search.parent().outerHeight(true) || 0;
                        var isMaxHeight = $list.css('max-height');
                        var $liSelected = $li.filter('.'+classnames.status.selected);
                        if ($liSelected.length < 1) $li.first().addClass(classnames.status.selected);
                        if ($li.data('li-height') === undefined) {
                            var liOuterHeight = $li.outerHeight();
                            if (selectPlaceholder !== false) liOuterHeight = $li.eq(1).outerHeight();
                            $li.data('li-height', liOuterHeight);
                        }
                        var position = $dropdown.css('top');
                        if ($dropdown.css('left') == 'auto') $dropdown.css({left: 0});
                        if ($dropdown.css('top') == 'auto') {
                            $dropdown.css({top: selectHeight});
                            position = selectHeight;
                        }
                        $dropdown.hide();

                        // If selected not-default option
                        if ($liSelected.length) {
                            if ($option.first().text() != $optionSelected.text()) {
                                $select.addClass(classnames.status.changed);
                            }
                        }

                        // If disabled
                        if ($el.is(':disabled')) {
                            $select.addClass(classnames.status.disabled);
                            return false;
                        }

                        // Click pseudoselect
                        $selectbox.click(function() {

                            // Callback close
                            if ($('.'+classnames.select.container).filter('.'+classnames.status.opened).length) {
                                opt.onSelectClosed.call($('.'+classnames.select.container).filter('.'+classnames.status.opened));
                            }

                            $el.focus();

                            // iOS Fix
                            if (iOS) return;

                            // Dropdown position
                            var win = $(window);
                            var liHeight = $li.data('li-height');
                            var topOffset = $select.offset().top;
                            var bottomOffset = win.height() - selectHeight - (topOffset - win.scrollTop());
                            var visible = $el.data('visible-options');
                            if (visible === undefined || visible === '') visible = opt.selectVisibleOptions;
                            var minHeight = liHeight * 5;
                            var newHeight = liHeight * visible;
                            if (visible > 0 && visible < 6) minHeight = newHeight;
                            if (visible === 0) newHeight = 'auto';

                            var dropDown = function() {
                                $dropdown.height('auto').css({bottom: 'auto', top: position});
                                var maxHeightBottom = function() {
                                    $list.css('max-height', Math.floor((bottomOffset - 20 - searchHeight) / liHeight) * liHeight);
                                };
                                maxHeightBottom();
                                $list.css('max-height', newHeight);
                                if (isMaxHeight != 'none') {
                                    $list.css('max-height', isMaxHeight);
                                }
                                if (bottomOffset < ($dropdown.outerHeight() + 20)) {
                                    maxHeightBottom();
                                }
                            };

                            var dropUp = function() {
                                $dropdown.height('auto').css({top: 'auto', bottom: position});
                                var maxHeightTop = function() {
                                    $list.css('max-height', Math.floor((topOffset - win.scrollTop() - 20 - searchHeight) / liHeight) * liHeight);
                                };
                                maxHeightTop();
                                $list.css('max-height', newHeight);
                                if (isMaxHeight != 'none') {
                                    $list.css('max-height', isMaxHeight);
                                }
                                if ((topOffset - win.scrollTop() - 20) < ($dropdown.outerHeight() + 20)) {
                                    maxHeightTop();
                                }
                            };

                            if (selectSmartPositioning === true || selectSmartPositioning === 1) {
                                if (bottomOffset > (minHeight + searchHeight + 20)) {
                                    dropDown();
                                    $select.removeClass(classnames.select.posUp).addClass(classnames.select.posDown);
                                } else {
                                    dropUp();
                                    $select.removeClass(classnames.select.posDown).addClass(classnames.select.posUp);
                                }
                            } else if (selectSmartPositioning === false || selectSmartPositioning === 0) {
                                if (bottomOffset > (minHeight + searchHeight + 20)) {
                                    dropDown();
                                    $select.removeClass(classnames.select.posUp).addClass(classnames.select.posDown);
                                }
                            } else {
                                $dropdown.height('auto').css({bottom: 'auto', top: position});
                                $list.css('max-height', newHeight);
                                if (isMaxHeight != 'none') {
                                    $list.css('max-height', isMaxHeight);
                                }
                            }

                            // Fix right border of window
                            if ($select.offset().left + $dropdown.outerWidth() > win.width()) {
                                $dropdown.css({left: 'auto', right: 0, width: 'auto'});
                            }

                            // Dropdown opening
                            $('.'+classnames.select.container).css({zIndex: (selectZIndex - 1)}).removeClass(classnames.status.opened);
                            $select.css({zIndex: selectZIndex});

                            if ($dropdown.is(':hidden')) {
                                $('.'+classnames.select.dropdown+':visible').hide();
                                $dropdown.show();
                                $select.addClass(classnames.status.opened+' '+classnames.status.focused);

                                opt.onSelectOpened.call($select);
                            }
                            else {
                                $dropdown.hide();
                                $select.removeClass(classnames.status.opened+' '+classnames.select.posUp+' '+classnames.select.posDown);

                                if ($('.'+classnames.select.container).filter('.'+classnames.status.opened).length) {
                                    opt.onSelectClosed.call($select);
                                }
                            }

                            // Search
                            if ($search.length) {
                                $search.val('').keyup();
                                $notfound.hide();
                                $search.keyup(function() {
                                    var query = $(this).val();

                                    if (query == '') {
                                        $li.show();
                                    }

                                    else {
                                        $li.each(function() {
                                            if (($(this).is(':first-child') && $(this).hasClass(classnames.select.optionPlaceholder)) || !$(this).hasClass(classnames.select.option) || !$(this).html().match(new RegExp('.*?' + query + '.*?', 'i'))) {
                                                $(this).hide();
                                            } else {
                                                $(this).show();
                                            }

                                            if ($(this).is(':visible') && $(this).data('optgroup') !== undefined)
                                                $(this).parent().find('.'+classnames.select.optgroup+'[data-index='+$(this).data('optgroup')+']').show();
                                        });
                                    }

                                    // Hide empty first option
                                    if ($option.first().text() === '' && $el.data('placeholder') !== '') {
                                        $li.first().hide();
                                    }
                                    if ($li.filter(':visible').length < 1) {
                                        $notfound.show();
                                    } else {
                                        $notfound.hide();
                                    }
                                });
                            }

                            // Scroll to selected option
                            if ($li.filter('.'+classnames.status.selected).length) {
                                if ($el.val() === '') {
                                    $list.scrollTop(0);
                                } else {
                                    if ( ($list.innerHeight() / liHeight) % 2 !== 0 )
                                        liHeight = liHeight / 2;

                                    $list.scrollTop($list.scrollTop() + $li.filter('.'+classnames.status.selected).position().top - $list.innerHeight() / 2 + liHeight);
                                }
                            }

                            preventScrolling($list);

                        });

                        // Option hovered
                        var selectedText = $li.filter('.'+classnames.status.selected).text();

                        // Option clicked
                        $li.filter(':not(.'+classnames.status.disabled+'):not(.'+classnames.select.optgroup+')').click(function() {
                            $el.focus();
                            var t = $(this);
                            var liText = t.text();
                            if (!t.is('.'+classnames.status.selected)) {
                                var index = t.index();
                                index -= t.prevAll('.'+classnames.select.optgroup).length;
                                t.addClass(classnames.status.selected).siblings().removeClass(classnames.status.selected);
                                $option.prop('selected', false).eq(index).prop('selected', true);
                                selectedText = liText;
                                $selectText.text(liText);

                                $el.change();
                            }
                            $dropdown.hide();
                            $select.removeClass(classnames.status.opened+' '+classnames.select.posUp+' '+classnames.select.posDown);

                            opt.onSelectClosed.call($select);

                        });

                        // Changeing
                        $el.on('change.formstyler', function() {

                            $selectText.text($option.filter(':selected').text());
                            if ($option.filter(':selected').val() === '')
                                $selectText.addClass(classnames.select.selectTextPlaceholder);
                            else
                                $selectText.removeClass(classnames.select.selectTextPlaceholder);

                            $li.removeClass(classnames.status.selected).not('.'+classnames.select.optgroup).eq($el[0].selectedIndex).addClass(classnames.status.selected);

                            if ($option.first().text() != $li.filter('.'+classnames.status.selected).text()) {
                                $select.addClass(classnames.status.changed);
                            } else {
                                $select.removeClass(classnames.status.changed);
                            }
                        })
                        .on('focus.formstyler', function() {
                            $select.addClass(classnames.status.focused);
                            $(classnames.select.container).not('.'+classnames.status.focused).removeClass(classnames.status.opened+' '+classnames.select.posUp+' '+classnames.select.posDown).find('.'+classnames.select.dropdown).hide();
                        })
                        .on('blur.formstyler', function() {
                            $select.removeClass(classnames.status.focused);
                        })

                        // Change by keyboard
                        .on('keydown.formstyler keyup.formstyler', function(e) {
                            var liHeight = $li.data('li-height');
                            if ($el.val() === '') {
                                $selectText.text(selectPlaceholder).addClass(classnames.select.selectTextPlaceholder);
                            } else {
                                $selectText.text($option.filter(':selected').text());
                            }
                            $li.removeClass(classnames.status.selected).not('.'+classnames.select.optgroup).eq($el[0].selectedIndex).addClass(classnames.status.selected);

                            // Top, Left, Page Up, Home
                            if (e.which == 38 || e.which == 37 || e.which == 33 || e.which == 36) {
                                if ($el.val() === '') {
                                    $list.scrollTop(0);
                                } else {
                                    $list.scrollTop($list.scrollTop() + $li.filter('.'+classnames.status.selected).position().top);
                                }
                            }
                            // Down, Rifgr, Page Down, End
                            if (e.which == 40 || e.which == 39 || e.which == 34 || e.which == 35) {
                                $list.scrollTop($list.scrollTop() + $li.filter('.'+classnames.status.selected).position().top - $list.innerHeight() + liHeight);
                            }
                            // Enter
                            if (e.which == 13) {
                                e.preventDefault();
                                $dropdown.hide();
                                $select.removeClass(classnames.status.opened+' '+classnames.select.posUp+' '+classnames.select.posDown);

                                opt.onSelectClosed.call($select);
                            }
                        }).on('keydown.formstyler', function(e) {
                            // Space
                            if (e.which == 32) {
                                e.preventDefault();
                                $selectbox.click();
                            }
                        });

                        // Hide if click outside
                        if (!onDocumentClick.registered) {
                            $(document).on('click', onDocumentClick);
                            onDocumentClick.registered = true;
                        }

                        // Label hover
                        $('label[for="' + $el.attr('id') + '"]').hover(function() {
                            if (!$el.is(':disabled')) $selectbox.addClass(classnames.status.hovered);
                        }, function() {
                            $selectbox.removeClass(classnames.status.hovered);
                        });

                    } // End Single Select

                    // >> Multiple Select
                    function doMultipleSelect() {


                        // Variables
                        var searchHTML = '';
                        var toggleHTML = '';
                        var selectPlaceholder = $el.data('placeholder') || opt.multiselectPlaceholder;
                        var selectAll = $el.data('all') || opt.multiselectAll;
                        var selectSearchLimit = $el.data('search-limit') || opt.selectSearchLimit;
                        var selectSearchNotFound = $el.data('search-not-found') || opt.selectSearchNotFound;
                        var selectSearchPlaceholder = $el.data('search-placeholder') || opt.selectSearchPlaceholder;
                        var selectSmartPositioning = $el.data('smart-positioning') || opt.selectSmartPositioning;
                        var selectNumber = $el.data('number') || opt.multiselectNumber;
                        var selectNumberLimit = $el.data('number-limit') || opt.multiselectNumberLimit;
                        var selectToggle = $el.data('toggle') || opt.multiselectToggle;
                        var selectToggleLimit = $el.data('toggle-limit') || opt.multiselectToggleLimit;
                        var selectTrigger = '';

                        // Selected values
                        function selectedOptionsText($option) {

                            var $optionSelected = $option.filter(':selected');
                            var count = $option.length;
                            var countSelected = $optionSelected.length;
                            var countMax = selectNumberLimit;
                            var text = '';


                            if (!countSelected)
                                text = selectPlaceholder;
                            else if (count == countSelected)
                                text = selectAll;
                            else if (countSelected >= countMax) {
                                text = selectNumber;
                                text = text.replace('%s', countSelected).replace('%a', count);
                            }
                            else {
                                var selectedList = [];
                                $optionSelected.each(function(i, thisoption) {
                                    selectedList.push($(thisoption).text());
                                });

                                text = selectedList.join(', ');
                            }

                            return text;
                        }

                        // Create select
                        if ($el.data('image'))
                            selectTrigger = '<img class="'+classnames.select.selectTriggerImage+'" src="'+$el.data('image')+'" alt="">';

                        else if ($el.data('icon'))
                            selectTrigger = '<i class="'+classnames.select.selectTriggerIcon+' '+$el.data('icon')+'"></i>';

                        else if (opt.selectTriggerImage)
                            selectTrigger = '<img class="'+classnames.select.selectTriggerImage+'" src="'+opt.selectTriggerImage+'" alt="">';

                        else if (opt.selectTriggerIcon)
                            selectTrigger = '<i class="'+classnames.select.selectTriggerIcon+' '+opt.selectTriggerIcon+'"></i>';

                        else
                            selectTrigger = '<div class="'+classnames.select.selectTrigger+'"></div>';

                        var att = new Attributes();
                        var $select =
                            $('<div class="'+classnames.select.container+' '+classnames.select.multiple+'">' +
                                    '<div class="'+classnames.select.select+'">' +
                                        '<div class="'+classnames.select.selectText+'"></div>' +
                                        selectTrigger +
                                    '</div>' +
                                '</div>')
                            .attr({
                                id: att.id,
                                title: att.title
                            })
                            .addClass(att.classes)
                            .data(att.data)
                        ;

                        $el.after($select).prependTo($select);

                        if ($el.data('colored') === true || (opt.multiselectColored == true && $el.data('colored') !== false))
                            $select.addClass(classnames.status.colored);

                        var selectZIndex = $select.css('z-index');
                        selectZIndex = (selectZIndex > 0 ) ? selectZIndex : 1;
                        var $selectbox = $('.'+classnames.select.select, $select);
                        var $selectText = $('.'+classnames.select.selectText, $select);
                        var $optionSelected = $option.filter(':selected');

                        makeList();

                        var searchClass = $el.data('search-class') || opt.selectSearchClass || classnames.select.searchInput;
                        var searchInputClass = $el.data('search-class') || opt.selectSearchClass || classnames.select.searchInput;

                        if (searchInputClass != classnames.select.searchInput)
                            searchClass = classnames.select.search+' '+classnames.select.searchCustom;
                        else
                            searchClass = classnames.select.search;

                        if (selectSearchLimit !== false && selectSearchLimit <= $option.length)
                            searchHTML = '<div class="'+searchClass+'"><input type="text" class="'+searchInputClass+'" autocomplete="off" placeholder="' + selectSearchPlaceholder + '"></div>' + '<div class="'+classnames.select.searchNotfound+'">' + selectSearchNotFound + '</div>';

                        if (selectToggleLimit !== false && $option.length >= selectToggleLimit)
                            toggleHTML = '<div class="'+classnames.select.toggle+'">'+checkDot+selectToggle+'</div>';

                        var $dropdown = $('<div class="'+classnames.select.dropdown+'">' + searchHTML + toggleHTML + '<ul class="'+classnames.select.list+'">' + list + '</ul>' + '</div>');

                        $select.append($dropdown);
                        var $list = $('.'+classnames.select.list, $dropdown);
                        var $li = $('.'+classnames.select.option+', .'+classnames.select.optgroup, $dropdown);
                        var $search = $('.'+classnames.select.search+' input', $dropdown);
                        var $notfound = $('.'+classnames.select.searchNotfound, $dropdown).hide();
                        var $toggle = $('.'+classnames.select.toggle, $dropdown);
                        if ($li.length < selectSearchLimit) $search.parent().hide();

                        // Display placeholder
                        if (!$optionSelected.length)
                            $selectText.text(selectPlaceholder).addClass(classnames.select.selectTextPlaceholder);
                        else
                            $selectText.text(selectedOptionsText($option)).removeClass(classnames.select.selectTextPlaceholder);

                        if ($optionSelected.length == $option.length)
                            $toggle.addClass(classnames.status.selected);

                        var selectHeight = $select.outerHeight(true);
                        var searchHeight = $search.parent().outerHeight(true) || 0;
                        var toggleHeight = $toggle.outerHeight(true) || 0;
                        var isMaxHeight = $list.css('max-height');
                        var $liSelected = $li.filter('.'+classnames.status.selected);
                        if ($li.data('li-height') === undefined) {
                            var liOuterHeight = $li.outerHeight();
                            if (selectPlaceholder !== false) liOuterHeight = $li.eq(1).outerHeight();
                            $li.data('li-height', liOuterHeight);
                        }
                        var position = $dropdown.css('top');
                        if ($dropdown.css('left') == 'auto') $dropdown.css({left: 0});
                        if ($dropdown.css('top') == 'auto') {
                            $dropdown.css({top: selectHeight});
                            position = selectHeight;
                        }
                        $dropdown.hide();

                        // If disabled
                        if ($el.is(':disabled')) {
                            $select.addClass(classnames.status.disabled);
                            return false;
                        }

                        // Click pseudoselect
                        $selectbox.click(function() {

                            // Callback close
                            if ($('.'+classnames.select.container).filter('.'+classnames.status.opened).length) {
                                opt.onSelectClosed.call($('.'+classnames.select.container).filter('.'+classnames.status.opened));
                            }

                            $el.focus();

                            // iOS Fix
                            // if (iOS) return;

                            // Dropdown position
                            var win = $(window);
                            var liHeight = $li.data('li-height');
                            var topOffset = $select.offset().top;
                            var bottomOffset = win.height() - selectHeight - (topOffset - win.scrollTop());
                            var visible = $el.data('visible-options');
                            if (visible === undefined || visible === '') visible = opt.selectVisibleOptions;
                            var minHeight = liHeight * 5;
                            var newHeight = liHeight * visible;
                            if (visible > 0 && visible < 6) minHeight = newHeight;
                            if (visible === 0) newHeight = 'auto';

                            var dropDown = function() {
                                $dropdown.height('auto').css({bottom: 'auto', top: position});
                                var maxHeightBottom = function() {
                                    $list.css('max-height', Math.floor((bottomOffset - 20 - searchHeight - toggleHeight) / liHeight) * liHeight);
                                };
                                maxHeightBottom();
                                $list.css('max-height', newHeight);
                                if (isMaxHeight != 'none') {
                                    $list.css('max-height', isMaxHeight);
                                }
                                if (bottomOffset < ($dropdown.outerHeight() + 20)) {
                                    maxHeightBottom();
                                }
                            };

                            var dropUp = function() {
                                $dropdown.height('auto').css({top: 'auto', bottom: position});
                                var maxHeightTop = function() {
                                    $list.css('max-height', Math.floor((topOffset - win.scrollTop() - 20 - searchHeight - toggleHeight) / liHeight) * liHeight);
                                };
                                maxHeightTop();
                                $list.css('max-height', newHeight);
                                if (isMaxHeight != 'none') {
                                    $list.css('max-height', isMaxHeight);
                                }
                                if ((topOffset - win.scrollTop() - 20) < ($dropdown.outerHeight() + 20)) {
                                    maxHeightTop();
                                }
                            };

                            if (selectSmartPositioning === true || selectSmartPositioning === 1) {
                                if (bottomOffset > (minHeight + searchHeight + toggleHeight + 20)) {
                                    dropDown();
                                    $select.removeClass(classnames.select.posUp).addClass(classnames.select.posDown);
                                } else {
                                    dropUp();
                                    $select.removeClass(classnames.select.posDown).addClass(classnames.select.posUp);
                                }
                            } else if (selectSmartPositioning === false || selectSmartPositioning === 0) {
                                if (bottomOffset > (minHeight + searchHeight + toggleHeight + 20)) {
                                    dropDown();
                                    $select.removeClass(classnames.select.posUp).addClass(classnames.select.posDown);
                                }
                            } else {
                                $dropdown.height('auto').css({bottom: 'auto', top: position});
                                $list.css('max-height', newHeight);
                                if (isMaxHeight != 'none') {
                                    $list.css('max-height', isMaxHeight);
                                }
                            }

                            // Fix right border of window
                            if ($select.offset().left + $dropdown.outerWidth() > win.width()) {
                                $dropdown.css({left: 'auto', right: 0, width: 'auto'});
                            }

                            // Dropdown opening
                            $('.'+classnames.select.container).css({zIndex: (selectZIndex - 1)}).removeClass(classnames.status.opened);
                            $select.css({zIndex: selectZIndex});

                            if ($dropdown.is(':hidden')) {
                                $('.'+classnames.select.dropdown+':visible').hide();
                                $dropdown.show();
                                $select.addClass(classnames.status.opened+' '+classnames.status.focused);

                                opt.onSelectOpened.call($select);
                            }
                            else {
                                $dropdown.hide();
                                $select.removeClass(classnames.status.opened+' '+classnames.select.posUp+' '+classnames.select.posDown);

                                if ($('.'+classnames.select.container).filter('.'+classnames.status.opened).length) {
                                    opt.onSelectClosed.call($select);
                                }
                            }

                            // Search
                            if ($search.length) {
                                $search.val('').keyup();
                                $notfound.hide();
                                $search.keyup(function() {
                                    var query = $(this).val();

                                    if (query == '') {
                                        $li.show();
                                    }

                                    else {
                                        $li.each(function() {
                                            if (($(this).is(':first-child') && $(this).hasClass(classnames.select.optionPlaceholder)) || !$(this).hasClass(classnames.select.option) || !$(this).html().match(new RegExp('.*?' + query + '.*?', 'i'))) {
                                                $(this).hide();
                                            } else {
                                                $(this).show();
                                            }

                                            if ($(this).is(':visible') && $(this).data('optgroup') !== undefined)
                                                $(this).parent().find('.'+classnames.select.optgroup+'[data-index='+$(this).data('optgroup')+']').show();
                                        });
                                    }

                                    if ($li.not('.'+classnames.select.optgroup).filter(':visible').not('.'+classnames.status.selected).length < 1)
                                        $toggle.addClass(classnames.status.selected);
                                    else
                                        $toggle.removeClass(classnames.status.selected);

                                    if ($li.filter(':visible').length < 1) {
                                        $notfound.show();
                                        $toggle.hide();
                                    } else {
                                        $notfound.hide();
                                        $toggle.show();
                                    }
                                });
                            }

                            // Scroll to selected option
                            if ($li.filter('.'+classnames.status.selected).length) {
                                if ($el.val() === '') {
                                    $list.scrollTop(0);
                                } else {
                                    if ( ($list.innerHeight() / liHeight) % 2 !== 0 )
                                        liHeight = liHeight / 2;

                                    $list.scrollTop($list.scrollTop() + $li.filter('.'+classnames.status.selected).first().position().top - $list.innerHeight() / 2 + liHeight);
                                }
                            }

                            preventScrolling($list);

                        });

                        // Option hovered
                        var selectedText = $li.filter('.'+classnames.status.selected).text();

                        // Option clicked
                        $li.filter(':not(.'+classnames.status.disabled+'):not(.'+classnames.select.optgroup+')').click(function() {
                            $el.focus();
                            var t = $(this);
                            var index = t.index();
                            index -= t.prevAll('.'+classnames.select.optgroup).length;
                            if (!t.is('.'+classnames.status.selected))
                                $option.eq(index).prop('selected', true);
                            else
                                $option.eq(index).prop('selected', false);

                            $el.change();

                        });

                        $toggle.click(function() {

                            $el.focus();

                            $option.each(function(i, op) {
                                var $op = $(op);

                                if ($li.not('.'+classnames.select.optgroup).eq(i).is(':visible') && !$op.is(':disabled')) {
                                    if ($toggle.hasClass(classnames.status.selected))
                                        $op.prop('selected', false);
                                    else
                                        $op.prop('selected', true);
                                }
                            });

                            $el.change();
                        });

                        // Changeing
                        $el.on('change.formstyler', function() {

                            $selectText.text(selectedOptionsText($option));

                            if (!$option.filter(':selected').length) {
                                $select.addClass(classnames.status.changed);
                                $selectText.addClass(classnames.select.selectTextPlaceholder);
                            }
                            else {
                                $select.removeClass(classnames.status.changed);
                                $selectText.removeClass(classnames.select.selectTextPlaceholder);
                            }

                            $option.each(function(i, op) {
                                var $op = $(op);
                                if ($op.is(':selected'))
                                    $li.not('.'+classnames.select.optgroup).eq(i).addClass(classnames.status.selected);
                                else
                                    $li.not('.'+classnames.select.optgroup).eq(i).removeClass(classnames.status.selected);
                            });

                            if ($li.not('.'+classnames.select.optgroup).filter(':visible').not('.'+classnames.status.selected).length < 1)
                                $toggle.addClass(classnames.status.selected);
                            else
                                $toggle.removeClass(classnames.status.selected);
                        })
                        .on('focus.formstyler', function() {
                            $select.addClass(classnames.status.focused);
                            $(classnames.select.container).not('.'+classnames.status.focused).removeClass(classnames.status.opened+' '+classnames.select.posUp+' '+classnames.select.posDown).find('.'+classnames.select.dropdown).hide();
                        })
                        .on('blur.formstyler', function() {
                            $select.removeClass(classnames.status.focused);
                        })

                        // Change by keyboard
                        .on('keydown.formstyler keyup.formstyler', function(e) {

                            var liHeight = $li.data('li-height');

                            $selectText.text(selectedOptionsText($option));

                            if (!$option.filter(':selected').length) {
                                $select.addClass(classnames.status.changed);
                                $selectText.addClass(classnames.select.selectTextPlaceholder);
                            }
                            else {
                                $select.removeClass(classnames.status.changed);
                                $selectText.removeClass(classnames.select.selectTextPlaceholder);
                            }

                            $option.each(function(i, op) {
                                var $op = $(op);
                                if ($op.is(':selected'))
                                    $li.not('.'+classnames.select.optgroup).eq(i).addClass(classnames.status.selected);
                                else
                                    $li.not('.'+classnames.select.optgroup).eq(i).removeClass(classnames.status.selected);
                            });

                            if ($li.not('.'+classnames.select.optgroup).filter(':visible').not('.'+classnames.status.selected).length < 1)
                                $toggle.addClass(classnames.status.selected);
                            else
                                $toggle.removeClass(classnames.status.selected);

                            // Top, Left, Page Up, Home
                            if (e.which == 38 || e.which == 37 || e.which == 33 || e.which == 36) {
                                if ($el.val() === '') {
                                    $list.scrollTop(0);
                                } else {
                                    $list.scrollTop($list.scrollTop() + $li.filter('.'+classnames.status.selected).position().top);
                                }
                            }
                            // Down, Right, Page Down, End
                            if (e.which == 40 || e.which == 39 || e.which == 34 || e.which == 35) {
                                $list.scrollTop($list.scrollTop() + $li.filter('.'+classnames.status.selected).position().top - $list.innerHeight() + liHeight);
                            }
                            // Enter
                            if (e.which == 13) {
                                e.preventDefault();
                                $dropdown.hide();
                                $select.removeClass(classnames.status.opened+' '+classnames.select.posUp+' '+classnames.select.posDown);

                                opt.onSelectClosed.call($select);
                            }
                        }).on('keydown.formstyler', function(e) {
                            // Space
                            if (e.which == 32) {
                                e.preventDefault();
                                $selectbox.click();
                            }
                        });

                        // Hide if click outside
                        if (!onDocumentClick.registered) {
                            $(document).on('click', onDocumentClick);
                            onDocumentClick.registered = true;
                        }

                        // Label hover
                        $('label[for="' + $el.attr('id') + '"]').hover(function() {
                            if (!$el.is(':disabled')) $selectbox.addClass(classnames.status.hovered);
                        }, function() {
                            $selectbox.removeClass(classnames.status.hovered);
                        });

                    } // End Multiple Select

                    if ($el.is('[multiple]')) {
                        // if (Android || iOS) return;
                        doMultipleSelect();
                    } else {
                        doSelect();
                    }

                }; // End Select

                selectboxOutput();

                // Select Refresh
                $el.on('refresh', function() {
                    $el.off('.formstyler').parent().before($el).remove();
                    selectboxOutput();
                });

            }
            // End Select

        }, // End Init

        // > Destuctor
        destroy: function() {

            var $el = $(this.element);

            if ($el.is(':checkbox') || $el.is(':radio')) {
                $el.removeData('_' + pluginName).off('.formstyler refresh').removeAttr('style').parent().before($el).remove();
                $el.closest('label').add('label[for="' + $el.attr('id') + '"]').off('.formstyler');
            } else if ($el.is('input[type="number"]')) {
                $el.removeData('_' + pluginName).off('.formstyler refresh').closest('.fformstyler-number').before($el).remove();
            } else if ($el.is(':file') || $el.is('select')) {
                $el.removeData('_' + pluginName).off('.formstyler refresh').removeAttr('style').parent().before($el).remove();
            }

        } // End Destuctor

    };

    $.fn[pluginName] = function(options) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            this.each(function() {
                if (!$.data(this, '_' + pluginName)) {
                    $.data(this, '_' + pluginName, new Plugin(this, options));
                }
            })
            .promise()
            .done(function() {
                var opt = $(this[0]).data('_' + pluginName);
                if (opt) opt.options.onFormStyled.call();
            });
            return this;
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            var returns;
            this.each(function() {
                var instance = $.data(this, '_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
            return returns !== undefined ? returns : this;
        }
    };

    // > Fix
    // Hide select dropdown when click outside
    function onDocumentClick(e) {
        if (!$(e.target).parents().hasClass(classnames.select.container) && e.target.nodeName != 'OPTION') {
            if ($('.'+classnames.select.container+'.'+classnames.status.opened).length) {
                var $select = $('.'+classnames.select.container+'.'+classnames.status.opened);
                var $search = $('.'+classnames.select.search+' input', $select);
                var $dropdown = $('.'+classnames.select.dropdown, $select);
                var opt = $select.find('select').data('_' + pluginName).options;

                opt.onSelectClosed.call($select);

                if ($search.length) $search.val('').keyup();
                $dropdown.hide();
                $select.removeClass(classnames.status.focused+' '+classnames.status.opened+' '+classnames.select.posUp+' '+classnames.select.posSown);
            }
        }
    }
    onDocumentClick.registered = false;

}));