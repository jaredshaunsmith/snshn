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
            if($(window).width() < snshn.breakPoint) {
                snshn.$els.left.removeAttr('style');
                snshn.$els.right.removeAttr('style');
            } else {
                var w = $(window).outerHeight(true),
                    fH = snshn.$els.footer.outerHeight(true),
                    oF = '60',
                    t = w - fH - oF;

                snshn.$els.left.css('height', t);
                snshn.$els.right.css('height', t);
            }
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
        this.sc();
        this.mobileToggle();
    }

    def.prototype = {

        bind: function() {
            var self = this;
            $(window).on('resize', function() {
                snshn.setupHeights();
            });
        },

        intro: function() {
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
                    $('.scrollbar').each( function() {
                        $(this).scroller();
                    });
                    snshn.setupHeights();
                }, 800);
            }, 3000);
            
            self.backboneStart();
        },

        backboneStart: function() {
            snshn.app = new snshn.AppRouter();
            Backbone.history.start();
        },

        sc: function() {
            SC.initialize({
                client_id: 'a77915dfdf4416fdfa51d32f981f9988'
            });
            snshn.player = new snshn.AudioPlayer();
        },

        mobileToggle: function() {
            $(window).on('homeReady', function() {
                new snshn.MobileToggle();
            });
        }
    };

    return def;
})(jQuery, snshn);
