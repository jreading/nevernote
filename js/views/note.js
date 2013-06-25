define([
	'backbone',
	'views/notecontent',
	'views/noteedit'
	],function(Backbone, NoteContentView, NoteEditView){
	//note view
	var NoteView = Backbone.View.extend({
		tagName: "div",
		className: "note shrink",
		render:function () {

			console.log('rendering note ', this);

			this.front = new NoteContentView({
				model: this.model
			});
			this.$el.append(this.front.render().el);

			this.back = new NoteEditView({
				model: this.model
			});
			this.$el.append(this.back.render().el);

			return this;
		}
	});

	return NoteView;
});