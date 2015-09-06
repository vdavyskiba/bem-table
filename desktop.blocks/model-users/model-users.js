modules.define('model', function(provide, MODEL) {

    provide(MODEL.decl('model-users', {

        list: {
            type: 'models-list',
            modelName: 'model-user'
        },

    }));

});
