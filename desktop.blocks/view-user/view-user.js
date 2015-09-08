modules.define('view-user', ['i-bem'], function(provide, BEM) {

    provide(BEM.decl({},{

        compile: function(user) {

            var person = user.get('name'),
                balance = user.get('balance');

            return {

                block: 'table-controller',

                elem: 'row',

                id: user.id,

                _id: user.get('_id'),

                active: user.get('active'),

                url: ['/users/get/', user.get('_id')].join(''),

                username: user.get('username'),

                email: user.get('email'),

                firstName: person.get('first'),

                lastName: person.get('last'),

                balance: balance.toFixed(2),

                status: balance < 0 ? 'negative' : balance > 0 ? 'positive' : '',

                details: user.get('details'),

                created: user.get('created')

            };
        }

    }));
});
