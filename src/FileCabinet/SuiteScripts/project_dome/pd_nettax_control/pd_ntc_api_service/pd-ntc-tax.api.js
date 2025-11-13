/**
 * @NApiVersion 2.1
 * @NModuleScope public
 * @author Project Dome - Roque Costa
*/

define(
    [
        'N/log',
        'N/https'
    ],
    function (
        log,
        https
    ) {

        const BASE_URL = 'customrecord_ftebr_city';

        function sendTaxInfoToApi(data) {
            const postPath = 'v1/nettaxcontrol/taxrules';
            const url = `${BASE_URL}/${postPath}`;
            log.audit('sendTaxInfoToApi - request body', data.taxControlData);
            log.audit('POST in URL', url);
            const response = https.post({
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data.taxControlData)
            });

            if (response.code !== 200) {
                log.error('Erro ao enviar dados para API', response);
                throw new Error('Erro ao enviar dados para API');
            }

            const responseBody = JSON.parse(response.body);

            log.audit('responseBody', response);

            return responseBody;
        }

        return {
            sendTaxInfoToApi: sendTaxInfoToApi,
        };
    }
);