define(function(){
	//note content view
	var NoteContentView = Backbone.View.extend({
		tagName: "div",
		className: "front",
		template: $("#noteContentTemplate").html(),
		events: {
			'click button.delete': 'remove',
			'click button.edit': 'showEdit'
		},
		initialize: function() {
			this.model.on('change', function() {
				if (this.options.model.changed.title || this.options.model.changed.content || this.options.model.changed.date) {
					console.log('model changed', this);
					console.log('new content', this.options.model.changed);
					this.render();
				}
			}, this);
		},
		render:function () {
			console.log('rendering front ', this);
			var tmpl = _.template(this.template);
			this.$el.html(tmpl(this.model.toJSON())); 
			return this;
		},
		remove: function(){
			if (confirm('Are you sure?')){
				console.group('deleting note', this);
				var parentEl = $(this.el).parent();
				parentEl.on('webkitTransitionEnd',function(){
					$(this).remove();
					console.log('note element removed', this);
					console.groupEnd();
				});
				parentEl.addClass('shrink');
				this.model.destroy();
				console.log('note model removed', this);
			}
		},
		showEdit: function() {
			console.group('editing note', this);
			this.$el.parent().addClass('flip');
		}
	});

	return NoteContentView;
});