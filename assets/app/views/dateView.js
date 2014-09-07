snshn.DateView = (function($, _, snshn) {
	var def = function(dates) {
		// this.$el = $('#yearList ul');

		this.dates = dates;

		this.tmpl = _.template('<li class="year-list-item stick-em-up" style="position: absolute; top: {{ t }}; left: -100%;">{{ d }}</li>');

		init.call(this);
	};

	var init = function() {
		this.setup();
	};

	def.prototype = {
		setup: function() {
			var self = this;

			_.each(this.dates, function(date) {
				var match = $('[data-year*="'+date+'"]').first();
				var top = match.offset().top + 'px';

				var item = self.tmpl({d: date, t: '' });
				match.prepend(item);
			});

			this.stick();
		},

		stick: function() {
			// new snshn.StickEmUp($('li.stick-em-up'));
		}

	};

	return def;
})(jQuery, _, snshn);