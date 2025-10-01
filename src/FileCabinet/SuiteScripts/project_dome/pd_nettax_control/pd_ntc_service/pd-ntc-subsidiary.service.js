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

        const TYPE = 'subsidiary';
        const FIELDS = {
            id: { name: 'internalid' },
            name: { name: 'legalname' },
            businessLine: { name: 'custrecord_fte_subsidiary_l_lob', type: 'list' },
            taxRegime: { name: 'custrecord_fte_subsidiary_l_taxregime', type: 'list' },
            state: { name: 'state', type: 'list' },
            city: { name: 'city', type: 'list' }
        };

        function getSubsidiaries() {
            return search_util.all({
                type: TYPE,
                columns: FIELDS
            });
        }

        function getSubsidiaryById(subsidiaryId) {
            return search_util.first({
                type: TYPE,
                columns: FIELDS,
                query: search_util.where(search_util.query(FIELDS.id, 'is', subsidiaryId))
            });
        };

        return {
            getSubsidiaries: getSubsidiaries,
            getSubsidiaryById: getSubsidiaryById
        };
    }
);