modules.define('api-users', ['i-bem', 'jquery'], function(provide, BEM, $) {

    provide(BEM.decl({},{

        fetch: function(success, error, param){

            var data = param || { page: 0, count: 10};

            return $.ajax({
                type: 'GET',
                url: '/users/fetch',
                data: data,
                dataType:' json',
                success: success,
                error: error
            });
        }

    }));
});
