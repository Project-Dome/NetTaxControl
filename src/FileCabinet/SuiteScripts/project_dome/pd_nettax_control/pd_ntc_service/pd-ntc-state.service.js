/**
 * @NApiVersion 2.1
 * @NModuleScope public
 * @author Project Dome - Roque Costa
*/

define(
    [
        'N/log',

        '../../pd_c_netsuite_tools/pd_cnt_standard/pd-cnts-search.util.js'
    ],
    function (
        log,
         
        search_util
    ) {

        const TYPE = 'customrecord_brl_brazil_state';
        const FIELDS = {
            id: { name: 'custrecord_brl_brstt_t_acronym' },
            name: { name: 'name' }
        };

        function getAllStates() {
            const teste = search_util.all({
                type: TYPE,
                columns: FIELDS
            });
            log.error('teste', teste);
            return teste;
        }

        return {
            getAllStates: getAllStates
        };
    }
);