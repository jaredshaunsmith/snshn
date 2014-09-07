snshn.homeView = Backbone.View.extend({
    el: '#left',

    states: {
        'active' : 'active'
    },

    initialize: function() {
        // console.log('initializing home view');
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

         // get date-groups
        this.dates = [];
        _.each(this.collection.models, function(el) {
            var test = String(el.attributes.date).split(" "),
                pattern = /\d{4}$/;

            _.find(test, function(result) {
                if(pattern.test(result) && result.length <= 4) {
                    el.attributes.date = result;
                    if(!_.contains(self.dates, result)) {
                        self.dates.push(result);
                    }
                }
            });
        });
        window.setTimeout(function() {
            new snshn.DateView(self.dates);
        }, 2000);


        $(this.el).html(template);

        window.setTimeout(function() {
            $('#posts').addClass(self.states.active);
            $('[data-id="'+window.location.hash.split('#posts').pop().split('/')[1]+'"] a').addClass('active-post');
        }, 3000);
    }
});