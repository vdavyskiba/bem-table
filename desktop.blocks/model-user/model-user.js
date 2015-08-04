modules.define('model', function(provide, MODEL) {

    provide(MODEL.decl('model-user', {

        _id: {
            type: 'string',
            validation: {
                rules: {
                    required: true
                }
            },
            preprocess: function(val) {
                return '<a href="/users/get/' + val +'">' + this.get('username') + '</a>';
            }
        },

        username: {
            type: 'string',
            validation: {
                rules: {
                    required: true
                }
            },
            preprocess: function(val) {
                return '<i>' + val + '</i>';
            }
        },

        email: {
            type: 'string',
            validation: {
                rules: {
                    required: true
                },
                validate: function(val){
                    return /@.*?\./.test(val)
                }
            }
        },

        created: {
            type: 'string',
            default: Date.now,
            validation: {
                validate: function(val){
                    return new Date(val).toString() !== 'Invalid Date'
                }
            },
            preprocess: function(val) {
                return new Date(val).toLocaleString();
            }
        },

        active: {
            type: 'boolean',
            default: true
        },

        balance: {
            type: 'number',
            default: 0,
            preprocess: function(val) {
                return val.toFixed(2)
            }
        },

        name: {
            type: 'model',
            modelName: 'model-person'
        },

        details: {
            type: 'string'
        }
    }));

});

