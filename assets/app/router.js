snshn.AppRouter = Backbone.Router.extend({
    routes: {
        '/': 'home',
        'posts/:id/*slug': 'singlePost',
        'page/:id/*slug': 'singlePage',
        'page/:id/*slug/*slug': 'singlePage',
        'p/:id': 'paged',
        '*actions': 'home'
    },

    singlePost: function(post_id, slug) {
        if($('#posts #left .post-list').length <= 0) {
            new snshn.homeView().fetchPosts(1);
        }
        new snshn.singlePostView().fetchPost(post_id, 'sunshine_product');

        $('a, .post-list').removeClass('active-post');
        $('[data-id="'+post_id+'"] a').addClass('active-post');
    },

    singlePage: function(post_id) {
        // console.log(post_id);
        new snshn.singlePostView().fetchPost(post_id, 'page');
    },

    home: function() {
        // console.log('home');
        new snshn.homeView().fetchPosts(1);
        
        if($('#single .post-list .post').length <= 0) {
            $(window).on('homeReady', function() {
                var first = $('#left .post-list .post').first().attr('data-id');
                _.defer(function() {
                    new snshn.singlePostView().fetchPost(first, 'sunshine_product');
                });
            });
        }
    },

    paged: function(page_id) {
        new snshn.homeView().fetchPosts(page_id);
    }

});