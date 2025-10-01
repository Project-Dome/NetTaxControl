/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @author Project Dome - Roque Costa
*/

define(
    [
        '../../pd_c_netsuite_tools/pd_cnt_standard/pd-cnts-suitelet.util.js'
    ],
    function (
        suitelet_util
    ) {
        function onRequest(context) {
            return suitelet_util.build({
                context: context,
                title: 'NetTax Control',
                statics: {
                    html: ([
                        'pd-ntc-nettax-control.html'
                    ]),
                    js: ([
                        'pd-ntc-nettax-control.main.js',
                        'pd-ntc-nettax-control.ui.js'
                    ])
                }
            });
        }

        return {
            onRequest: onRequest
        }
    }
);