snshn.AudioPlayer = (function($, _, snshn) {
	var def = function() {
		this.$els = {
			'footerAudio' : $('.footer .audio')
		};

		this.states = {
			'playing' : 'is-playing'
		};

		init.call(this);
	};

	var init = function() {
		this.bind();
	};

	def.prototype = {
		bind: function() {
			// this.getTracks();
			this.$els.footerAudio.on('click', function() {
				 if($(this).hasClass(self.states.playing)) {
              $(this).removeClass(self.states.playing);
              snshn.player.stop();
          } else {
              $(this).addClass(self.states.playing);
              snshn.player.play(self.audioData.id);
          }
			});
		},

		getData: function(url, callback) {
			var self = this,
					id;

			$.ajax('http://api.soundcloud.com/resolve.json?url='+url+'&client_id=a77915dfdf4416fdfa51d32f981f9988')
			.done(function(r) {
				callback.audioData = r;
				self.audioData = r;
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

			this.$els.footerAudio.html(self.audioData.title);
		},

		stop: function(sound) {
			if(!_.isUndefined(sound)) {
				sound.stop();
			} else {
				snshn.player.currentTrack.stop();
			}
			this.playing = false;
			this.$els.footerAudio.removeClass(this.states.playing);
		},

		go: function(sound) {
			sound.play();
			this.$els.footerAudio.addClass(this.states.playing);
		}

	}

	return def;
})(jQuery, _, snshn);