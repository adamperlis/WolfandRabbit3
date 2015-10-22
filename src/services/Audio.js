module.exports = function() {

	var Notify = require('../lib/Notify')

	return {
		audioElement: null,
		track: null,
		notify: new Notify(),
		setAudioElement: function(element) {
			this.audioElement = element;
		},
		play: function(track){

			if(!this.loaded || track != this.track){
				this.load(track)
			}

			this.audioElement.play()

			this.playing = true;
			this.notify.trigger('played');
		},
		pause: function(){
			this.audioElement.pause()
			this.playing = false;
			this.notify.trigger('paused');

		},
		load: function(track){
			this.track = track;
			this.audioElement.src = track.streaming;
			this.audioElement.load();

			this.loaded = true
		},
		playing: false,
		loaded: false,
		toggleState: function(track){

			if (track != this.track) {
				this.pause();
			}

			if(this.playing){
				this.pause()
			} else {
				this.play(track)
			}
		}
	}
}