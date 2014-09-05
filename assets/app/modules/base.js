// $(document).ready(function() {
//     var q = asyncJS(),
//         scripts = document.getElementsByTagName('script'),
//         path = scripts[scripts.length-1].src.split('?')[0],
//         mydir = path.split('/').slice(0, -1).join('/')+'/';

//     // ///////////////////////
//     // all our modules to load
//     // ///////////////////////
//     var modules = [
//         'views/homeView',
//         'views/postView',
//         'router'
//     ];
//     //////////////////////////

//     q.add( _.map(modules, function(path) { return mydir + path + '.js' }) );

//     q.whenDone(function() {
//         new snshn.base()
//     });
// });



snshn.Base = (function($, snshn){
    var def = function() {
        snshn.options = {
            'baseUrl' : 'http://stage.sunshineltd.info/'
        };

        snshn.tools = {
            'scrollToTop' : function() {
                $('html, body').animate({
                    scrollTop: $('#posts').offset().top
                }, 100);
            },

            'PubSub' : {}

        };

        _.extend(snshn.tools.PubSub, Backbone.Events);

        _.templateSettings = {
            evaluate : /\{\[([\s\S]+?)\]\}/g,
            interpolate : /\{\{([\s\S]+?)\}\}/g
        };

        init.call(this);
    };

    var init = function() {
        $.ajaxSetup({
            beforeSend: function(jqXHR){
                $('.loading').show();
            },
            complete: function() {
                $('.loading').hide();
            }
        });

        this.intro();
    }

    def.prototype = {
        intro: function() {
            console.log('intro');
            var item = $('.intro'),
                    self = this,
                    footer = $('.footer');

            item.addClass('pre');

            window.setTimeout(function(){
                item.addClass('after');
            }, 1900);

            window.setTimeout(function(){
                item.addClass('done');
                footer.addClass('ready');
            }, 3600);
            
            self.backboneStart();
        },

        backboneStart: function() {
            snshn.app = new snshn.AppRouter();
            Backbone.history.start();
        }
    };

    return def;
})(jQuery, snshn);
