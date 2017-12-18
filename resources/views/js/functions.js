/**
 * Erison
 *
 * @copyright  Copyright 2015 erison
 * @version    $Id: functions.js 1 2015-09 00:00Z erison $
 * @author     Erison Quintela de Freitas <erisonquintela@hotmail.com>
 */

/**
 * Exibe bootstrap alerts com classes e mensagens personalizadas
 * 
 * @param   {object}    oTarget     Elemento alvo que irá exibir a mensagem
 * @param   {object}    oAlert      Resposta do script alvo após o post
 *                                  {class: 'success', text: 'Sua mensagem aqui', redirect: 'home', time: 1000}
 */
function fnAlertMsg(oTarget, oAlert) {
    // div alert
    oDiv = $("<div/>", {
        class: "alert alert-" + oAlert.class
    }).html(oAlert.text);
    // button close
    oBtn = $("<button/>", {
        type: "button",
        class: "close",
        'data-dismiss': "alert",
        'aria-hidden': "true"
    }).text('x');
    // exibe a mensagem de alerta
    oTarget.empty().hide().append(oDiv.append(oBtn)).fadeIn(300);
    if (oAlert.time) {
        // fecha a mensagem de alerta
        setTimeout(function () {
            //$(".alert-" + oAlert.class + "").alert('close');
            $(".alert-" + oAlert.class).fadeOut(500);
            oAlert.redirect ? location.assign(oAlert.redirect) : '';
        }, oAlert.time);
    }
}

/**
 * Exibe jquery ui dialogs com mensagens personalizadas
 * 
 * @param   {object}    oTarget     Elemento alvo que irá exibir a mensagem
 * @param   {object}    oDialog     Resposta do script alvo após o post
 *                                  {text: 'Sua mensagem aqui', redirect: 'otherview.php', reload: true}
 */
function fnUiDialog(oTarget, oDialog) {
    // div dialog
    oDiv = $("<div/>", {
        id: "dialog"
    }).html(oDialog.text);

    oTarget.empty().append(oDiv).hide();
    if (oDialog.redirect || oDialog.reload) {
        // exibe a mensagem de alerta
        $("#dialog").dialog({
            title: oDialog.title,
            modal: true,
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                    // Redireciona ou recarrega a view atual
                    oDialog.redirect ? location.assign(oDialog.redirect) : '';
                    oDialog.reload ? location.reload() : '';
                }
            }
        });
    } else {
        // exibe a mensagem de alerta
        $("#dialog").dialog({
            title: oDialog.title,
            modal: true,
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                }
            }
        });
    }
}

/**
 * Envio de dados de forma assíncrona. Plugin: jquery.form
 * 
 * @param   {object}  oForm         Id do formulário
 * @param   {string}  sAction       Caminho do arquivo que receberá os dados
 * @param   {object}  oMsgTarget    Elemento que receberá a mensagem de retorno
 * @param   {object}  oQueryStr     Informações adicionais para execução no backend
 *                                  Ex.: {action: 'insert', send: 'true'}
 * @param   {bool}    bReset        true formulário no estado inicial após a submissão
 * 
 * @return  {bool}    Interrompe o envio dos dados via Http
 */
function submitForm(oForm, sAction, oMsgTarget, oQueryStr, bReset) {
    var bRequest = false;
    if (!bRequest) {
        bRequest = true;
        oForm.ajaxSubmit({
            url: sAction,
            data: oQueryStr,
            type: 'POST',
            dataType: "json",
            resetForm: bReset,
            beforeSubmit: function () {
                oMsgTarget.empty().html('<div class="alert alert-info login-alert" style="margin-bottom: 0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><img src="img/loading.gif" alt="loading" style="float: left; margin-right: 5px"> <strong>Processando aguarde...</strong></div>');
            },
            error: function () {
                var oAlert = {
                    class: 'danger',
                    text: '<strong>Erro:</strong> Ocorreu uma exceção. Informe ao desenvolvedor.'
                };
                fnAlertMsg(oMsgTarget, oAlert);
            },
            complete: function () {
                bRequest = false;
                console.log('Envio concluido!');
            },
            uploadProgress: function (event, position, total, percentComplete) {
                $(".progress-bar").css("width", percentComplete + '%');
            },
            success: function (oResponse) {
                if (oResponse.class === 'success') {
                    console.log('Success!');
                    // Reset campos de entrada
                    $(this).resetForm();
                    oForm[0].reset();
                    // Reset chosen
                    $("select.chosen").trigger("chosen:updated");
                    // Reset barra de progresso
                    setTimeout(function () {
                        $(".progress-bar").fadeOut(1000);
                    }, 1000);
                } else if (oResponse.class === 'danger') {
                    // Modificando cor da barra de status
                    $(".progress-bar").removeClass("progress-bar-success").addClass("progress-bar-danger");
                    setTimeout(function () {
                        $(".progress-bar").fadeOut(1000);
                    }, 1000);
                    $("[name='" + oResponse.data + "']").focus();
                    console.log('Danger!');
                } else {
                    // Reiniciando a barra de progresso
                    $(".progress-bar").css("width", "0");
                    $("[name='" + oResponse.data + "']").focus();
                    console.log('Warning!');
                }
                // Mensagem de retorno
                var oAlert = {
                    class: oResponse.class,
                    text: oResponse.text,
                    time: oResponse.time,
                    redirect: oResponse.redirect
                };
                fnAlertMsg(oMsgTarget, oAlert);
            }
        });
    }
}

