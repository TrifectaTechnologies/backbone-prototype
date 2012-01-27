var MovieView = Backbone.View.extend({
	initialize: function(args) {
		_.bindAll(this, 'changeTitle');
		this.model.bind('change:title', this.changeTitle);
	},

	events: {
		'click .title': 'handleTitleClick'
	},

	render: function() {
		var template = '\
		<li id="movie_{{ cid }}"><span class="title">{{ title }}</span> <span>{{ format }}</span>   <a href="#movies/remove/{{ cid }}">x</a></li>\
		';
		var context = _.extend(this.model.toJSON(), {cid: this.model.cid});
		$(this.el).html(Mustache.to_html(template, context));
		return this;
	},

	changeTitle: function() {
		this.$('.title').text(this.model.get('title'));
	},

	handleTitleClick: function() {
		alert('you clicked the title: '+this.model.get('title'));
	}
});

var MovieAppView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, "addMovie", "removeMovie");
		this.model.movies.bind('add', this.addMovie);
		this.model.movies.bind('remove', this.removeMovie);
	},

	render: function() {
		var template = '\
			<h1>Movie App</h1>\
			<a href="#movies/add">add new movie</a>\
			<ul id="movieList"></ul>';
		$(this.el).html(Mustache.to_html(template, this.model.toJSON()));
		this.movieList = this.$('#movieList');
		return this;
	},

	addMovie: function(movie) {
		var view = new MovieView({model: movie});
		this.movieList.append(view.render().el);
	},

	removeMovie: function(movie) {
		this.$('#movie_'+movie.cid).remove();
	}
});
