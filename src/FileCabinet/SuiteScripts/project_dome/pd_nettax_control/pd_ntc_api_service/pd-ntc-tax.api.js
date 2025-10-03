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

        function sendTaxInfoToApi() {
            const postPath = 'v1/nettaxcontrol/taxrules';

            const response = https.post({
                url: `${BASE_URL}/${postPath}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data})
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