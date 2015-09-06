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
                    elem: 'users-list',
                    mix: {
                        block: 'table-controller',
                        elem: 'model-field',
                        js: true
                    },
                    content:[

                    ]
                }
            ]
        }
    ]
};
