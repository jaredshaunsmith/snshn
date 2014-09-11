snshn.singlePostView = Backbone.View.extend({
    el: '#single',

    initialize: function() {
        // console.log('initializing single post view');
        $('a, .post-list').removeClass('active-post');
        
    },

    states: {
        'active' : 'active'
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

        if($('.audio', $(this.el)).length > 0) {
            $('.audio', $(this.el)).each(function() {
                var url = $('.audio', $(self.el)).attr('data-url'),
                    aud = this;
                

                $(this).on('click', function() {
                    snshn.player.play($(this).attr('data-id'));
                });

                // no promises
                snshn.player.getData(url, self);

                self.on('data', function() {
                    $(aud).attr('data-id', self.audioData.id);
                    $(aud).html(self.audioData.title);
                    $(aud).data(self.audioData);
                });
            });
        }
    }

});