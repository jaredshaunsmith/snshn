snshn.MobileToggle = (function($, _, snshn) {
	
	var def = function() {
		this.$els = {
			'item' : $('.mobile-toggle'),
			'menu' : $('.post-list'),
			'children' : $('.post-list .post h3 a')
		};

		this.states = {
			'active' : 'active'
		};

		this.contents = {
			'pre' : '+',
			'post' : '-'
		};

		init.call(this);
	};

	var init = function() {
		this.bind();
	};

	def.prototype.bind = function() {
		var self = this;
		this.$els.item.on('click', function() {
			self.toggleMenu();
		});

		this.$els.children.on('click', function() {
			if($(window).width() < snshn.breakPoint) {
				self.toggleMenu();
			}
		})
	};

	def.prototype.toggleMenu = function() {
		if(this.$els.menu.hasClass(this.states.active)) {
			this.$els.item.html(this.contents.pre);
		} else {
			this.$els.item.html(this.contents.post);
		}

		this.$els.menu.toggleClass(this.states.active);
	};

	return def;
})(jQuery, _, snshn);