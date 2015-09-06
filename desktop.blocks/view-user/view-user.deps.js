([
    {
        tech: 'js',
        shouldDeps: [
            'model',
            'i-model'
        ],
        mustDeps: [
            {
                block: 'view-user',
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
        mustDeps: ['i-bem']
    }
])
