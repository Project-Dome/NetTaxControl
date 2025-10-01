const TAX_HANDLER_RESTLET = {
    script: 'customscript_pd_ntc_tax_ctrl_handler_rl',
    deployment: 'customdeploy_pd_ntc_tax_ctrl_handler_rl'
};

function executeTaxControl() {
    const netTaxData = collectNetTaxFormData();
    console.log('netTaxData', netTaxData);
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
        onSuccess: function (response) {
            refreshTable();
        }
    });
}

function collectNetTaxFormData() {
  return {
    subsidiary: $("#subsidiary-selector").data("value") || $("#subsidiary-selector").val(),
    taxRegime: $("#tax-regime").val(),
    businessLine: $("#business-line").val(),
    state: $("#state").val(),
    city: $("#city").val(),
    taxRecognition: $("input[name='tax-type']:checked").val(),
    ruleType: $("input[name='rule-type']:checked").val(),
    itemType: $("input[name='item-type']:checked").val(),
    providerBusinessLine: $("#provider-business-line-selector").data("value") || $("#provider-business-line-selector").val(),
    providerState: $("#provider-state-selector").data("value") || $("#provider-state-selector").val(),
    providerCity: $("#provider-city-selector").data("value") || $("#provider-city-selector").val(),
    takerBusinessLine: $("#taker-business-line-selector").data("value") || $("#taker-business-line-selector").val(),
    takerState: $("#taker-state-selector").data("value") || $("#taker-state-selector").val()
  };
}


