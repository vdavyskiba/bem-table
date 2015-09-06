modules.define('table-controller',
    ['i-bem', 'i-bem__dom', 'jquery', 'BEMHTML', 'glue', 'api-users', 'model',  'view-user'],
function(provide, BEM, BEMDOM, $, BEMHTML, Glue, apiUsers, MODEL, viewUser) {

    window.$ = $; //todo: workaround for "$.extend is undefined" exception inside bem core

    provide(BEMDOM.decl( { block: this.name, baseBlock: Glue }, {

        onSetMod: {
            'js': {
                inited: function () {
                    this.__base.apply(this, arguments);

                    this.container = this.elem('users-list');

                    this.collection = this.model.get('list');

                    this.appendToEnd(this.page);

                    this.initScrollEvents();
                }
            }
        },

        page: 0,

        count: 25,

        limit: 2,

        offset: 0,

        ROW_H: 43,

        loading: false,

        container: null,

        collection: null,

        initScrollEvents: function(){

            var TRESHOLD = 10,
                viewport =this.domElem.height(),
                prevScrollTop = 0;

            function scroll (evt) {
                var scrolled = evt.target.scrollTop,
                    height = evt.target.scrollHeight,
                    trashed = Math.abs(scrolled - prevScrollTop) <= TRESHOLD,
                    virtual = this.getVirtualHeight();

                if(this.loading || trashed){
                    return true;
                }

                if(scrolled + viewport*1.5 > height){

                    this.appendToEnd(++this.page);
                    prevScrollTop = scrolled;
                }

                if(virtual && (scrolled - viewport < virtual) && this.page>this.limit){

                    this.prependToTop(--this.page-this.limit);
                    prevScrollTop = scrolled;
                }

                return true;
            }

            this.domElem.on('scroll', scroll.bind(this));
        },

        appendToEnd: function(page){

            this.fetchData(page, $.proxy(function(data){

                var compiled = data.map($.proxy(function(data){
                    var model = this.collection.add(data);
                    return viewUser.compile(model);
                }, this));

                this.container.append(BEMHTML.apply(compiled));

                this.removeTop();

            },this));
        },

        prependToTop: function(page){

            this.fetchData(page, $.proxy(function(data){

                var compiled = data.map($.proxy(function(data){
                    var model = this.collection.addByIndex(0, data);
                    return viewUser.compile(model);
                }, this));

                this.container.prepend(BEMHTML.apply(compiled));

                this.removeBottom();

            },this));
        },

        fetchData: function(page, callback){
            this.loading = true;
            var params = {
                page: page,
                count: this.count
            };
            apiUsers.fetch(params, $.proxy(function(data){
                if(!data.length){
                    this.loading = false;
                    return;
                }
                callback(data);
                this.loading = false;
            },this), console.log);
        },

        removeBottom: function(){

            var offset = this.page - this.offset;

            if(offset <= 0){return}

            var count = offset * this.count;

            this.container.children().slice(-count).remove();

            while(count--){
                this.collection.remove(this.collection.getByIndex(this.collection.length()-1).id);
            }

            this.offset -= offset;
            this.updateScrolableArea();
        },

        removeTop: function(){

            var offset = this.page - this.limit - this.offset;

            if(offset <= 0){return}

            var count = offset * this.count;

            this.container.children().slice(0, count).remove();

            while(count--){
                this.collection.remove(this.collection.getByIndex(0).id);
            }

            this.offset += offset;
            this.updateScrolableArea();
        },

        updateScrolableArea: function(){
            this.container.css('top', this.getVirtualHeight());
        },

        getVirtualHeight: function(){
            return this.ROW_H * this.offset * this.count;
        }

    }));

});
