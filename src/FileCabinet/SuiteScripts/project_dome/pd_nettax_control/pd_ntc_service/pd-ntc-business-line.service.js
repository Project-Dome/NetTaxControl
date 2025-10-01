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

        const TYPE = 'customrecord_fte_lob';
        const FIELDS = {
            id: { name: 'internalid' },
            name: { name: 'name' }
        };

        function getAllBusinessLine() {
            return search_util.all({
                type: TYPE,
                columns: FIELDS
            });
        }

        return {
            getAllBusinessLine: getAllBusinessLine
        };
    }
);