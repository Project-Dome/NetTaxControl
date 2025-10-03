const TAX_HANDLER_RESTLET = {
    script: 'customscript_pd_ntc_tax_ctrl_handler_rl',
    deployment: 'customdeploy_pd_ntc_tax_ctrl_handler_rl'
};

function executeTaxControl() {
    const netTaxData = collectNetTaxFormData();

    console.info('netTaxData', netTaxData);

    if (!validateParameters(netTaxData)) return;

    $("#confirm-modal").modal("show");

    $("#btn-confirm-send").on("click", function() {
        $("#confirm-modal").modal("hide");
        sendTaxControlData(); 
    });

    function sendTaxControlData() {
        const loadingModal = loading('Processando...');

        post({
            restlet: TAX_HANDLER_RESTLET,
            data: {
                taxControlData: netTaxData
            },
            onError: function (errorMessage) {
                $.modal({
                    type: 'alert',
                    title: '<i class="fa fa-exclamation-triangle text-danger"></i>Atenção!',
                    message: errorMessage
                });
            },
            onComplete: function () {
                loadingModal.modal('hide');
            },
            onSuccess: function () {
                $.modal({
                    type: 'alert',
                    title: '<i class="fa fa-exclamation-triangle text-danger"></i>Sucesso!',
                    message: 'Dados enviados com sucesso.'
                });
            }
        });
    }
}

function collectNetTaxFormData() {
    let netTaxData = {
        subsidiary: $("#subsidiary-selector").val(),
        taxRegime: $("#tax-regime").val(),
        businessLine: $("#business-line").val(),
        state: $("#state").val(),
        city: $("#city").val(),
        operationCode: $("#operation-code").val(),
        ruleType: $("input[name='rule-type']:checked").val(),
        itemType: $("input[name='item-type']:checked").val(),
    };

    if (netTaxData.itemType === 'service')
        netTaxData['taxRecognition'] = $("input[name='tax-recognition']:checked").val();

    if (netTaxData.ruleType === 'input') {
        if (netTaxData.itemType === 'product') {
            netTaxData['providerBusinessLine'] = $("#provider-business-line-selector").data("values");
            netTaxData['providerState'] = $("#provider-state-selector").data("values");
        }
        if (netTaxData.itemType === 'service') 
            netTaxData['providerBusinessLine'] = $("#provider-business-line-selector").data("values")
    }

    if (netTaxData.ruleType === 'output') {
        if (netTaxData.itemType === 'product') {
            netTaxData['takerBusinessLine'] = $("#taker-business-line-selector").data("values");
            netTaxData['takerState'] = $("#taker-state-selector").data("values");
        }
        if (netTaxData.itemType === 'service') 
            netTaxData['providerCity'] = $("#provider-city-selector").data("values");
    }

    return netTaxData;
}

function validateParameters(data) {
    const mandatoryFields = [
        { field: 'subsidiary', message: 'Subsidiária' },
        { field: 'taxRegime', message: 'Regime Tributário' },
        { field: 'businessLine', message: 'Linha de Negócio' },
        { field: 'state', message: 'Estado' },
        { field: 'city', message: 'Cidade' },
        { field: 'operationCode', message: 'Código de Operação' },
        { field: 'ruleType', message: 'Tipo de Regra' },
        { field: 'itemType', message: 'Tipo de Item' },
        { field: 'taxRecognition', message: 'Reconhecimento de Imposto Retido' },
        { field: 'providerBusinessLine', message: 'Linha de Negócio do Prestador' },
        { field: 'providerState', message: 'Estados do Prestador' },
        { field: 'providerCity', message: 'Cidades do Prestador' },
        { field: 'takerBusinessLine', message: 'Linha de Negcócio do Tomador' },
        { field: 'takerState', message: 'Estados do Tomador' },
    ];

    const emptyFields = [];

    mandatoryFields.forEach(function (field) {
        if (data.hasOwnProperty(field.field) && isNullOrEmpty(data[field.field])) 
            emptyFields.push(field.message);
    });

    if (emptyFields.length === 0) return true;

    const message = 'Os seguintes campos são obrigatórios: <br><br>' + emptyFields.join('<br>');

    $.modal({
        type: 'alert',
        title: '<i class="fa fa-exclamation-triangle text-danger"></i>Atenção!',
        message: message
    });

    return false;
}


