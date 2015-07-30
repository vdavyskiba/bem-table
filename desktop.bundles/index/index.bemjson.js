module.exports = {
    block: 'page',
    title : 'Title of the page',
    favicon : 'public/favicon.ico',
    head : [
        { elem : 'meta', attrs : { name : 'description', content : '' } },
        { elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1' } },
        { elem : 'css', url : '_index.css', ie: false  }
    ],
    scripts: [{ elem : 'js', url : '_index.js' }],
    content: [
        {
            block : 'header',
            tag : 'header',
            content : [
                'For more info about BEM check out ',
                {
                    block : 'link',
                    url : 'http://bem.info/',
                    content : 'bem.info'
                },
                '.'
            ]
        },
        {
            block : 'content',
            content : [

                {
                    block : 'table',
                    tag : 'table',
                    attrs : { style : 'table-layout: fixed; width: 600px' },
                    content : [
                        {
                            elem : 'row',
                            tag : 'tr',
                            content : [
                                { elem : 'title', tag : 'th', content : 'size s' },
                                { elem : 'title', tag : 'th', content : 'size m' },
                                { elem : 'title', tag : 'th', content : 'size l' },
                                { elem : 'title', tag : 'th', content : 'size xl' }
                            ]
                        },
                        {
                            elem : 'row',
                            tag : 'tr',
                            content : [
                                { elem : 'cell', tag : 'td', size : 's' },
                                { elem : 'cell', tag : 'td', size : 'm' },
                                { elem : 'cell', tag : 'td', size : 'l' },
                                { elem : 'cell', tag : 'td', size : 'xl' }
                            ].map(function(cell) {
                                    cell.attrs = { style : 'width: 25%; vertical-align: top;' };
                                    cell.content = [
                                        cell.size
                                    ];
                                    return cell;
                                })
                        }
                    ]
                }
            ]
        }
    ]
};
