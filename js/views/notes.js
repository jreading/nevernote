define(["collections/notes","models/note","views/note"],function(Notes, Note, NoteView){
	//notes view
	var NotesView = Backbone.View.extend({
		el: $("#notes"),

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
			console.groupEnd();
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
	
	return NotesView;
});