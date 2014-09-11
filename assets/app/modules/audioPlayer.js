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
			// this.getTracks();
		},

		getData: function(url, callback) {
			var self = this,
					id;

			$.ajax('http://api.soundcloud.com/resolve.json?url='+url+'&client_id=a77915dfdf4416fdfa51d32f981f9988')
			.done(function(r) {
				callback.audioData = r;
				callback.trigger('data');
      });
		},

		play: function(id) {
			SC.stream('/tracks/'+id, {autoPlay: true});
		}

	}

	return def;
})(jQuery, _, snshn);