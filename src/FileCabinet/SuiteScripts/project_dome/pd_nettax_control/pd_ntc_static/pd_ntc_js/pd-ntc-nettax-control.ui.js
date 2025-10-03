const SUBSIDIARY_HANDLER_RESTLET = {
    script: 'customscript_pd_ntc_sub_handler_rl',
    deployment: 'customdeploy_pd_ntc_sub_handler_rl'
};

function clearFields(onlySubsidiaryFields = false) { 

    $('#business-line').val('');
    $('#tax-regime').val('');
    $('#state').val('');
    $('#city').val('');
    
    if (onlySubsidiaryFields) return;

    $('#filters-container').find('input').each(function () {
        const element = $(this);
        const isAutoComplete = element.is('.autocomplete');
        if (isAutoComplete) {
            element
                .data('value', '')
                .trigger('data-value-changed');
        }
        element.val('');
    });
}

$(document).ready(function () {
    addRadioInputsListener();
    addSubsidiarySelectorListener();
    addMask();
});

function addSubsidiarySelectorListener() {
    const subsidiarySelectorField = $('#subsidiary-selector');
    subsidiarySelectorField.on('data-value-changed', function() {
        const subsidiaryId = subsidiarySelectorField.data('value');
        if (!subsidiaryId) {
            clearFields(true);
            return;
        }
        populateSubsidiaryFields(subsidiaryId);
    });
}

function addRadioInputsListener() {
    function updateVisibility() {
        const ruleType = $('input[name="rule-type"]:checked').val();
        const itemType = $('input[name="item-type"]:checked').val();

        const paymentType = $('#payment-type-container');
        const providerBusinessLine = $('#provider-business-line-container');
        const takerBusinessLine = $('#taker-business-line-container');
        const providerState = $('#provider-state-container');
        const takerState = $('#taker-state-container');
        const providerCity = $('#provider-city-container');

        providerBusinessLine.add(takerBusinessLine)
            .add(providerState)
            .add(takerState)
            .add(providerCity)
            .add(paymentType)
            .hide();

        if (itemType === 'service') {
            paymentType.show();
        }

        if (ruleType === 'input') {
            if (itemType === 'product') {
                providerBusinessLine.show();
                providerState.show();
            }
            if (itemType === 'service') {
                providerBusinessLine.show();
            }
        }

        if (ruleType === 'output') {
            if (itemType === 'product') {
                takerBusinessLine.show();
                takerState.show();
            }
            if (itemType === 'service') {
                providerCity.show();
            }
        }
    }

    $('input[name="rule-type"], input[name="item-type"]').on('change', updateVisibility);

    updateVisibility();
}

function populateSubsidiaryFields(subsidiaryId) {
    console.log('subsidiaryId', subsidiaryId);
    get({
        restlet: SUBSIDIARY_HANDLER_RESTLET,
        parameters: {
            subsidiaryId: subsidiaryId
        },
        onError: function (errorMessage) {
            $.modal({
                type: 'alert',
                title: '<i class="fa fa-exclamation-triangle text-danger"></i>Atenção!',
                message: errorMessage
            });
        },
        onSuccess: function (response) {
            populateFields(response);
        }
    });

    function populateFields(subsidiaryData) {
        console.log('subsidiaryData', subsidiaryData);
        $('#business-line').val(subsidiaryData.businessLine.name);
        $('#tax-regime').val(subsidiaryData.taxRegime.name);
        $('#state').val(subsidiaryData.state.id);
        $('#city').val(subsidiaryData.city.id);
    };
}

function addMask() {
    $("#operation-code").mask('9.999');
}