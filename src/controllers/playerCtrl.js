module.exports = function($sce) {
			this.config = {
				sources: [
              {src: $sce.trustAsResourceUrl("http://www.lowerfrequencies.com/wp-content/uploads/2013/mp3s/01%20Take%20Me%20To%20Church.mp3"), type: "audio/mpeg"},
              {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
          ],
				theme: {
          url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
				}
			}
		}
