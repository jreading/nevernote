define(["views/notes"],function(NotesView){

	var app = {
		initialize: function(){
			console.group('NeverNote');
			var notesView = new NotesView();
		}
	};

	return app;
});