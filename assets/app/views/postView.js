snshn.singlePostView = Backbone.View.extend({
    el: '#single',

    initialize: function() {
        console.log('initializing single post view');
    },

    states: {
        'active' : 'active'
    },

    events: {
        'submit #commentform': 'submitComment'
    },

    fetchPost: function(post_id, type) {
        self = this;
        self.type = type;
        // console.log(type, post_id, this);

        this.model = new wp.api.models.Post({'ID': post_id });

        this.model.url = snshn.options.baseUrl+'?json_route=/posts/'+post_id;

        this.model.fetch({
            success: function() {
                self.render();
            }
        });

    },

    render: function() {
        var self = this;
        var container = $('#single-post-view').html();

        template = _.template(container, {
            post: this.model
        });

        $(this.el).html(template);
        snshn.tools.PubSub.trigger('post:single:' + this.type, this.model);

        window.setTimeout(function() {
            $(self.el).parent().addClass(self.states.active);
        }, 5000);

        snshn.tools.scrollToTop();
    }

});