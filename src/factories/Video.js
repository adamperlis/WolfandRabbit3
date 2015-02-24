module.exports = function($sce, Modals) {

	var view = function() {
		// open a new modal and show this video
		Modals.open({
			template: require('../html/partials/modal.html'),
			video: this
		})
	}

	var Video = function(data) {
		this.id = data.id;

		this.iframeUrl = $sce.trustAsResourceUrl("//player.vimeo.com/video/" + this.id)

		this.view = view;

		this.thumbnails = {

			small: data.thumbnail_small,

			medium: data.thumbnail_medium,

			large: data.thumbnail_large

		}

	}

	return Video;
}
