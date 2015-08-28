([
    {
        tech: 'js',
        shouldDeps: [

        ],
        mustDeps: [
            'jquery',
            'i-bem',
            'i-model',
            'glue',
            {
                block: 'table-controller',
                tech: 'bemhtml'
            },
            {
                block: 'checkbox',
                tech: 'bemhtml'
            },
            {
                block: 'link',
                tech: 'bemhtml'
            }
        ]
    },
    {
        mustDeps: [
            'jquery',
            'i-bem',
            'i-model',
            'glue',
            'api-users',
            'model-users'
        ]
    }
])
