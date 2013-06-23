(function ($) {

	//note model
	var Note = Backbone.Model.extend({
		defaults:{
			title: "New Note",
			content: "",
			complete: false,
			date: moment().format("MM/DD/YYYY HH:mm"),
			tags: "",
			newNote: true
		}
	});

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
				console.groupEnd();
			},this),10);
		},
		cancel: function() {
			console.log('canceling', this);
			this.$el.parent().removeClass('flip');
			console.groupEnd();
		}
	});

	//notes collection
	var Notes = Backbone.Collection.extend({
		model: Note,
		localStorage: new Backbone.LocalStorage("notes")
	});

	//notes view
	var NotesView = Backbone.View.extend({
		el:$("#notes"),

		events: {
			'click button#add': 'addItem'
		},

		initialize:function(){
			console.group('initialize: ', this);
			this.collection = new Notes();
			this.collection.fetch();
			console.log('New collection from localStorage', this.collection);
			console.groupEnd();
			this.collection.on('remove add', function() {
				console.log('collection changed', this);
			}, this);
			this.render();
		},

		render: function(){
			var cnt = 1;
			console.group('render: ', this);
			_.each(this.collection.models, function(item, idx){
				console.group('rendering existing note ' + idx, item);
				this.renderNote(item,cnt);
				cnt++;
				console.groupEnd();
			}, this);
		},

		renderNote: function(item, cnt){
			var noteView = new NoteView({
				model: item
			});

			var noteViewEl = noteView.render().$el;
			console.log('appending note ', noteViewEl, item);
			noteViewEl.insertAfter('.seperator');
			setTimeout(function(){
				$(noteViewEl).removeClass('shrink');
				if (item.attributes.newNote) {
					$(noteViewEl).addClass('flip');
				}
			},100*cnt);
		},
		addItem: function(){
			console.group('creating new note', this);
			var note = new Note();
			this.collection.add(note);
			this.renderNote(note);
			note.save();
			console.log('new note created', note);
			console.groupEnd();
		}
	});

	console.group('NeverNote');

	var notesView = new NotesView();

})(jQuery);