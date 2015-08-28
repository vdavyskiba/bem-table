modules.define('model', function(provide, MODEL) {

    provide(MODEL.decl('model-person', {

        first: {
            type: 'string',
            validation: {
                rules: {
                    required: true
                }
            }
        },

        last: {
            type: 'string',
            validation: {
                rules: {
                    required: true
                }
            }
        }
    }));

});




