snshn.homeView = Backbone.View.extend({
    el: '#left',

    states: {
        'active' : 'active'
    },

    initialize: function() {
        console.log('initializing home view');
    },

    fetchPosts: function(page_id) {
        var self = this;

        this.collection = new wp.api.collections.Posts();
        this.collection.fetch({
            data: {type: 'sunshine_product',page: page_id},
            success: function(a, b, c) {
                self.totalPages = c.xhr.getResponseHeader('X-WP-TotalPages');
                self.total = c.xhr.getResponseHeader('X-WP-Total');
                self.currentPage = page_id;

                self.render();
            }
        });
    },

    render: function() {
        var self = this;
        var template = $('#home-view').html();


        template = _.template(template, {
            posts: this.collection.models,
            pages: this.totalPages,
            total: this.total,
            currentPage: this.currentPage
        });

        $(this.el).html(template);

        window.setTimeout(function() {
            $(self.el).parent().parent().addClass(self.states.active);
        }, 5000);

        snshn.tools.scrollToTop();
    }
});