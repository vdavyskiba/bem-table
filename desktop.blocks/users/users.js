modules.define(
    'users',
    ['i-bem__dom', 'jquery', 'BEMHTML', 'glue'],
    function(provide, BEMDOM, $, BEMHTML, Glue) {

        provide(BEMDOM.decl({ block: 'users', baseBlock: Glue }, {

            onSetMod: {
                js: function() {
                    this.__base();

                    this.modelPath = this.model.path();
                    this.list = this.elem('users-list');

                    this.model.on('list', 'add', function(e, data) {
                        BEMDOM.append(this.list, this._generateTodoItem(data.model));
                    }, this);
                }
            },

            add: function(model) {
                model && this.model.get('list').add(model);
            },

            update: function(models) {
                models && BEMDOM.update(this.list, BEMHTML.apply(models.map(this._generateTodoItem, this)));
            },

            _generateTodoItem: function(model) {
                return BEMHTML.apply({
                    block: 'user',
                    elem: 'item',
                    mods: $.extend({ id: model.id }),
                    parentPath: this.modelPath,
                    text: model.get('username'),
                    id: model.id
                });
            }

        }));

    });


