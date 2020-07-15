/*!
 * jQuery FormStyler v4.0.2
 * https://github.com/alexanevsky/formstyler
 *
 * Copyright 2020 Alexanevsky (https://lashchevsky.me)
 * Copyright 2012-2017 Dimox (http://dimox.name)
 *
 * Released under the MIT license.
 *
 * Date: 2020-07-15
 */

 /*
 * TOC
 *
 * Define variables
 * - Define defaults
 * - Define locales
 * - Define class names
 * Define support functions
 * - Is true
 * Define plugin
 * Prototypes
 * - Init
 * - Build checkbox or switchbox
 * -- Definitions
 * -- Handler
 * -- Destructor
 * -- Actions ans listeners
 * - Build radio
 * -- Definitions
 * -- Handler
 * -- Destructor
 * -- Actions and listeners
 * - Build number
 * -- Definitions
 * -- Handler
 * -- Destructor
 * -- Actions and listeners
 * - Build file
 * -- Definitions
 * -- Handler
 * -- Destructor
 * -- Actions and listeners
 * - Build select
 * -- Definitions
 * -- List maker
 * -- Value maker
 * -- Prevent scrolling
 * -- Open dropdown
 * -- Close dropdown
 * -- On document click
 * -- Handler
 * -- Destructor
 * -- Actions and listeners
 * Register plugin
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

    // > Define variables
    var pluginName = 'formstyler';

    // >> Define defaults
    var defaults = {
        idSuffix:           '-formstyler',
        lang:               'en',

        // Checkboxes defaults
        checkbox: {
            switcher:       false,
            colored:        false,
            image:          null,
            icon:           null
        },

        // Radio defaults
        radio: {
            colored:        false
        },

        // Number defaults
        number: {
            spin:           false,
            colored:        false,
            plusClass:      null,
            minusClass:     null,
            plusImage:      null,
            minusImage:     null,
            plusIcon:       null,
            minusIcon:      null
        },

        // File defaults
        file: {
            multipleLimit:      3,
            inputClass:         null,
            browseClass:        null,
            inputImage:         null,
            inputIcon:          null,
            browseImage:        null,
            browseIcon:         null
        },

        // Select defaults
        select: {
            small:              false,
            smartMinHeight:     150,
            smartPosition:      true,
            dropdownOffset:     20,
            dropdownSpeed:      150,
            searchLimit:        10,
            searchMinlength:    0,
            searchPause:        0,
            searchClass:        null,
            triggerImage:       null,
            triggerIcon:        null,
            multipleLimit:      3,
            toggleLimit:        10,
            optionImage:        null,
            optionIcon:         null
        },

        // Callbacks
        onSelectOpened: function() {},
        onSelectClosed: function() {},
        onFormStyled: function() {}
    }

    // >> Define locales
    var locales = {
        en: {
            file: {
                placeholder:        'No file selected',
                browse:             'Browse',
                selectedMultiple:   'Selected files: %s'
            },
            select: {
                placeholder:        'Select...',
                searchPlaceholder:  'Search',
                notFound:           'Matches not found',
                selectedMultiple:   'Selected %s of %a',
                selectedAll:        'Selected all',
                toggle:             'Toggle all'
            }
        },
        ru: {
            file: {
                placeholder:        'Файл не выбран',
                browse:             'Выбрать',
                selectedMultiple:   'Выбрано файлов: %s'
            },
            select: {
                placeholder:        'Выберите...',
                searchPlaceholder:  'Поиск',
                notFound:           'Совпадений не найдено',
                selectedMultiple:   'Выбрано %s из %a',
                selectedAll:        'Выбрано всё',
                toggle:             'Переключить'
            }
        }
    }

    // >> Define class names
    var classes = {
        check: {
            checkbox:       'formstyler-checkbox',
            checkblock:     'formstyler-checkblock',
            dot:            'formstyler-checkbox-dot',
            image:          'formstyler-checkbox-image',
            icon:           'formstyler-checkbox-icon'
        },
        switch: {
            switchbox:      'formstyler-switchbox',
            switchblock:    'formstyler-switchblock',
            dot:            'formstyler-switchbox-dot'
        },
        radio: {
            radio:          'formstyler-radio',
            radioblock:     'formstyler-radioblock',
            dot:            'formstyler-radio-dot'
        },
        number: {
            number:         'formstyler-number',
            button:         'formstyler-number-button',
            buttonText:     'formstyler-number-button-text',
            buttonImage:    'formstyler-number-button-image',
            buttonIcon:     'formstyler-number-button-icon',
            plus:           'formstyler-number-plus',
            minus:          'formstyler-number-minus',
            image:          'formstyler-number-image',
            icon:           'formstyler-number-icon',
            text:           'formstyler-number-text'
        },
        file: {
            file:           'formstyler-file',
            name:           'formstyler-file-name',
            nameValue:      'formstyler-file-name-value',
            nameImage:      'formstyler-file-name-image',
            nameIcon:       'formstyler-file-name-icon',
            button:         'formstyler-file-button',
            buttonBrowse:   'formstyler-file-button-browse',
            buttonImage:    'formstyler-file-button-image',
            buttonIcon:     'formstyler-file-button-icon'
        },
        select: {
            select:             'formstyler-select',
            container:          'formstyler-select-container',
            value:              'formstyler-select-value',
            valuePlaceholder:   'formstyler-select-placeholder',
            trigger:            'formstyler-select-trigger',
            triggerImage:       'formstyler-select-trigger-image',
            triggerIcon:        'formstyler-select-trigger-icon',
            triggerHandler:     'formstyler-select-trigger-handler',
            dropdown:           'formstyler-select-dropdown',
            list:               'formstyler-select-list',
            optgroup:           'formstyler-select-optgroup',
            option:             'formstyler-select-option',
            optionPlaceholder:  'formstyler-select-placeholder',
            optionOptgrouped:   'formstyler-select-optgrouped',
            optionImage:        'formstyler-select-option-image',
            optionIcon:         'formstyler-select-option-icon',
            search:             'formstyler-select-search',
            searchInput:        'formstyler-select-search-input',
            notFound:           'formstyler-select-notfound',
            toggle:             'formstyler-select-toggle',
            toggleImage:        'formstyler-select-toggle-image',
            toggleIcon:         'formstyler-select-toggle-icon'
        },
        label: {
            label:      'formstyler-label'
        },
        status: {
            checked:    'formstyler-checked',
            colored:    'formstyler-colored',
            disabled:   'formstyler-disabled',
            focused:    'formstyler-focused',
            hovered:    'formstyler-hovered',
            iconed:     'formstyler-iconed',
            imaged:     'formstyler-imaged',
            multiple:   'formstyler-multiple',
            noId:       'formstyler-noid',
            opened:     'formstyler-opened',
            selected:   'formstyler-selected',
            small:      'formstyler-small',
            styled:     'formstyler-styled'
        }
    }

    // > Define support functions
    // >> Is true
    function isTrue(value) {
        if (!value) {
            return false;
        } else if (value === false || value === 'false' || value === 0 || value === '0' || value === 'null') {
            return false;
        } else {
            return true;
        }
    }

    // > Define plugin
    function Formstyler(element, input) {
        var dataset = element.dataset;
        var options = {};
        var locale = {};
        var inputOptions = {};
        var inputLocale = typeof(input.locale) === 'object' ? input.locale : {};

        if (!input) {
            input = {};
        }

        $.each(defaults, function(key, value) {
            if (typeof(value) === 'object') {
                inputOptions[key] = $.extend({}, value, (typeof(input[key]) === 'object' ? input[key] : {}), dataset);
            }
        });

        options = $.extend({}, defaults, input, dataset, inputOptions);

        $.each(locales[options.lang], function(key, value) {
            locale[key] = $.extend({}, value, (typeof(inputLocale[key]) === 'object' ? inputLocale[key] : {}), dataset);
        });

        this.element = element;
        this.options = options;
        this.locale = locale;

        this.init();
    }

    // > Prototypes
    Formstyler.prototype = {

        // >> Init
        init: function() {
            var foo = this;

            if ($(this.element).is(':checkbox')) {
                this._checkbox(this.element);
            } else if ($(this.element).is(':radio')) {
                this._radio(this.element);
            } else if ($(this.element).is('input[type="number"]')) {
                this._number(this.element);
            } else if ($(this.element).is(':file')) {
                this._file(this.element);
            } else if ($(this.element).is('select')) {
                this._select(this.element);
            }
        },

        // >> Build checkbox or switchbox
        _checkbox: function(element) {
            // >>> Definitions
            var $el = typeof element === 'object' ? $(element) : $(this.element);
            var opt = this.options;

            // >>> Handler
            var handler = function() {
                if (isTrue(opt.checkbox.switcher)) {
                    // Wrap switchbox block
                    if ($el.next('label[for='+$el.attr('id')+']').length && !$el.parent().hasClass(classes.switch.switchblock)) {
                        $el.next('label[for='+$el.attr('id')+']').addClass(classes.label.label).wrap('<div class="'+classes.switch.switchblock+'"></div>');
                        $el.prependTo($el.next('.'+classes.switch.switchblock));
                    }

                    // Create switchbox
                    var checkboxString = '<div class="'+classes.switch.switchbox+'"><div class="'+classes.switch.dot+'"></div></div>';
                } else {
                    // Wrap checkbox block
                    if ($el.next('label[for='+$el.attr('id')+']').length && !$el.parent().hasClass(classes.check.checkblock)) {
                        $el.next('label[for='+$el.attr('id')+']').addClass(classes.label.label).wrap('<div class="'+classes.check.checkblock+'"></div>');
                        $el.prependTo($el.next('.'+classes.check.checkblock));
                    }

                    // Define checkbox dot
                    var checkboxDot = '';

                    if (opt.checkbox.image && isTrue(opt.checkbox.image)) {
                        checkboxDot = '<img class="'+classes.check.image+'" src="'+opt.checkbox.image+'" alt="">';
                    } else if (opt.checkbox.icon && isTrue(opt.checkbox.icon)) {
                        checkboxDot = '<i class="'+classes.check.icon+' '+opt.checkbox.icon+'"></i>';
                    } else {
                        checkboxDot = '<div class="'+classes.check.dot+'"></div>';
                    }

                    // Create checkbox
                    var checkboxString = '<div class="'+classes.check.checkbox+'">'+checkboxDot+'</div>';
                }

                // Create checkbox
                var $checkbox = $(checkboxString)
                    .attr({
                        id: ($el.attr('id') !== undefined && $el.attr('id') !== '')
                            ? $el.attr('id') + opt.idSuffix
                            : null,
                        title: $el.attr('title')
                            ? $el.attr('title')
                            : null
                    })
                    .addClass($el.attr('class'))
                    .data($el.data());

                // Prepend checkbox
                $el.after($checkbox).prependTo($checkbox);

                // Add status classes
                if ($el.is(':checked')) {
                    $checkbox.addClass(classes.status.checked);
                }

                if ($el.is(':disabled')) {
                    $checkbox.addClass(classes.status.disabled);

                    if ($checkbox.parent().hasClass(classes.check.switchblock) || $checkbox.parent().hasClass(classes.check.checkblock)) {
                        $checkbox.parent().addClass(classes.status.disabled);
                    }
                }

                if (isTrue(opt.checkbox.colored)) {
                    $checkbox.addClass(classes.status.colored);
                }

                // Click pseudocheckbox
                $checkbox.click(function(e) {
                    e.preventDefault();

                    $el.triggerHandler('click');

                    if (!$checkbox.is('.'+classes.status.disabled)) {
                        if ($el.is(':checked')) {
                            $el.prop('checked', false);
                            $checkbox.removeClass(classes.status.checked);
                        } else {
                            $el.prop('checked', true);
                            $checkbox.addClass(classes.status.checked);
                        }

                        $el.focus().change();

                        /*$checkbox.removeClass(classes.status.focused);*/
                    }
                });

                // Click label
                $el.closest('label').add('label[for="' + $el.attr('id') + '"]').on('click.formstyler', function(e) {
                    if (!$(e.target).is('a') && !$(e.target).closest($checkbox).length) {
                        $checkbox.triggerHandler('click');
                        e.preventDefault();
                    }
                });

                // Listeners
                $el
                .on('change.formstyler', function() {
                    if ($el.is(':checked')) {
                        $checkbox.addClass(classes.status.checked);
                    } else {
                        $checkbox.removeClass(classes.status.checked);
                    }
                })
                .on('keydown.formstyler', function(e) {
                    // Space
                    if (e.which == 32) {
                        $checkbox.click();
                    }
                })
                .on('focus.formstyler', function() {
                    if (!$checkbox.is('.'+classes.status.disabled)) {
                        $checkbox.addClass(classes.status.focused);
                    }
                })
                .on('blur.formstyler', function() {
                    $checkbox.removeClass(classes.status.focused);
                });

                // Label hover
                $('label[for="' + $el.attr('id') + '"]').hover(function() {
                    if (!$el.is(':disabled')) {
                        $checkbox.addClass(classes.status.hovered);
                    }
                }, function() {
                    $checkbox.removeClass(classes.status.hovered);
                });
            }

            // >>> Destructor
            var destructor = function() {
                if ($el.closest('.'+classes.check.checkblock).length || $el.closest('.'+classes.switch.switchblock).length) {
                    $el.closest('label').add('label[for="' + $el.attr('id') + '"]').off('.formstyler');
                    $el.off('.formstyler').parent().before($el).remove();
                }

                if ($el.closest('.'+classes.check.checkblock).length) {
                    $el.closest('.'+classes.check.checkblock).children().unwrap();
                }

                if ($el.closest('.'+classes.switch.switchblock).length) {
                    $el.closest('.'+classes.switch.switchblock).children().unwrap();
                }
            }

            // >>> Actions ans listeners
            handler();

            $el.on('destroy', function() {
                destructor();
            });

            $el.on('refresh', function() {
                destructor();
                handler();

                console.log($el);
            });
        },

        // >> Build radio
        _radio: function(element) {
            // >>> Definitions
            var $el = typeof element === 'object' ? $(element) : $(this.element);
            var opt = this.options;

            // >>> Handler
            var handler = function() {
                // Wrap radio block
                if ($el.next('label[for='+$el.attr('id')+']').length && !$el.parent().hasClass(classes.radio.radioblock)) {
                    $el.next('label[for='+$el.attr('id')+']').addClass(classes.label.label).wrap('<div class="'+classes.radio.radioblock+'"></div>');
                    $el.prependTo($el.next('.'+classes.radio.radioblock));
                }

                // Create radio
                var $radio = $('<div class="'+classes.radio.radio+'"><div class="'+classes.radio.dot+'"></div></div>')
                    .attr({
                        id: ($el.attr('id') !== undefined && $el.attr('id') !== '')
                            ? $el.attr('id') + opt.idSuffix
                            : null,
                        title: $el.attr('title')
                        ? $el.attr('title')
                        : null
                    })
                    .addClass($el.attr('class'))
                    .data($el.data());

                $el.after($radio).prependTo($radio);

                if ($el.is(':checked')) {
                    $radio.addClass(classes.status.checked);
                }

                if ($el.is(':disabled')) {
                    $radio.addClass(classes.status.disabled);

                    if ($radio.parent().hasClass(classes.radio.radioblock)) {
                        $radio.parent().addClass(classes.status.disabled);
                    }
                }

                if (isTrue(opt.checkbox.colored)) {
                    $radio.addClass(classes.status.colored);
                }

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

                    if (!$radio.is('.'+classes.status.disabled)) {
                        var inputName = $('input[name="' + $el.attr('name') + '"]');
                        inputName.commonParent().find(inputName).prop('checked', false).parent().removeClass(classes.status.checked);
                        $el.prop('checked', true).parent().addClass(classes.status.checked);
                        $el.focus().change();
                        /*$radio.removeClass(classes.status.focused);*/
                    }
                });

                // Click label
                $el.closest('label').add('label[for="' + $el.attr('id') + '"]').on('click.formstyler', function(e) {
                    if (!$(e.target).is('a') && !$(e.target).closest($radio).length) {
                        $radio.triggerHandler('click');
                        e.preventDefault();
                    }
                });

                // Listeners
                $el
                .on('change.formstyler', function() {
                    $el.parent().addClass(classes.status.checked);
                })
                .on('focus.formstyler', function() {
                    if (!$radio.is('.'+classes.status.disabled)) {
                        $radio.addClass(classes.status.focused);
                    }
                })
                .on('blur.formstyler', function() {
                    $radio.removeClass(classes.status.focused);
                });

                // Label hover
                $('label[for="' + $el.attr('id') + '"]').hover(function() {
                    if (!$el.is(':disabled')) {
                        $radio.addClass(classes.status.hovered);
                    }
                }, function() {
                    $radio.removeClass(classes.status.hovered);
                });
            }

            // >>> Destructor
            var destructor = function() {
                if ($el.closest('.'+classes.radio.radioblock).length) {
                    $el.closest('label').add('label[for="' + $el.attr('id') + '"]').off('.formstyler');
                    $el.off('.formstyler').parent().before($el).remove();
                    $el.closest('.'+classes.radio.radioblock).children().unwrap();
                }
            }

            // >>> Actions and listeners
            handler();

            $el.on('destroy', function() {
                destructor();
            });

            $el.on('refresh', function() {
                destructor();
                handler();
            });
        },

        // >> Build number
        _number: function(element) {
            // >>> Definitions
            var $el = typeof element === 'object' ? $(element) : $(this.element);
            var opt = this.options;

            // >>> Handler
            var handler = function() {
                // Create number
                var $number = $('<div class="'+classes.number.number+'"></div>')
                    .attr({
                        id: ($el.attr('id') !== undefined && $el.attr('id') !== '')
                            ? $el.attr('id') + opt.idSuffix
                            : null,
                        title: $el.attr('title')
                        ? $el.attr('title')
                        : null
                    });

                $el.after($number).prependTo($number);

                $number
                .append('<div class="'+classes.number.button+' '+classes.number.plus+'"></div>')
                .prepend('<div class="'+classes.number.button+' '+classes.number.minus+'"></div>');

                // Create plus and minus buttons
                if (opt.number.plusImage && isTrue(opt.number.plusImage)) {
                    $('.'+classes.number.plus, $number).addClass(classes.number.buttonImage).html('<img class="'+classes.number.image+'" src="'+opt.number.plusImage+'" alt="">');
                } else if (opt.number.plusIcon && isTrue(opt.number.plusIcon)) {
                    $('.'+classes.number.plus, $number).addClass(classes.number.buttonIcon).html('<i class="'+classes.number.icon+' '+opt.number.plusIcon+'"></i>');
                } else {
                    $('.'+classes.number.plus, $number).addClass(classes.number.buttonText).html('<span class="'+classes.number.text+'">&plus;</span>');
                }

                if (opt.number.minusImage && isTrue(opt.number.minusImage)) {
                    $('.'+classes.number.minus, $number).addClass(classes.number.buttonImage).html('<img class="'+classes.number.image+'" src="'+opt.number.minusImage+'" alt="">');
                } else if (opt.number.minusIcon && isTrue(opt.number.minusIcon)) {
                    $('.'+classes.number.minus, $number).addClass(classes.number.buttonIcon).html('<i class="'+classes.number.icon+' '+opt.number.minusIcon+'"></i>');
                } else {
                    $('.'+classes.number.minus, $number).addClass(classes.number.buttonText).html('<span class="'+classes.number.text+'">&minus;</span>');
                }

                // Add button classes
                if (opt.number.plusClass && isTrue(opt.number.plusClass)) {
                    $('.'+classes.number.plus, $number).addClass(opt.number.plusClass);
                } else {
                    $('.'+classes.number.plus, $number).addClass(classes.status.styled);
                }

                if (opt.number.minusClass && isTrue(opt.number.minusClass)) {
                    $('.'+classes.number.minus, $number).addClass(opt.number.minusClass);
                } else {
                    $('.'+classes.number.minus, $number).addClass(classes.status.styled);
                }

                // Add classes
                if (isTrue(opt.number.colored)) {
                    $number.addClass(classes.status.colored);
                }

                if ($el.is(':disabled')) {
                    $number.addClass(classes.status.disabled);
                }

                // Configure buttons
                var min = $el.attr('min') !== undefined ? Number($el.attr('min')) : null;
                var max = $el.attr('max') !== undefined ? Number($el.attr('max')) : null;
                var step = ($el.attr('step') !== undefined && $.isNumeric($el.attr('step'))) ? Number($el.attr('step')) : Number(1);

                var changeValue = function(spin) {
                    var currentVal = $el.val();
                    var newVal;

                    if (!$.isNumeric(currentVal)) {
                        currentVal = 0;
                        $el.val('0');
                    }
                    if (spin.is('.'+classes.number.minus)) {
                        newVal = Number(currentVal) - step;
                    } else if (spin.is('.'+classes.number.plus)) {
                        newVal = Number(currentVal) + step;
                    }

                    // Zeros fix
                    var decimals = (step.toString().split('.')[1] || []).length;
                    if (decimals > 0) {
                        var multiplier = '1';
                        while (multiplier.length <= decimals) multiplier = multiplier + '0';
                        newVal = Math.round(newVal * multiplier) / multiplier;
                    }

                    if ($.isNumeric(min) && newVal < min) {
                        newVal = min;
                    }
                    if ($.isNumeric(max) && newVal > max) {
                        newVal = max;
                    }

                    $el.val(newVal);
                }

                if (!$el.is(':disabled')) {
                    if (isTrue(opt.number.spin)) {
                        // Button click - spinned
                        var timeout = null;
                        var interval = null;

                        $number.on('mousedown', '.'+classes.number.button, function() {
                            var spin = $(this);
                            changeValue(spin);
                            timeout = setTimeout(function(){
                                interval = setInterval(function(){ changeValue(spin); }, 40);
                            }, 350);
                        }).on('mouseup mouseout', '.'+classes.number.button, function() {
                            clearTimeout(timeout);
                            clearInterval(interval);
                        }).on('mouseup', '.'+classes.number.button, function() {
                            $el.change().trigger('input');
                        });
                    } else {
                        // Button click - simple
                        $number.on('click', '.'+classes.number.button, function() {
                            changeValue($(this));
                        });
                    }
                }

                // Listeners
                $el
                .on('focus.formstyler', function() {
                    if (!$el.is(':disabled')) {
                        $number.addClass(classes.status.focused);
                    }
                })
                .on('blur.formstyler', function() {
                    $number.removeClass(classes.status.focused);
                });

                // Label hover
                $('label[for="' + $el.attr('id') + '"]').hover(function() {
                    if (!$el.is(':disabled')) {
                        $number.addClass(classes.status.hovered);
                    }
                }, function() {
                    $number.removeClass(classes.status.hovered);
                });
            }

            // >>> Destructor
            var destructor = function() {
                if ($el.closest('.'+classes.number.number).length) {
                    $el.off('.formstyler').closest('.'+classes.number.number).before($el).remove();
                }
            }

            // >>> Actions and listeners
            handler();

            $el.on('destroy', function() {
                destructor();
            });

            $el.on('refresh', function() {
                destructor();
                handler();
            });
        },

        // >> Build file
        _file: function(element) {
            // >>> Definitions
            var $el = typeof element === 'object' ? $(element) : $(this.element);
            var opt = this.options;
            var locale = this.locale;

            // >>> Handler
            var handler = function() {
                // Create file
                var $file = $('<div class="'+classes.file.file+'">'
                        + '<label class="'+classes.file.name+'" for="'+$el.attr('id')+'">'
                            + '<span class="'+classes.file.nameValue+'">'+locale.file.placeholder+'</span>'
                            + '</label>'
                        + '<label class="'+classes.file.button+'" for="'+$el.attr('id')+'">'
                            + '</label>'
                        + '</div>')
                    .attr({
                        id: ($el.attr('id') !== undefined && $el.attr('id') !== '')
                            ? $el.attr('id') + opt.idSuffix
                            : null,
                        title: $el.attr('title')
                            ? $el.attr('title')
                            : null
                    })
                    .addClass($el.attr('class'))
                    .data($el.data());

                $el.after($file).appendTo($file);

                // Add classes and elements
                if (!$el.attr('id')) {
                    $file.addClass(classes.status.noId);
                }

                if (opt.file.inputClass && isTrue(opt.file.inputClass)) {
                    $('.'+classes.file.name, $file).addClass(opt.file.inputClass);
                } else {
                    $('.'+classes.file.name, $file).addClass(classes.status.styled);
                }

                if (opt.file.browseClass && isTrue(opt.file.browseClass)) {
                    $('.'+classes.file.button, $file).addClass(opt.file.browseClass);
                } else {
                    $('.'+classes.file.button, $file).addClass(classes.status.styled);
                }

                if (opt.file.browseImage && isTrue(opt.file.browseImage)) {
                    $('.'+classes.file.button, $file).addClass(classes.status.imaged).prepend('<img class="'+classes.file.buttonImage+'" src="'+opt.file.browseImage+'" alt="'+locale.file.browse+'">');
                } else if (opt.file.browseIcon && isTrue(opt.file.browseIcon)) {
                    $('.'+classes.file.button, $file).addClass(classes.status.iconed).prepend('<i class="'+classes.file.buttonIcon+' '+opt.file.browseIcon+'"></i>');
                } else {
                    $('.'+classes.file.button, $file).prepend('<span class="'+classes.file.buttonBrowse+'">'+locale.file.browse+'</span>');
                }

                if (opt.file.inputImage && isTrue(opt.file.inputImage)) {
                    $('.'+classes.file.name, $file).addClass(classes.status.imaged).prepend('<img class="'+classes.file.nameImage+'" src="'+opt.file.inputImage+'" alt="">');
                } else if (opt.file.inputIcon && isTrue(opt.file.inputIcon)) {
                    $('.'+classes.file.name, $file).addClass(classes.status.iconed).prepend('<i class="'+classes.file.nameIcon+' '+opt.file.inputIcon+'"></i>');
                }

                if ($el.is(':disabled')) {
                    $file.addClass(classes.status.disabled);
                }

                // Define name
                var $name = $('.'+classes.file.nameValue, $file);

                // Dont clear file name while refreshing
                if ($el.val()) {
                    $name.text($el.val().replace(/.+[\\\/]/, ''));
                }

                // Listeners
                $el
                .on('change.formstyler', function() {
                    var value = $el.val();
                    if ($el.is('[multiple]')) {
                        value = '';
                        var files = $el[0].files;

                        if (files.length > 0) {
                            if ((!parseInt(opt.file.multipleLimit) && files.length !== 1) || files.length > parseInt(opt.file.multipleLimit)) {
                                value = locale.file.selectedMultiple.replace('%s', files.length);
                            } else {
                                var filesnames = [];
                                $.each(files, function(files_i, files_el) {
                                    filesnames[files_i] = files_el.name;
                                });
                                value = filesnames.join(', ');
                            }
                        }
                    }

                    $name.text(value.replace(/.+[\\\/]/, ''));

                    if (value === '') {
                        $name.text(locale.file.placeholder);
                        $file.removeClass(classes.status.selected);
                    } else {
                        $file.addClass(classes.status.selected);
                    }
                })
                .on('focus.formstyler', function() {
                    $file.addClass(classes.status.focused);
                })
                .on('blur.formstyler', function() {
                    $file.removeClass(classes.status.focused);
                })
                .on('click.formstyler', function() {
                    $file.removeClass(classes.status.focused);
                });

                // Label hover
                $('label[for="' + $el.attr('id') + '"]').hover(function() {
                    if (!$el.is(':disabled')) {
                        $file.addClass(classes.status.hovered);
                    }
                }, function() {
                    $file.removeClass(classes.status.hovered);
                });
            }

            // >>> Destructor
            var destructor = function() {
                if ($el.closest('.'+classes.file.file).length) {
                    $el.off('.formstyler').parent().before($el).remove();
                }
            }

            // >>> Actions and listeners
            handler();

            $el.on('destroy', function() {
                destructor();
            });

            $el.on('refresh', function() {
                destructor();
                handler();
            });
        },

        // >> Build select
        _select: function(element) {
            // >>> Definitions
            var $el = typeof element === 'object' ? $(element) : $(this.element);
            var $options = $('option', $el);
            var opt = this.options;
            var locale = this.locale;
            var isIOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;
            var isAndroid = (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;

            // >>> List maker
            var listMaker = function() {
                var list = '';

                for (var i = 0; i < $('option', $el).length; i++) {
                    var $op = $('option', $el).eq(i);
                    var li = '';
                    var liGroup = '';
                    var liClasses = [];
                    var liAttrs = [];
                    var data = $op.data();

                    liClasses.push(classes.select.option);

                    if ($op.prop('selected')) {
                        liClasses.push(classes.status.selected);
                    }
                    if ($op.is(':disabled')) {
                        liClasses.push(classes.status.disabled);
                    }
                    if ($op.is(':first-child') && $op.val() === '') {
                        liClasses.push(classes.select.optionPlaceholder);
                    }
                    if ($op.attr('class') !== undefined) {
                        liClasses.push($op.attr('class'));
                    }
                    if ($op.attr('id') !== undefined && $op.attr('id') !== '') {
                        liAttrs.push('id="' + $op.attr('id') + opt.idSuffix + '"');
                        liAttrs.push('data-id="' + $op.attr('id') + '"');
                    }
                    if ($op.attr('title') !== undefined && $op.attr('title') !== '') {
                        liAttrs.push('title="' + $op.attr('title') + '"');
                    }
                    for (var k in data) {
                        if (data[k] !== '') {
                            liAttrs.push('data-' + k + '="' + data[k] + '"');
                        }
                    }
                    if ($op.parent().is('optgroup')) {
                        liClasses.push(classes.select.optionOptgrouped);
                        liAttrs.push('data-optgroup="'+$op.parent().index()+'"');

                        if ($op.is(':first-child')) {
                            liGroup = '<li data-index="'+$op.parent().index()+'" class="' + classes.select.optgroup + '">' + $op.parent().attr('label') + '</label>';
                        }
                    }

                    liAttrs.unshift('class="' + liClasses.join(' ') + '"');

                    if ($op.data('html')) {
                        li = '<li ' + liAttrs.join(' ') + ' data-text="'+$op.text()+'">' + $op.data('html') + '</li>';
                    } else {
                        li = '<li ' + liAttrs.join(' ') + '>' + $op.text() + '</li>';
                    }
                    if (liGroup != '') {
                        li = liGroup + li;
                    }

                    list += li;
                }

                return list;
            }

            // >>> Value maker
            var valueMaker = function() {
                if (!$options.filter(':selected').length) {
                    return locale.select.placeholder;
                }else if ($options.filter(':selected').length === $options.length) {
                    return locale.select.selectedAll;
                } else if ($options.filter(':selected').length > parseInt(opt.select.multipleLimit)) {
                    return locale.select.selectedMultiple.replace('%s', $options.filter(':selected').length).replace('%a', $options.length);
                } else {
                    var response = [];

                    $options.filter(':selected').each(function(i, selector) {
                        response.push($(selector).text());
                    });

                    return response.join(', ');
                }
            }

            // >>> Prevent scrolling
            var preventScrolling = function($selector) {
                var scrollDiff = $selector.prop('scrollHeight') - $selector.outerHeight();
                var wheelDelta = null;
                var scrollTop = null;

                $selector.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function(e) {
                    wheelDelta = (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) ? 1 : -1;
                    scrollTop = $selector.scrollTop();

                    if ((scrollTop >= scrollDiff && wheelDelta < 0) || (scrollTop <= 0 && wheelDelta > 0)) {
                        e.stopPropagation();
                        e.preventDefault();
                    }

                });
            }

            // >>> Open dropdown
            var openDropdown = function($selector) {
                // Define children elements
                var $dropdown = $('.'+classes.select.dropdown, $selector);
                var $list = $('.'+classes.select.list, $selector);
                var $listItems = $('li', $list);

                // Detect opening position
                var topOffset = parseInt($selector.offset().top) - parseInt($(window).scrollTop());
                var bottomOffset = parseInt($(window).height()) - parseInt($('.'+classes.select.container, $selector).outerHeight()) - topOffset;

                if (opt.select.smartPosition && isTrue(opt.select.smartPosition) && topOffset > bottomOffset && bottomOffset < (parseInt(opt.select.smartMinHeight) + parseInt(opt.select.dropdownOffset))) {
                    $dropdown.css({
                        'top': 'auto',
                        'bottom': parseInt(opt.select.dropdownOffset) + parseInt($('.'+classes.select.container, $selector).outerHeight()),
                        'max-height': Math.floor(topOffset - parseInt(opt.select.dropdownOffset) * 1.5),
                        'height': 'auto'
                    })
                } else {
                    $dropdown.css({
                        'bottom': 'auto',
                        'top': parseInt(opt.select.dropdownOffset) + parseInt($('.'+classes.select.container, $selector).outerHeight()),
                        'max-height': Math.floor(bottomOffset - parseInt(opt.select.dropdownOffset) * 1.5),
                        'height': 'auto'
                    })
                }

                // Open dropdown
                $dropdown.fadeIn(parseInt(opt.select.dropdownSpeed));

                // Add classes
                $selector.addClass(classes.status.opened).addClass(classes.status.focused);

                // Call callback
                opt.onSelectOpened.call($selector);

                // Set Z-INDEX
                if ($selector.css('z-index') === 'auto') {
                    $selector.css('z-index', 1);
                } else {
                    $selector.css('z-index', parseInt($selector.css('z-index')) + 1);
                }

                // Fix right border of window
                if ($selector.offset().left + $dropdown.outerWidth() > $(window).width()) {
                    $dropdown.css({
                        'left': 'auto',
                        'right': '0',
                        'width': 'auto'
                    });
                }

                // Scroll to selected option
                if ($listItems.filter('.'+classes.status.selected).length) {
                    if ($('select', $selector).val() === '') {
                        $dropdown.scrollTop(0);
                    } else {
                        if (($dropdown.innerHeight() / $listItems.last().outerHeight()) % 2 !== 0) {
                            $dropdown.scrollTop(
                                $dropdown.scrollTop() +
                                $listItems.filter('.'+classes.status.selected).position().top -
                                $dropdown.innerHeight() / 2 +
                                $listItems.last().outerHeight() / 2);
                        } else {
                            $dropdown.scrollTop(
                                $dropdown.scrollTop() +
                                $listItems.filter('.'+classes.status.selected).position().top -
                                $dropdown.innerHeight() / 2 +
                                $listItems.last().outerHeight());
                        }
                    }
                }

                // Stop page scrolling while selectbox is hovered
                preventScrolling($selector);
            }

            // >>> Close dropdown
            var closeDropdown = function($selector) {
                if ($selector.hasClass(classes.select.opened) || $('.'+classes.select.dropdown, $selector).is(':visible')) {
                    // Close
                    $('.'+classes.select.dropdown, $selector).fadeOut(parseInt(opt.select.dropdownSpeed));

                    // Remove classes
                    $selector.removeClass(classes.status.opened);

                    // Clear search
                    if ($('.'+classes.select.searchInput, $selector).length) {
                        $('.'+classes.select.searchInput, $selector).val('').keyup();
                    }

                    // Call callback
                    opt.onSelectClosed.call($selector);

                    // Set Z-INDEX
                    if (parseInt($selector.css('z-index')) > 1) {
                        $selector.css('z-index', parseInt($selector.css('z-index')) - 1);
                    } else {
                        $selector.css('z-index', 'auto');
                    }
                }
            }

            // >>> On document click
            var onDocumentClick = function(e) {
                if (!$(e.target).parents().hasClass(classes.select.select) && e.target.nodeName != 'OPTION' && $('.'+classes.select.select+'.'+classes.status.opened).length) {
                    $('.'+classes.select.select+'.'+classes.status.opened).each(function(i, selector) {
                        closeDropdown($(selector));
                    });
                }
            }

            // >>> Handler
            var handler = function() {
                // Create select
                var $select = $('<div class="'+classes.select.select+'">' +
                    '<div class="'+classes.select.container+'">' +
                        '<div class="'+classes.select.value+'"></div>' +
                        '<div class="'+classes.select.trigger+'"></div>' +
                        '</div>' +
                    '<div class="'+classes.select.dropdown+'">' +
                        '<ul class="'+classes.select.list+'"></ul>' +
                    '</div>' +
                    '</div>')
                    .attr({
                        id: ($el.attr('id') !== undefined && $el.attr('id') !== '')
                            ? $el.attr('id') + opt.idSuffix
                            : null,
                        title: $el.attr('title')
                            ? $el.attr('title')
                            : null
                    })
                    .addClass($el.attr('class'))
                    .data($el.data());

                $el.after($select).prependTo($select);

                // Make list
                $('.'+classes.select.list, $select).html(listMaker());

                // Make toggle button
                if ($el.is('[multiple]') && isTrue(opt.select.toggleLimit) && $options.length >= parseInt(opt.select.toggleLimit)) {
                    $('.'+classes.select.dropdown, $select).prepend('<div class="'+classes.select.toggle+'">'+locale.select.toggle+'</div>');
                }

                // Make search
                if (opt.select.searchLimit && isTrue(opt.select.searchLimit) && $options.length >= parseInt(opt.select.searchLimit)) {
                    $('.'+classes.select.dropdown, $select).prepend(
                        '<div class="'+classes.select.search+'"><input name="text" class="'+classes.select.searchInput+'" placeholder="'+locale.select.searchPlaceholder+'" autocomplete="off"></div>' +
                        '<div class="'+classes.select.notFound+'">'+locale.select.notFound+'</div>'
                        );

                    if (opt.select.searchClass && isTrue(opt.select.searchClass)) {
                        $('.'+classes.select.searchInput, $select).addClass(opt.select.searchClass);
                    } else {
                        $('.'+classes.select.searchInput, $select).addClass(classes.status.styled);
                    }
                }

                // Define children
                var $container = $('.'+classes.select.container, $select),
                    $value = $('.'+classes.select.value, $container),
                    $trigger = $('.'+classes.select.trigger, $container),
                    $dropdown = $('.'+classes.select.dropdown, $select),
                    $list = $('.'+classes.select.list, $dropdown),
                    $listItems = $('li', $list),
                    $toggle = $('.'+classes.select.toggle, $dropdown),
                    $search = $('.'+classes.select.searchInput, $dropdown),
                    $notFound = $('.'+classes.select.notFound, $dropdown);

                // Add check icon for multiple selectbox
                if ($el.is('[multiple]')) {
                    $listItems.addClass(classes.status.multiple)
                    if (opt.select.optionImage && isTrue(opt.select.optionImage)) {
                        $listItems.prepend('<img class="'+classes.select.optionImage+'" src="'+opt.select.optionImage+'">');
                        $toggle.prepend('<img class="'+classes.select.toggleImage+'" src="'+opt.select.optionImage+'">');
                    } else if (opt.select.optionIcon && isTrue(opt.select.optionIcon)) {
                        $listItems.prepend('<i class="'+classes.select.optionIcon+' '+opt.select.optionIcon+'"></i>');
                        $toggle.prepend('<i class="'+classes.select.toggleIcon+' '+opt.select.optionIcon+'"></i>');
                    } else {
                        $listItems.addClass(classes.status.styled);
                        $toggle.addClass(classes.status.styled);
                    }
                }

                // Set trigger
                if (opt.select.triggerImage && isTrue(opt.select.triggerImage)) {
                    $trigger.html('<img class="'+classes.select.triggerImage+'" src="'+opt.select.triggerImage+'">');
                } else if (opt.select.triggerIcon && isTrue(opt.select.triggerIcon)) {
                    $trigger.html('<i class="'+classes.select.triggerIcon+' '+opt.select.triggerIcon+'"></i>');
                } else {
                    $trigger.html('<span class="'+classes.select.triggerHandler+'"></span>')
                }

                // Make placeholder
                if ($el.is('[multiple]')) {
                    $value.text(valueMaker());

                    if (!$options.filter(':selected').length) {
                        $value.addClass(classes.select.valuePlaceholder);
                    } else {
                        $value.removeClass(classes.select.valuePlaceholder);
                    }
                } else {
                    if (!$options.filter(':selected').length || ($options.first().is(':selected') && $options.first().val() === '' && $options.first().text() === '')) {
                        $value.text(locale.select.placeholder).addClass(classes.select.valuePlaceholder);
                    } else {
                        $value.text($options.filter(':selected').text());

                        if ($options.filter(':selected').val() === '') {
                            $value.addClass(classes.select.valuePlaceholder);
                        } else {
                            $value.removeClass(classes.select.valuePlaceholder)
                        }
                    }
                }

                // Hide first empty option
                if ($options.first().text() === '' && $options.first().val() === '') {
                    $listItems.first().hide();
                }

                // If small
                if (opt.select.small && isTrue(opt.select.small)) {
                    $select.addClass(classes.status.small);
                }

                // If disabled
                if ($el.is(':disabled')) {
                    $select.addClass(classes.status.disabled);
                    return false;
                }

                // Click pseudoselect
                $container.click(function() {
                    // Hide dropdown if it is open
                    if ($dropdown.is(':visible') || $select.hasClass(classes.status.opened)) {
                        closeDropdown($select);
                        return;
                    }

                    // Hide other opened dropdowns
                    if ($('.'+classes.select.select).filter('.'+classes.status.opened).length) {
                        $('.'+classes.select.select).filter('.'+classes.status.opened).each(function(i, selector) {
                            closeDropdown($(selector));
                        });
                    }

                    // Focus element
                    $el.focus();

                    // iOS fix
                    if (isIOS) {
                        return;
                    }

                    // Open dropdown
                    openDropdown($select);
                });

                // Click option
                $listItems.filter(':not(.'+classes.status.disabled+'):not(.'+classes.select.optgroup+')').click(function() {
                    $el.focus();

                    if (!$el.is('[multiple]') && $(this).is('.'+classes.status.selected)) {
                        return;
                    }

                    var index = $(this).index();
                    index -= $(this).prevAll('.'+classes.select.optgroup).length;

                    if ($el.is('[multiple]')) {
                        if (!$(this).is('.'+classes.status.selected)) {
                            $options.eq(index).prop('selected', true);
                        } else {
                            $options.eq(index).prop('selected', false);
                        }
                    } else {
                        $(this).addClass(classes.status.selected).siblings().removeClass(classes.status.selected);

                        $options.prop('selected', false).eq(index).prop('selected', true);

                        /*if ($options.eq(index).val() !== '') {
                            $value.text(text).removeClass(classes.select.valuePlaceholder);
                        } else {
                            $value.text(locale.select.placeholder).addClass(classes.select.valuePlaceholder);
                        }*/

                        closeDropdown($select);
                    }

                    $el.change();
                });

                // Click toggle
                $toggle.click(function() {
                    if ($options.filter(':selected').length === $options.length || !$el.is('[multiple]')) {
                        $options.prop('selected', false);
                    } else {
                        $options.prop('selected', true);
                    }

                    $el.change();
                });

                // Search in dropdown
                if ($search.length) {
                    $search.val('').keyup();
                    $notFound.hide();

                    var searchTimer,
                        searchFilter = function() {
                        var query = $search.val();

                        if (query === '') {
                            $listItems.show();
                            $toggle.show();
                        } else if (query.length >= parseInt(opt.select.searchMinlength)) {
                            $listItems.each(function() {
                                if (($(this).is(':first-child') && $(this).hasClass(classes.select.optionPlaceholder)) || !$(this).hasClass(classes.select.option) || !$(this).html().match(new RegExp('.*?' + query + '.*?', 'i'))) {
                                    $(this).hide();
                                } else {
                                    $(this).show();
                                }

                                if ($(this).is(':visible') && $(this).data('optgroup') !== undefined) {
                                    $(this).parent().find('.'+classes.select.optgroup+'[data-index='+$(this).data('optgroup')+']').show();
                                }
                            });
                            $toggle.hide();
                        } else {
                            $toggle.hide();
                        }

                        if ($listItems.first().text() === '') {
                            $listItems.first().hide();
                        }

                        if ($listItems.length && $dropdown.is(':visible') && $listItems.filter(':visible').length < 1) {
                            $notFound.show();
                        } else {
                            $notFound.hide();
                        }
                    }

                    $search
                    .on('keyup', function () {
                        clearTimeout(searchTimer);
                        searchTimer = setTimeout(searchFilter, parseInt(opt.select.searchPause));
                    })
                    .on('keydown', function () {
                        clearTimeout(searchTimer);
                    });
                }

                // Listeners
                $el
                .on('change.formstyler', function() {
                    if ($el.is('[multiple]')) {
                        // Listener for changes of multiple select
                        $value.text(valueMaker());

                        if (!$options.filter(':selected').length) {
                            $value.addClass(classes.select.valuePlaceholder);
                        } else {
                            $value.removeClass(classes.select.valuePlaceholder);
                        }

                        if ($options.filter(':selected').length === $options.length) {
                            $toggle.addClass(classes.status.selected);
                            $listItems.not('.'+classes.select.optgroup).addClass(classes.status.selected);
                        } else {
                            $toggle.removeClass(classes.status.selected);

                            $options.each(function(i, selector) {
                                if ($(selector).is(':selected')) {
                                    $listItems.not('.'+classes.select.optgroup).eq(i).addClass(classes.status.selected);
                                } else {
                                    $listItems.not('.'+classes.select.optgroup).eq(i).removeClass(classes.status.selected);
                                }
                            });
                        }
                    } else {
                        // Listener for changes of simple select
                        if (!$options.filter(':selected').length || $options.filter(':selected').text() === '') {
                            $value.text(locale.select.placeholder);
                        } else {
                            $value.text($options.filter(':selected').text());
                        }

                        if (!$options.filter(':selected').length || $options.filter(':selected').val() === '') {
                            $value.addClass(classes.select.valuePlaceholder);
                        } else {
                            $value.removeClass(classes.select.valuePlaceholder);
                        }

                        $listItems.removeClass(classes.status.selected).not('.'+classes.select.optgroup).eq($el[0].selectedIndex).addClass(classes.status.selected);
                    }
                })
                .on('focus.formstyler', function() {
                    $select.addClass(classes.status.focused);
                    $(classes.select.container).not($select).each(function(i, selector) {
                        closeDropdown($(selector));
                    });
                })
                .on('blur.formstyler', function() {
                    $select.removeClass(classes.status.focused);
                })
                .on('keydown.formstyler keyup.formstyler', function(e) {
                    if ($el.is('[multiple]')) {
                        if ($options.filter(':selected').length === $options.length) {
                            $listItems.not('.'+classes.select.optgroup).addClass(classes.status.selected);
                        } else {
                            $options.each(function(i, selector) {
                                if ($(selector).is(':selected')) {
                                    $listItems.not('.'+classes.select.optgroup).eq(i).addClass(classes.status.selected);
                                } else {
                                    $listItems.not('.'+classes.select.optgroup).eq(i).removeClass(classes.status.selected);
                                }
                            });
                        }
                    } else {
                        $listItems.removeClass(classes.status.selected).not('.'+classes.select.optgroup).eq($el[0].selectedIndex).addClass(classes.status.selected);
                    }

                    if (e.which == 38 || e.which == 37 || e.which == 33 || e.which == 36) {
                        // Top, Left, Page Up, Home
                        if ($el.val() === '') {
                            $dropdown.scrollTop(0);
                        } else {
                            $dropdown.scrollTop($dropdown.scrollTop() + $listItems.filter('.'+classes.status.selected).position().top);
                        }
                    } else if (e.which == 40 || e.which == 39 || e.which == 34 || e.which == 35) {
                        // Down, Right, Page Down, End
                        $dropdown.scrollTop($dropdown.scrollTop() + $listItems.filter('.'+classes.status.selected).position().top - $dropdown.innerHeight() + $listItems.last().outerHeight());
                    } else if (e.which == 13) {
                        // Enter
                        e.preventDefault();
                        closeDropdown($select);
                    }
                })
                .on('keydown.formstyler', function(e) {
                    // Space
                    if (e.which == 32) {
                        e.preventDefault();
                        $container.click();
                    }
                });

                // Hide if click outside
                if (!onDocumentClick.registered) {
                    $(document).on('click', onDocumentClick);
                    onDocumentClick.registered = true;
                }

                // Label hover
                $('label[for="' + $el.attr('id') + '"]').hover(function() {
                    if (!$el.is(':disabled')) {
                        $select.addClass(classes.status.hovered);
                    }
                }, function() {
                    $select.removeClass(classes.status.hovered);
                });

            }

            // >>> Destructor
            var destructor = function() {
                if ($el.closest('.'+classes.select.select).length) {
                    $el.off('.formstyler').parent().before($el).remove();
                }
            }

            // >>> Actions and listeners
            onDocumentClick.registered = false;

            handler();

            $el.on('destroy', function() {
                destructor();
            });

            $el.on('refresh', function() {
                $options = $('option', $el);

                destructor();
                handler();
            });
        }
    }

     // > Register plugin
    $.fn[pluginName] = function(options) {
        var args = arguments;

        if (options === undefined || typeof options === 'object') {
            this.each(function() {
                if (!$.data(this, '_' + pluginName)) {
                    $.data(this, '_' + pluginName, new Formstyler(this, options));
                }
            })
            .promise()
            .done(function() {/*
                var opt = $(this[0]).data('_' + pluginName);
                if (opt) opt.options.onFormStyled.call();
            */});
            return this;
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            var returns;
            this.each(function() {
                var instance = $.data(this, '_' + pluginName);
                if (instance instanceof Formstyler && typeof instance[options] === 'function') {
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
            return returns !== undefined ? returns : this;
        }
    };
}));