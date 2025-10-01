/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @author Project Dome - Roque Costa
*/

define(
    [
        '../pd_ntc_service/pd-ntc-business-line.service',

        '../../pd_c_netsuite_tools/pd_cnt_standard/pd-cnts-restlet.util.js'
    ],
    function (
        business_line_service,
        
        restlet_util
    ) {

        function getHandler(parameters) {
            return restlet_util.api({
                parameters: parameters,
                method: 'GET',
                handler: getData
            });
        }

        function getData(parameters) {
            return business_line_service.getAllBusinessLine(parameters);
        };

        return {
            get: getHandler
        }
    }
)