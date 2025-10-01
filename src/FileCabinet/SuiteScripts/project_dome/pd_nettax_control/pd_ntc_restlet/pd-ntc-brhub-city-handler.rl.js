/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @author Project Dome - Roque Costa
*/

define(
    [
        '../pd_ntc_service/pd-ntc-brhub-city.service',
        
        '../../pd_c_netsuite_tools/pd_cnt_standard/pd-cnts-restlet.util.js'
    ],
    function (
        brhub_city_service,

        restlet_util
    ) {

        function getHandler(parameters) {
            return restlet_util.api({
                parameters: parameters,
                method: 'GET',
                handler: getData
            });
        }

        function getData() {
            return brhub_city_service.getAllBrHubCities();
        };

        return {
            get: getHandler
        }
    }
)