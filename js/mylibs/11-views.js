var MovieView = Backbone.View.extend({
	initialize: function(args) {
		_.bindAll(this, 'changeTitle');
		this.model.bind('change:title', this.changeTitle);
	},

	events: {
		'click .title': 'handleTitleClick'
	},

	render: function() {
		var context = _.extend(this.model.toJSON(), {cid: this.model.cid});
		$(this.el).html(ich.movieView(context));
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
		$(this.el).html(ich.appView({}));
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
