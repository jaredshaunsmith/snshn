snshn.AudioPlayer = (function($, _, snshn) {
	var def = function() {
		this.$els = {

		};

		this.states = {

		};

		init.call(this);
	};

	var init = function() {
		this.bind();
	};

	def.prototype = {
		bind: function() {
			console.log('woo');
			this.getTracks();
		},

		getTracks: function() {
			$.get('http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/jared-smyth/nine-acres&client_id=a77915dfdf4416fdfa51d32f981f9988', function(r) {
          SC.stream('/tracks/'+r.id, {autoPlay: true});
      });
		},

	}

	return def;
})(jQuery, _, snshn);