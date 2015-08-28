module.exports = {
    block: 'page',
    title: 'test-table',
    head: [
        { elem: 'css', url: '_index.css' },
        { elem: 'meta', attrs: { name: 'description', content: 'bem-mvc demo example' }}
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
