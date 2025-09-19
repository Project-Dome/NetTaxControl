/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @author Project Dome - {{titleCase devName}}
*/

define(
    [
        '../..//suitelet'
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
                        'pd-ntc-nettax-control.js',
                    ])
                }
            });
        }

        return {
            onRequest: onRequest
        }
    }
);