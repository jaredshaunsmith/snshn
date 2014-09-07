snshn.singlePostView = Backbone.View.extend({
    el: '#single',

    initialize: function() {
        // console.log('initializing single post view');
        $('a, .post-list').removeClass('active-post');
        
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

        this.model = new wp.api.models.Post({'ID': post_id });

        this.model.url = snshn.options.baseUrl+'?json_route=/posts/'+post_id;

        this.model.fetch({
            success: function() {
                self.render();
            }
        });

    },

    render: function() {
        var self = this,
            container = $('#single-post-view').html();

        $(this.el).scroller('destroy');

        template = _.template(container, {
            post: this.model
        });

        $(this.el).html(template);
        snshn.tools.PubSub.trigger('post:single:' + this.type, this.model);

        $(this.el).scroller();

        window.setTimeout(function() {
            $(self.el).parent().addClass(self.states.active);
        }, 5000);

    }

});