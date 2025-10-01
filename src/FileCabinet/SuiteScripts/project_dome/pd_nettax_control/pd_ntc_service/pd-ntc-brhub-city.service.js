/**
 * @NApiVersion 2.1
 * @NModuleScope public
 * @author Project Dome - Roque Costa
*/

define(
    [
        '../../pd_c_netsuite_tools/pd_cnt_standard/pd-cnts-search.util.js'
    ],
    function (
        search_util
    ) {

        const TYPE = 'customrecord_ftebr_city';
        const FIELDS = {
            id: { name: 'custrecord_ftebr_city_i_ibge_code' },
            name: { name: 'name' }
        };

        function getAllBrHubCities() {
            return search_util.all({
                type: TYPE,
                columns: FIELDS
            });
        }

        return {
            getAllBrHubCities: getAllBrHubCities,
        };
    }
);