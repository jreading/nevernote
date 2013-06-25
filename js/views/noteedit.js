define([
	'underscore',
	'backbone'
	],function(_, Backbone){
	//note edit view
	var NoteEditView = Backbone.View.extend({
		tagName: "div",
		className: "back",
		template: $("#noteEditTemplate").html(),
		events: {
			'click button.save': 'save',
			'click button.cancel': 'cancel'
		},
		render:function () {
			console.log('rendering back ', this);
			var tmpl = _.template(this.template);
			this.$el.html(tmpl(this.model.toJSON()));
			return this;
		},
		save: function(){
			console.log('saving note ', this);
			var form = $(this.el).find('form');
			this.model.save({
				title: form.find('.title').val(),
				content: form.find('.content').val(),
				date: moment().format("MM/DD/YYYY HH:mm"),
				newNote: false
			});
			setTimeout($.proxy(function(){
				this.$el.parent().removeClass('flip');
				console.log('showing front');
			},this),10);
		},
		cancel: function() {
			console.log('canceling', this);
			this.$el.parent().removeClass('flip');
		}
	});

	return NoteEditView;
});