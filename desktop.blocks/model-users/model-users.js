modules.define('model', function(provide, MODEL) {

    provide(MODEL.decl('model-users', {

        list: {
            type: 'models-list',
            modelName: 'model-user'
        },

        empty: {
            type: 'boolean',
            calculate: function() {
                return this.get('list', 'raw').length;
            },
            dependsFrom: 'list'
        }

    }));

});
