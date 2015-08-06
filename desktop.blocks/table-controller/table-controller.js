modules.define('table-controller', ['i-bem__dom', 'api-users'], function(provide, BEMDOM, api) {

    provide(BEMDOM.decl( this.name, {

        onSetMod : {
            'js' : {
                inited: function () {
                    this.init()
                }
            }
        },

        init: function(){
            api.fetch(this.onData, this.onDataErr)
        },

        onData: function (data) {
            console.info('data fetched')
        },

        onDataErr: function (e) {
            console.error(e)
        }

    }));

});
