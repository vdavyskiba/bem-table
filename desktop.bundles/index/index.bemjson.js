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
        //{block: 'model'},
        {
            block: 'model',
            js: true,
            modelParams: {
                name: 'users',
                data: {
                    list: [
                        {
                            block: 'model',
                            js: true,
                            modelParams: {
                                name: 'user',
                                data: {username: 'test', email: 'test@testmail.com', active: false, balance: -10.25, details: 'link http://ya.ru'}
                            }
                        }
                    ]
                }
            }
        },
        {
            block: 'users-table',
            mix: [{ block: 'table-controller', js: true }],
            js: {

            },
            content:[

            ]
        }
    ]
};
