/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @author Project Dome - Roque Costa
*/

define(
    [
        '../pd_ntc_service/pd-ntc-subsidiary.service',

        '../../pd_c_netsuite_tools/pd_cnt_standard/pd-cnts-restlet.util.js'
    ],
    function (
        subsidiary_service,
        
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
            let subsidiaryData;

            if (!isNullOrEmpty(parameters))
                subsidiaryData = subsidiary_service.getSubsidiaryById(parameters.subsidiaryId);
            else 
                subsidiaryData = subsidiary_service.getSubsidiaries();

            return subsidiaryData;
        };

        return {
            get: getHandler
        }
    }
)