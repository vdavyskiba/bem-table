modules.define('table-controller',
    ['i-bem', 'i-bem__dom', 'jquery', 'BEMHTML', 'glue', 'next-tick', 'api-users', 'model'],
function(provide, BEM, BEMDOM, $, BEMHTML, Glue, nextTick, api, MODEL) {

    window.$ = $; //todo: workaround for "$.extend is undefined" error inside bem core

    provide(BEMDOM.decl( { block: this.name, baseBlock: Glue }, {

        onSetMod : {
            'js' : {
                inited: function () {

                    this.__base.apply(this, arguments);

                    this.modelPath = this.model.path();

                    console.info('init');

                    this.init()
                }
            }
        },

        init: function(){
            api.fetch(this.onData.bind(this), this.onError);
        },

        onData: function (data) {

            this.model.set('list', data.map(this.createModel));

            var container = this.elem('users-list');

            container.html('');

            var users = this.model.get('list', 'raw');

            users && BEMDOM.update(container, BEMHTML.apply(users.map(this.generate, this)));
        },

        onError: function (e) {
            console.error(e);
        },

        createModel: function(data) {
            return MODEL.create('model-user', data);
        },

        generate: function(user) {

            var person = user.get('name'),
                balance = user.get('balance');

            return BEMHTML.apply({
                block: 'table-controller',
                elem: 'row',
                mods: {
                    id: user.id
                },
                parentPath: this.modelPath,
                id: user.id,

                active: user.get('active'),

                url: ['/users/get/', user.get('_id')].join(''),
                username: user.get('username'),

                email: user.get('email'),

                firstName: person.get('first'),

                lastName: person.get('last'),

                balance: balance,

                status: balance < 0 ? 'negative' : balance > 0 ? 'positive' : '',

                details: user.get('details'),

                created: user.get('created')

            });
        }

    }));

});
