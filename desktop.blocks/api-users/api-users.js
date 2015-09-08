modules.define('api-users', ['i-bem', 'jquery'], function(provide, BEM, $) {

    provide(BEM.decl({},{

        path: '/users/fetch',

        fetch: function(param, success, error){

            var data = {
                page: param.page || 0,
                count: param.count || 25,
                sort: param.sort || 'id'
            };

            return $.ajax({
                type: 'GET',
                url: this.path,
                data: data,
                dataType:' json',
                success: success,
                error: error
            });
        }

    }));
});
