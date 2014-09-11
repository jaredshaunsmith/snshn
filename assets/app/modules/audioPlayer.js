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
			var self = this;
			if(this.playing) {
				this.stop();
			}

			SC.stream('/tracks/'+id, function(sound) {
				self.currentTrack = sound;
				self.playing = true;
				self.go(sound);
				snshn.player.currentTrack = sound;
			});
		},

		stop: function(sound) {
			if(!_.isUndefined(sound)) {
				sound.stop();
			} else {
				snshn.player.currentTrack.stop();
			}
			this.playing = false;
		},

		go: function(sound) {
			sound.play();
		}

	}

	return def;
})(jQuery, _, snshn);