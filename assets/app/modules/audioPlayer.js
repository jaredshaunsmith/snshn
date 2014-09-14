snshn.AudioPlayer = (function($, _, snshn) {
	var def = function() {
		this.$els = {
			'footerAudio' : $('.footer .audio-play'),
			'fotterAudioStop' : $('.footer .audio-stop'),
			'head' : $('.audio-player-head'),
			'reels' : $('.audio-player-reel-left, .audio-player-reel-right'),
			'stop' : $('.footer .audio-stop'),
			'tapeLeft' : $('.audio-tape.left .tape'),
			'tapeRight' : $('.audio-tape.right .tape')
		};

		this.states = {
			'playing' : 'is-playing',
			'rotating' : 'rotate',
			'paused' : 'is-paused'
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
              snshn.player.pause();
          } else if($(this).hasClass(self.states.paused)){
              snshn.player.resume();
          } else {
              $(this).addClass(self.states.playing);
              snshn.player.play(self.audioData.id);
          }
			});

			this.$els.stop.on('click', function() {
				snshn.player.stop();
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

			// this.$els.footerAudio.html(self.audioData.title);
		},

		stop: function(sound) {
			if(!_.isUndefined(sound)) {
				sound.stop();
			} else {
				snshn.player.currentTrack.stop();
			}
			this.playing = false;
			this.removeActiveStates();
		},

		resume: function() {
			snshn.player.currentTrack.resume();
			this.addActiveStates();
			this.scaleTapes();
		},

		pause: function() {
			snshn.player.currentTrack.pause();
			this.addPausedStates();
			clearInterval(this.scale);
		},

		go: function(sound) {
			sound.play();
			this.addActiveStates();
			this.$els.tapeLeft.css({
				'background-size': '100%',
				'-webkit-background-size' : '100%',
				'-moz-background-size' : '100%'
			});
			this.$els.tapeRight.css({
				'background-size': '0%',
				'-webkit-background-size' : '0%',
				'-moz-background-size' : '0%'
			});
			this.scaleTapes();
		},

		addActiveStates: function() {
			$("[data-id='"+self.audioData.id+"']").removeClass(this.states.paused).addClass(this.states.playing);
			this.$els.footerAudio.addClass(this.states.playing).removeClass(this.states.paused);
			this.$els.head.addClass(this.states.playing);
			this.$els.reels.addClass(this.states.rotating).removeClass(this.states.paused);
		},

		addPausedStates: function() {
			this.$els.footerAudio.removeClass(this.states.playing);
			$("[data-id='"+self.audioData.id+"']").removeClass(this.states.playing).addClass(this.states.paused);
			this.$els.reels.addClass(this.states.paused);
			this.$els.footerAudio.addClass(this.states.paused);
		},

		removeActiveStates: function() {
			this.$els.footerAudio.removeClass(this.states.playing);
			$("[data-id='"+self.audioData.id+"']").removeClass(this.states.playing);
			this.$els.head.removeClass(this.states.playing);
			this.$els.reels.removeClass(this.states.rotating, this.states.paused);
		},

		scaleTapes: function() {
			var self = this,
					length = snshn.player.currentTrack.duration,
					maxWidth = 55,
					originalScale = length / maxWidth;

			console.log(originalScale, length);


			this.scale = setInterval(function() {
				self.$els.tapeLeft.css({
					'background-size': 100 - ((snshn.player.currentTrack.position / snshn.player.currentTrack.duration) * 100).toFixed(2) +'%',
					'-webkit-background-size' : 100 - ((snshn.player.currentTrack.position / snshn.player.currentTrack.duration) * 100).toFixed(2) +'%',
					'-moz-background-size' : 100 - ((snshn.player.currentTrack.position / snshn.player.currentTrack.duration) * 100).toFixed(2) +'%'
				});
				self.$els.tapeRight.css({
					'background-size': ((snshn.player.currentTrack.position / snshn.player.currentTrack.duration) * 100).toFixed(2) +'%',
					'-webkit-background-size' : ((snshn.player.currentTrack.position / snshn.player.currentTrack.duration) * 100).toFixed(2) +'%',
					'-moz-background-size' : ((snshn.player.currentTrack.position / snshn.player.currentTrack.duration) * 100).toFixed(2) +'%'
				});

				if(((snshn.player.currentTrack.position / snshn.player.currentTrack.duration) * 100).toFixed(2) == 100) {
					self.stop();
					clearInterval(self.scale);
				}
			}, 1000);
		}

	}

	return def;
})(jQuery, _, snshn);