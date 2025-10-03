/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @author Project Dome - Roque Costa
*/

define(
    [
        '../pd_ntc_api_service/pd-ntc-tax.api',

        '../../pd_c_netsuite_tools/pd_cnt_standard/pd-cnts-restlet.util.js'
    ],
    function (
        tax_api_service,

        restlet_util
    ) {

        function postHandler(data) {
            return restlet_util.api({
                data: data,
                method: 'POST',
                handler: sendTaxInfoToApi
            });
        }

        function sendTaxInfoToApi(data) {
            return tax_api_service.sendTaxInfoToApi(data);
        };

        return {
            post: postHandler
        }
    }
)