snshn.Base = (function($, snshn){
    var def = function() {
        snshn.options = {
            'baseUrl' : 'http://stage.sunshineltd.info/'
        };

        snshn.$els = {
            footer: $('.footer'),
            left: $('#leftScroll'),
            right: $('#single')
        };

        snshn.tools = {
            'scrollToTop' : function() {
                $('html, body').animate({
                    scrollTop: $('#posts').offset().top
                }, 100);
            },

            'PubSub' : {}

        };

        snshn.setupHeights = function() {
            var w = $(window).outerHeight(true),
                fH = snshn.$els.footer.outerHeight(true),
                oF = '40',
                t = w - fH - oF;

            snshn.$els.left.css('height', t);
            snshn.$els.right.css('height', t);
        };

        _.extend(snshn.tools.PubSub, Backbone.Events);

        _.templateSettings = {
            evaluate : /\{\[([\s\S]+?)\]\}/g,
            interpolate : /\{\{([\s\S]+?)\}\}/g
        };

        init.call(this);
    };

    var init = function() {
        this.bind();
        this.intro();
    }

    def.prototype = {

        bind: function() {
            var self = this;
            $(window).on('resize', function() {
                snshn.setupHeights();
            });
        },

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
                setTimeout(function() {
                    snshn.setupHeights();
                }, 800);
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
