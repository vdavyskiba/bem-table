module.exports = {
    block: 'page',
    title: 'test-table project',
    head: [
        { elem: 'css', url: '_index.css' },
        { elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1' } }
    ],
    scripts: [
        { elem: 'js', url: '_index.js' }
    ],
    content:[
        {
            block : 'header',
            tag : 'header',
            content : [
                {
                    block : 'link',
                    url : 'http://bem.info/',
                    content : 'bem.info'
                }
            ]
        },

        {
            block: 'model',
            modelName: 'model-users'
        },

        {
            block: 'table-controller',
            js: {
                modelName: 'model-users'
            },
            content: [
                {
                    block: 'table-controller',
                    elem: 'header',
                    content:[
                        [
                            '_id',
                            'active',
                            'username',
                            'email',
                            'name.first',
                            'name.last',
                            'balance',
                            'details',
                            'created'
                        ].map(function(name){
                                var formatted = name.replace('.', ' ').replace('_', '');
                                return {
                                    block:'table-controller',
                                    elem: 'cell',
                                    content:[
                                        {
                                            block : 'link',
                                            url : '#/orderBy='+ name,
                                            content : formatted,
                                            title : 'click to sort be ' + formatted
                                        }
                                    ]
                                }
                        })
                    ]
                },
                {
                    elem: 'viewport',
                    content:[
                        {
                            elem: 'users-list'
                        }
                    ]
                }
            ]
        }
    ]
};
