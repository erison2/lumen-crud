//Search Location  
$("#cep").blur(function () {
    cep = $("#cep").val().replace(/[^a-z0-9\s]/gi, '').length;
    if (cep === 8) {
        //Preenche os campos com "..." enquanto nao retorna os dados
        $("#logradouro").val("pesquisando...");
        $("#bairro").val("pesquisando...");
        $("#cidade").val("pesquisando...");
        $("#uf").val("pesquisando...");
        // seta a variavel requisitada no campo cep
        var consulta = $("#cep").val().replace('-', '');
        // Fazendo a consulta            
        $.get("http://cep.correiocontrol.com.br/" + consulta + ".json", function (data) {
            // seta as variáveis de retorno
            logradouro = data.logradouro;
            bairro = data.bairro;
            cidade = data.localidade;
            uf = data.uf;
            //alert(correiocontrolcep[erro]);
        }).done(function () {
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'Parabens!',
                // (string | mandatory) the text inside the notification
                text: 'Seu endereço foi localizado.',
                time: '4000'
            });
            $("#cep").closest(".form-group").removeClass("has-error");
            $("#numero").focus();
            // preenche os campos                    
            $("#logradouro").val(logradouro);
            $("#bairro").val(bairro);
            $("#cidade").val(cidade);
            $("#uf").val(uf);
        }).fail(function () {
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'Desculpe!',
                // (string | mandatory) the text inside the notification
                text: 'Cep incorreto ou inválido.',
                time: '3000'
            });
            $("#cep").closest(".form-group").addClass("has-error");
            $("#cep").focus();
            $("#logradouro").val('');
            $("#bairro").val('');
            $("#cidade").val('');
            $("#uf").val('');
        });
    } else {
        $("#cep").closest(".form-group").removeClass("has-error");
    }
});