/**
 * Function called after edit action. Status can be "success" or "failure"
 * 
 * @param   {string}  sResponse         Mensagem de retorno. Success ou Failure
 * @param   {string}  sOldValue         Valor antigo
 * @param   {string}  sNewValue         Novo valor
 * @param   {string}  iRowIndex         Índice da linha
 * @param   {string}  iColumnIndex      Índice da coluna
 * @param   {string}  iRealColumnIndex  Índice real da coluna
 * 
 * @return  {bool}    Return true    
 */
function dynOnEdited(sResponse, sOldValue, sNewValue, iRowIndex, iColumnIndex, iRealColumnIndex) {
    // Plugin: dataTable.editable
    if (sResponse === 'success') {
        // Executando o alert     
        var oMsgTarget = $("#alert");
        var oAlert = {
            class: 'success',
            text: '<strong>Êxito:</strong> Registro atualizado com sucesso.',
            time: 7000
        };
        fnAlertMsg(oMsgTarget, oAlert);
        return true;
    } else if (sOldValue === sNewValue) {
        // Executando o alert
        var oMsgTarget = $("#alert");
        var oAlert = {
            class: 'info',
            text: '<strong>Aviso:</strong> O valor inserido é idêntico ao valor atual. Nenhuma alteração realizada.',
            time: 5000
        };
        fnAlertMsg(oMsgTarget, oAlert);
        return true;
    }
}

/**
 * The default function that is called before row is deleted
 * Returning false will abort delete
 * Function can be overriden via plugin properties in order to create custom delete functionality
 * in that case call fnDeleteRow with parameter id, and return false to prevent double delete action
 * 
 * @param   {string}        row         JQuery wrapper around the TR tag that will be deleted
 * @param   {string}        id          Id of the record that wil be deleted
 * @param   {Function(id)}  fnDeleteRow Function that will be called to delete a row. Default - fnDeleteRow(id)
 * 
 * @return  {bool}          Return false to prevent double delete action
 * 
 */
function dynOnDeleting(row, id, fnDeleteRow) {
    // Plugin: dataTable.editable
    bootbox.confirm({
        title: "Excluir Registro",
        message: 'Deseja realmente excluir este registro cód <b>' + id + '</b>?',
        callback: function (sResponse) {
            if (sResponse) {
                fnDeleteRow(id);
            }
        }
    });
    return false;
}

/**
 * Function called after delete action. 
 * Status can be "success" or "failure"
 * 
 * @param   {string}  sResponse "success" if row is actually deleted
 *                              "failure" if delete failed
 * @return   void                              
 * 
 */
function dynOnDeleted(sResponse) {
    if (sResponse === 'success') {
        // Executando o alert
        var oMsgTarget = $("#alert");
        var oAlert = {
            class: 'success',
            text: '<strong>Êxito:</strong> Registro excluído com sucesso',
            time: 7000
        };
        fnAlertMsg(oMsgTarget, oAlert);
    }
}

/**
 * Shows an error message (Default function)
 * 
 * @param   {string}  errorText Text that should be shown
 * @param   {string}  action    Action that was executed when error occured e.g. "update", "delete", or "add"
 * 
 * @return   void                              
 * 
 */
function dynShowError(errorText, action) {
    oReturn = JSON.parse(errorText)
    // Debug text: errorText
    oMsgTarget = $("#alert");
    oError = {
        class: oReturn.class,
        text: oReturn.text,
        data: oReturn.data
    };
    fnAlertMsg(oMsgTarget, oError);
    return false;
}

