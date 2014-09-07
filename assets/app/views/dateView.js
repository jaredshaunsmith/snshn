snshn.DateView = (function($, _, snshn) {
	var def = function(dates) {
		this.$el = $('#yearList ul');

		this.dates = dates;

		this.tmpl = _.template('<li class="year-list-item">{{ d }}</li>');

		init.call(this);
	};

	var init = function() {
		this.setup();
	};

	def.prototype = {
		setup: function() {
			var self = this;

			_.each(this.dates, function(date) {
				self.$el.append(self.tmpl({d: date }));
			});

		}
	}

	return def;
})(jQuery, _, snshn);