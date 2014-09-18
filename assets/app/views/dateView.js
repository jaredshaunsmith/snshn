snshn.DateView = (function($, _, snshn) {
	var def = function(dates) {
		// this.$el = $('#yearList ul');

		this.dates = dates;

		this.tmpl = _.template('<li class="year-list-item stick-em-up" style="position: absolute; left: -100%;">{{ d }}</li>');

		this.parent = $('#leftScroll');

		init.call(this);
	};

	var init = function() {
		this.bind();
		this.setup();
		this.checkSize();
	};

	def.prototype = {
		bind: function() {
			var self = this;

			$(window).on('resize', function() {
				self.checkSize();
			});

			// this.parent.on('scrolling', function() {
			// 	self.stick();
			// });
		},

		checkSize: function() {
			if($(window).width() < snshn.breakPoint) {
				this.stickDestroy();
			} else {
				this.stickSetup();
			}
		},

		setup: function() {
			var self = this;

			_.each(this.dates, function(date) {
				var match = $('[data-year*="'+date+'"]').first();
				var top = match.offset().top + 'px';

				var item = self.tmpl({d: date});
				match.prepend(item);
			});

			// this.stickSetup();
		},

		stickSetup: function() {
			var item = $('.year-list-item');

			item.each(function() {
				var stick = $(this);

				$.data(stick[0], 'pos', stick.offset().top);
			});

			window.setTimeout(function() {
				item.first().css({'position': 'fixed', 'top': item.offset().top, 'left': item.offset().left});
			},1000);
		},

		stickDestroy: function() {
			var item = $('.year-list-item');

			item.removeAttr('style');
		},

		stick: function() {
			var self = this;
			// new snshn.StickEmUp($('li.stick-em-up'));
			var item = $('.year-list-item');


			item.each(function(i) {

				var stick = $(this),
						next = item.eq(i+1),
						prev = item.eq(i-1),
						pos = $.data(stick[0], 'pos');

				if(pos <= self.parent.data().scroller.sT) {
					stick.css({'position': 'fixed', 'top': item.offset().top, 'left': item.offset().left });

					if(next.length > 0 && stick.offset().top >= $.data(stick[0], 'pos') - stick.outerHeight()) {
						stick.css({'postion':'absolute', 'top': $.data(next[0], 'pos') - (stick.outerHeight() * 2) - (item.eq(0).offset().top - item.eq(i).outerHeight()) });
					}
				} else {
					stick.css({'position': 'absolute', 'top': '', 'left': '-100%' });

					if(prev.length > 0 && self.parent.data().scroller.sT <= $.data(stick[0], 'pos') - prev.outerHeight()) {
						prev.css({'position': 'fixed', 'top': stick.offset().top, 'left': stick.offset().left});
					}
				}
				
			});
		}

	};

	return def;
})(jQuery, _, snshn);