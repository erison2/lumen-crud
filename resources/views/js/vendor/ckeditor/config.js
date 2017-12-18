/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {
    config.removeDialogTabs = 'image:advanced;link:advanced;table:advanced;simple-image-browser-dialog:tab-step2';
    config.toolbarGroups = [
        {name: 'document', groups: ['mode','document','doctools']},
        {name: 'clipboard', groups: ['clipboard','undo']},
        {name: 'editing', groups: ['find','selection','spellchecker','editing']},
        {name: 'forms', groups: ['forms']},
        {name: 'insert', groups: ['insert']},
        {name: 'links', groups: ['links']},
        '/',
        {name: 'tools', groups: ['tools']},
        {name: 'basicstyles', groups: ['basicstyles','cleanup']},
        {name: 'colors', groups: ['colors']},
        {name: 'paragraph', groups: ['list','indent','blocks','align','bidi','paragraph']},
        {name: 'styles', groups: ['styles']},
        {name: 'others', groups: ['others']},
        {name: 'about', groups: ['about']}
    ];

    config.removeButtons = 'Save,Print,PageBreak,CreateDiv,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,BidiLtr,BidiRtl,Language,Replace,Flash,Templates,Scayt,Smiley';
};

/**
 * Fix bug input focus in modal 
 */

$.fn.modal.Constructor.prototype.enforceFocus = function () {
    modal_this = this;
    $(document).on('focusin.modal', function (e) {
        if (modal_this.$element[0] !== e.target && !modal_this.$element.has(e.target).length
                // add whatever conditions you need here:
                && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_select') && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_text')) {
            modal_this.$element.focus();
        }
    });
};