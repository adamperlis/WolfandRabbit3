module.exports = function(knex, Tag, License) {
	var bookshelf = require('bookshelf')(knex);

	return bookshelf.Model.extend({

		tableName: 'tracks',
		tags: function(){
			return this.belongsToMany(Tag, 'tags_tracks', 'track_id', 'tag_id');
		},
		licenses: function(){
			return this.belongsToMany(License, 'licenses_tracks', 'track_id', 'license_id');
		}

	})
}