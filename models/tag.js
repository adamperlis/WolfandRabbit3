module.exports = function(knex) {
	var bookshelf = require('bookshelf')(knex);

	return bookshelf.Model.extend({

		tableName: 'tags'

	})
}