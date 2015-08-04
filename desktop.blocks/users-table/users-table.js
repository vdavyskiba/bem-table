modules.define('users-table', ['i-bem', 'i-bem__dom', 'jquery'], function(provide, BEM, BEMDOM, $) {

    provide(BEMDOM.decl({
        onSetMod: {
            'js': function() {

                var users = BEM.blocks['users'];
                console.log(users);
            }
        }
    },{

    }));
});