/**
 * Tabela dinâmica
 * 
 * @param   {object}  oTable            Elemento alvo
 * @param   {object}  aoColumnsName     Nome das colunas
 * @param   {array}   aaSorting         Ordenação inicial por coluna. Exemplo: [[ 0, "desc|asc" ]] 
 * @param   {object}  aoColumnDefs      Ordenação das colunas. Exemplo: [{'bSortable': false, 'aTargets': [0, -1]}]
 * @param   {int}     iDisplayLength    Quantidade de linhas para exibir após carregamento
 * @param   {string}  sDeleteUrl        Url do arquivo que receberá os dados. dyntable.php?action=del
 * @param   {string}  sUpdateUrl        Url do arquivo que receberá os dados. dyntable.php?action=update
 * @param   {object}  aoColumnsConf     Configuração por coluna: [null, {cssclass: 'edit', tooltip: 'Duplo clique para editar', onblur: 'cancel', submit: 'Salvar'}]
 * 
 * @return void
 * 
 */
function dataTable(oTable, aoColumnsName, aaSorting, aoColumnDefs, iDisplayLength = 10, sDeleteUrl, sUpdateUrl, aoColumnsConf) {
    // Dynamic Table
    oTable.dataTable({
        "bProcessing": false,
        "aaSorting": aaSorting,
        // sorting columns
        "aoColumnDefs": aoColumnDefs,
        // custom language labels
        "oLanguage": {
            "oPaginate": {"sPrevious": "", "sNext": ""},
            "sProcessing": "Procesando...",
            "sLengthMenu": "Exibir _MENU_ registros",
            "sLoadingRecords": "<img src='images/anim_loading.gif'/> Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sInfo": "Exibindo _START_ - _END_ de _TOTAL_ registro(s)",
            "sInfoEmpty": "Exibindo 0 - 0 de 0 registros",
            "sInfoFiltered": "(filtrado de _MAX_ total registros)"
        },
        // display rows
        "iDisplayLength": iDisplayLength,
        // menu display rows
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
        "aoColumns": aoColumnsName
    }).makeEditable({
        sAddURL: '',
        sDeleteURL: sDeleteUrl,
        sUpdateURL: sUpdateUrl,
        "aoColumns": aoColumnsConf,
        fnShowError: dynShowError,
        fnOnDeleting: dynOnDeleting,
        fnOnDeleted: dynOnDeleted,
        fnOnEdited: dynOnEdited
    });

    // Formatting Layout Table
    // TD font color
    $("td:contains('Duplo clique para editar')").css("color", "#b9b9b9");

    // input search
    $("div[id*='_filter'] input").addClass('form-control');
    $('div.dataTables_filter').append('<span>Pesquisar:</span>');
    // select show rows
    $("select[name*='_length']").chosen({
        //no_results_text: "Oops, nada encontrado com"
        disable_search_threshold: 5
    });
    // Layout form de edição
    oTable.on("dblclick", "td", function () {
        $("table.dataTable tr td button[type='submit']").attr({
            class: "btn btn-default btn-xs margin-top-sm margin-left-sm margin-right-xs",
            'data-toggle': "tooltip",
            'data-placement': "bottom",
            'data-html': "true",
            title: "Salvar"
        }).tooltip('enable');
        $("table.dataTable tr td button[type='cancel']").attr({
            class: "btn btn-default btn-xs margin-top-sm margin-left-sm",
            'data-toggle': "tooltip",
            'data-placement': "bottom",
            'data-html': "true",
            title: "Cancelar"
        }).tooltip('enable');
        $("table.dataTable tr td input").addClass("form-control");
        $("table.dataTable tr td textarea").addClass("form-control");
//        $("table.dataTable tr td select").css('width', '75%').attr('data-placeholder', 'Selecione').addClass("form-control");
        $("select", this).css('width', '100%').attr('data-placeholder', 'Selecione').prepend('<option></option>').chosen({
            no_results_text: "Nada encontrado com:",
            allow_single_deselect: true,
            disable_search_threshold: 5
        });
    });
    // Datepicker - Adicionar a classe date no elemento pai do form input datepicker
    $('table.dataTable').on('dblclick', 'td.date', function () {
        $(this).children().children('input').addClass('datepicker').css('width', '40%').attr('readonly', 'readonly').datepicker('show').on('show', function (e) {
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
        });
    });
}

