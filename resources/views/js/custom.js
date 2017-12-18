/**
 * Erison
 *
 * @copyright  Copyright 2015 erison
 * @version    $Id: custom.js 1 2015-08-08 14:52:00Z erison $
 * @author     Erison Quintela de Freitas <erisonquintela@hotmail.com>
 */

// Prevent submit form by enter
$(document).keypress(function (e) {
    if (e.which == 13) {
        return false;
    }
});

/* TOOLTIP */

// init tooltip
$('[data-toggle=tooltip]').tooltip({
    container: "body"
});


/* POPOVER */

// init popover
$("[data-toggle=popover]").popover({
    html: true,
    trigger: "hover"
});
// popover auto close timer  
$("[data-toggle=popover]").on('show.bs.popover', function () {
    var This = $(this);
    window.setTimeout(function () {
        $(This).popover('hide');
    }, 3500);
});


/* FANCYBOX */

// init fancybox
$(".lightbox").fancybox({
    padding: 0, // Borders
    helpers: {
        title: {
            type: 'float'
        }
    }
});
// Remove border
$(".fancybox-media").fancybox({
    padding: 0 // Borders
});


/* DATEPICKER */

//init datepicker
$('.datepicker').datepicker({
    //title: "",
    autoclose: true,
    format: 'dd/mm/yyyy',
    language: "pt-BR",
    orientation: "top left",
    startDate: '',
    endDate: '',
    todayHighlight: true
}).on('show', function (e) {
    // Impede que o campo fique vazio após clicar na data selecionada
    (e.date) ? $(this).data('stickyDate', e.date) : $(this).data('stickyDate', null);
}).on('changeDate', function (e) {
    $(this).datepicker('hide');
}).on('hide', function (e) {
    // Impede que o campo fique vazio após clicar na data selecionada
    var stickyDate = $(this).data('stickyDate');
    if (!e.date && stickyDate) {
        $(this).datepicker('setDate', stickyDate);
        $(this).data('stickyDate', null);
    }
}).attr('readonly', 'readonly');

/* CHOSEN */

// init chosen
$("select.chosen").chosen({
    no_results_text: "Oops, nada encontrado com",
    allow_single_deselect: true,
    disable_search_threshold: 10
});


/* MODAL BOOTSTRAP */
// modal com chosen
$('#mDataTable').on('shown.bs.modal', function () {
    $('select.chosen', this).chosen('destroy').chosen({
        no_results_text: "Oops, nada encontrado com",
        width: "100%",
        allow_single_deselect: true,
        disable_search_threshold: 10
    }).trigger("chosen:updated");
});


/* CLOCK */

// clock locale
//$.clock.locale.pt_br = {"weekdays": ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"], "months": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]};


/* SIDE BAR */

// tab navigation on load
sView = $(location).attr('href').split("/")[4];
$('div.panel-menu a.btn[href*="' + sView + '"]').addClass('active');
oSideBarLink = $('ul li a[href*="' + sView + '"]');
oSideBarLink.css({'background-color': '#EEE'}).parent().parent().addClass("menu-open").prev().removeClass("collapsed");

// tab navigation on click
tab = $('div.panel-menu a.btn');
tab.click(function () {
    $(this).addClass('active');
});


/* JQUERY MASKS */

// mask money
$('.money input').mask('0.000,00', {reverse: true});
// mask decimal
$('.decimal input').mask('00', {reverse: true});
// mask telefone
var maskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 0 0000-0000' : '(00) 0000-00009';
};
var options = {onKeyPress: function (val, e, field, options) {
        field.mask(maskBehavior.apply({}, arguments), options);
    }};
// datatable
$('#dyntable td.phone').on('focus', 'input', function () {
    $(this).mask(maskBehavior, options);
});
// others
$('input.phone').on('focus', function () {
    $(this).mask(maskBehavior, options);
});

// Btn Loading
//Ladda.bind('.progress-button', {
//    callback: function (instance) {
//        var progress = 0;
//        var interval = setInterval(function () {
//            progress = Math.min(progress + Math.random() * 0.1, 1);
//            instance.setProgress(progress);
//            if (progress === 1) {
//                instance.stop();
//                clearInterval(interval);
//                window.location.replace($("input#url").val());
//            }
//        }, 200);
//    }
//});

// Disable Acordeon link 
$("a.accordion-toggle").on('click', function (event) {
    event.preventDefault();
});

// Focus input-group
$(".input-group-addon").click(function () {
    $(this).next().focus();
});

/** MASKS **/
$('.time').mask('99:99:99');
$('.hour').mask('99:99');
// Máscara (Celular)
var maskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
};
var options = {onKeyPress: function (val, e, field, options) {
        field.mask(maskBehavior.apply({}, arguments), options);
    }};
$("form").on('focus', '.phone', function () {
    $(this).mask(maskBehavior, options);
});