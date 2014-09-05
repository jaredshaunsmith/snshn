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
            console.log('new home view from single');
            new snshn.homeView().fetchPosts(1);
        }
        // console.log('post view', post_id, slug);
        new snshn.singlePostView().fetchPost(post_id, 'sunshine_product');
        // new snshn.CommentView();
    },

    singlePage: function(post_id) {
        // console.log(post_id);
        new snshn.singlePostView().fetchPost(post_id, 'page');
    },

    home: function() {
        // console.log('home');
        new snshn.homeView().fetchPosts(1);
    },

    paged: function(page_id) {
        new snshn.homeView().fetchPosts(page_id);
    }

});