/**
 * Ativa o toogle no elemento alvo e envia os dados de forma assíncrona
 * 
 * @param   {object}    oElement        Elemento alvo
 * @param   {int}       iWidth          Largura
 * @param   {int}       iHeight         Altura
 * @param   {bool}      bOn             Estado inicial do toggle
 * @param   {string}    sTextOn         Texto do estado On
 * @param   {string}    sTextOff        Texto do estado Off
 * @param   {object}    oInputElement   Id do campo de entrada que receberá o valor
 * @param   {string}    sInputValOn     Valor do campo de entrada quando estiver ativo
 * @param   {string}    sInputValOff    Valor do campo de entrada quando estiver inativo
 * @param   {string}    sParam          Dados adicionais
 * @param   {string}    sUrlAction      Url do script que reberá os dados
 * @param   {object}    oTarget         Elemento alvo que irá exibir a mensagem
 * 
 * @return void
 * 
 */
function fnAjaxToggles(oElement, iWidth, iHeight, bOn, sTextOn, sTextOff, oInputElement, sInputValOn, sInputValOff, sParam, sUrlAction, oTarget) {
    // init toogle admin
    oElement.toggles({
        width: iWidth,
        height: iHeight,
        on: bOn,
        //click: false,
        text: {on: sTextOn, off: sTextOff}
    }).on('toggle', function (e, active) {
        // id do toggle
        iToogle = $(this).attr("data-toggle-id");
        if (active) {
            // Estado On
            oData = {id: iToogle, value: sInputValOn, param: sParam};
             // Submissão via form: Adiciona o valor no campo de entrada do formulário
            oInputElement ? oInputElement.val(sInputValOn) : null;
        } else {
            // Estado Off
            oData = {id: iToogle, value: sInputValOff, param: sParam};
            // Submissão via form: Adiciona o valor no campo de entrada do formulário
            oInputElement ? oInputElement.val(sInputValOff) : null;
        }
        // Enviando
        $.ajax({
            url: sUrlAction,
            method: "POST",
            data: oData,
            dataType: "json"
        }).done(function (oResponse) {
            var oAlert = {
                class: oResponse.class,
                text: oResponse.text,
                time: oResponse.time ? oResponse.time : false
            };
            fnAlertMsg(oTarget, oAlert);
        }).fail(function () {
            var oAlert = {
                class: 'danger',
                text: '<strong>Falha:</strong> Controller não encontrado ou nenhum valor retornado'
            };
            fnAlertMsg(oTarget, oAlert);
        });
    });
}

/**
 * Submit ckeditor form data
 * 
 * @return void
 * 
 */
function ckSubmit() {
    for (instance in CKEDITOR.instances) {
        CKEDITOR.instances[instance].updateElement();
    }
}
/**
 * Clear all instances in editor
 * 
 * @return void
 * 
 */
function ckClear() {
//    for (name in CKEDITOR.instances){
//        CKEDITOR.instances[name].destroy(true);
//    }
    for (instance in CKEDITOR.instances) {
        CKEDITOR.instances[instance].setData('');
    }
}

/**
 * Exclusão de arquivos
 *  
 * @param   {int}       iId         Id do registro do arquivo na base de dados
 * @param   {string}    sFileName   O nome do arquivo
 * @param   {string}    sUrlAction  Url do controller que reberá os dados
 * @param   {object}    oMsgTarget  Elemento alvo que irá exibir a mensagem
 * 
 * @return void
 */
function fnDeleteFile(iId, sFileName, sUrlAction, oMsgTarget) {
    if (sFileName) {
        oData = {id: iId, file: sFileName};
        $.post(sUrlAction, oData)
                .done(function (oResponse) {
                    oResponse = $.parseJSON(oResponse);
                    var oAlert = {
                        class: oResponse.class,
                        text: oResponse.text,
                        time: oResponse.time ? oResponse.time : false,
                        redirect: oResponse.redirect ? oResponse.redirect : false

                    };
                    fnAlertMsg(oMsgTarget, oAlert);
                }).fail(function () {
                    var oAlert = {
                        class: 'danger',
                        text: '<strong>Erro 404:</strong> Controller não encontrado'
                    };
                    fnAlertMsg(oMsgTarget, oAlert);
                });
    }
}

/**
 * Contador de caracteres
 *  
 * @param   {object}    oForm   Seletor do formulário
 * @param   {object}    oTarget Elemento alvo da mensagem
 * @param   {int}       $iLimit Limite maximo de caracteres
 * 
 * @return void
 */
function fnCounterTextarea(oForm, oTarget, $iLimit) {
    oForm.on("keyup", "textarea", function () {
        // Contador de caracteres
        iLimit = $iLimit;
        sInput = $(this).val().length;
        sOutput = iLimit - sInput;
        oTarget.text(sOutput);
    });
}