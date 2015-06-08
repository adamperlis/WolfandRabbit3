module.exports = function(knex, Track) {
	var bookshelf = require('bookshelf')(knex);

	return bookshelf.Model.extend({
		tableName: 'downloads',

		track: function(){
			return this.belongsTo(Track);
		},
	})
}