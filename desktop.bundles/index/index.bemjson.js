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
            block: 'wrapper',
            content:[
                {
                    block : 'header',
                    tag : 'header',
                    content : [
                        {
                            tag: 'span',
                            content: 'Inspired by:'
                        },
                        {
                            block : 'link',
                            url : 'http://bem.info/',
                            content : 'bem.info'
                        },
                        {
                            block : 'link',
                            url : 'http://www.getmdl.io/components/index.html#tables-section',
                            content : 'getmdl.io'
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
                                    { name: '_id', display: 'id', active: true, align: 'align-r', width: 'small'},
                                    { name: 'active', display: 'active', active: false, align: 'align-c', width: 'small'},
                                    { name: 'username', display: 'username', active: true},
                                    { name: 'email', display: 'email', active: true},
                                    { name: 'name.first', display: 'first name', active: true},
                                    { name: 'name.last', display: 'last name', active: true},
                                    { name: 'balance', display: 'balance', active: true, align: 'align-r'},
                                    { name: 'details', display: 'details', active: true},
                                    { name: 'created', display: 'created', active: true}
                                ].map(function(item){
                                        return {
                                            block:'table-controller',
                                            elem: 'cell',
                                            mods:{
                                                align: item.align,
                                                width: item.width
                                            },
                                            content:(function(){
                                                if(!item.active){
                                                    return item.display
                                                }
                                                return [
                                                    {
                                                        block: 'sort-icon',
                                                        tag: 'span',
                                                        content: [
                                                            {
                                                                block : 'link',
                                                                mods: {
                                                                    icon: 'triangle-icon'
                                                                },
                                                                js: true,
                                                                url : '#/orderBy='+ item.name,
                                                                content : '&#9650;',
                                                                title : 'click to sort by ' + item.display + 'ascending'
                                                            },
                                                            {
                                                                block : 'link',
                                                                mods: {
                                                                    icon: 'triangle-icon'
                                                                },
                                                                url : '#/orderBy=-'+ item.name,
                                                                content : '&#9660;',
                                                                title : 'click to sort by ' + item.display + 'descending'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        tag: 'span',
                                                        content: item.display
                                                    }
                                                ]
                                            })()
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
        }
    ]
};
