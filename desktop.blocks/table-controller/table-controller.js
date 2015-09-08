modules.define('table-controller',
    ['i-bem', 'i-bem__dom', 'jquery', 'BEMHTML', 'glue', 'api-users', 'model', 'view-user'],
function(provide, BEM, BEMDOM, $, BEMHTML, Glue, apiUsers, MODEL, viewUser) {

    window.$ = $; //todo: workaround for "$.extend is undefined" exception inside bem core

    provide(BEMDOM.decl( { block: this.name, baseBlock: Glue }, {

        onSetMod: {
            'js': {
                inited: function () {

                    this.__base.apply(this, arguments);

                    this.container = this.elem('users-list');

                    this.viewport = this.elem('viewport');

                    this.collection = this.model.get('list');

                    this.initScrollEvents();

                    this.nextPage(this.page);

                    window.onpopstate = $.proxy(function() {
                        var idx = location.hash.indexOf('=');
                        this.sort = idx !== -1 ? location.hash.substring(idx+1) : 'id';
                        this.reset();
                    }, this);
                }
            }
        },

        page: 0,

        count: 25,

        sort: 'id',

        pagesLimit: 2,

        offset: 0,

        ROW_H: 43,

        loading: false,

        container: null,

        viewport: null,

        collection: null,

        reachEnd: false,

        reachTop: true,

        init: function(){

        },

        reset: function(){
            this.page = 0;
            this.offset = 0;
            this.reachEnd = false;
            this.reachTop = true;
            this.container.empty();
            this.collection.clear();
            this.updateScroll();
            this.viewport.scrollTop(0);
            this.nextPage(this.page);
        },

        nextPage: function(page){
            this.fetchData(page, this.addDataToEnd.bind(this));
        },

        prevPage: function(page){
            this.fetchData(page, this.addDataToTop.bind(this));
        },

        initScrollEvents: function(){

            var TRESHOLD = 10,
                viewport = this.viewport.height(),
                prevScrollTop = 0;

            function scroll (evt) {
                var scrolled = evt.target.scrollTop,
                    height = evt.target.scrollHeight,
                    trashed = Math.abs(scrolled - prevScrollTop) <= TRESHOLD,
                    virtual = this.getVirtualHeight();

                if(this.loading || trashed){
                    return true;
                }

                if(!this.reachEnd && scrolled + viewport*1.5 > height){

                    this.nextPage(++this.page);
                    if(virtual){
                        this.reachTop=false;
                    }
                    prevScrollTop = scrolled;
                }

                if(!this.reachTop && virtual && (scrolled - viewport < virtual) && this.page-this.pagesLimit > 0){

                    this.prevPage(--this.page-this.pagesLimit);
                    if(this.page===0){
                        this.reachTop = true;
                    }
                    prevScrollTop = scrolled;
                }

                return true;
            }

            this.viewport.on('scroll', scroll.bind(this));
        },

        addDataToEnd: (function(){

            var mapper = function(data){
                var model = this.collection.add(data);
                return viewUser.compile(model);
            };

            return function(data){

                if(!data.length){
                    this.reachEnd = true;//if reached the end
                }

                var compiled = data.map(mapper.bind(this));

                this.container.append(BEMHTML.apply(compiled));

                this.removeFromTop(data.length);
            }
        })(),

        addDataToTop: (function(){

            var mapper = function(data){
                var model = this.collection.addByIndex(0, data);
                return viewUser.compile(model);
            };

            return function(data){

                var compiled = data.map(mapper.bind(this));

                this.container.prepend(BEMHTML.apply(compiled));

                this.removeFromBottom();
            }
        })(),

        fetchData: function(page, callback){

            var params = {
                page: page,
                count: this.count,
                sort: this.sort
            };

            this.loading = true;

            apiUsers.fetch(params, $.proxy(function(data){
                callback(data);
                this.loading = false;
            },this), $.proxy(function(e){
                this.loading = false;
                console.log(e);
            },this));
        },

        removeFromBottom: function(){

            var offset = this.page - this.offset;

            if(offset <= 0){
                return
            }

            var count = offset * this.count;

            this.container.children().slice(-count).remove();

            while(count--){
                this.collection.remove(this.collection.getByIndex(this.collection.length()-1).id);
            }

            this.offset-= offset;
            this.reachEnd = false;
            this.updateScroll();
        },

        removeFromTop: function(count){

            var offset = this.page - this.pagesLimit - this.offset;

            if(offset <= 0){
                return
            }

            var countToRemove = offset * count;

            this.container.children().slice(0, countToRemove).remove();

            while(countToRemove--){
                this.collection.remove(this.collection.getByIndex(0).id);
            }

            this.offset += offset;
            this.updateScroll();
        },

        updateScroll: function(){
            this.container.css('top', this.getVirtualHeight());
        },

        getVirtualHeight: function(){
            return this.ROW_H * this.offset * this.count;
        }

    }));

});
