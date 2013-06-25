define(["models/note"],function(Note){
	//notes collection
	var Notes = Backbone.Collection.extend({
		model: Note,
		localStorage: new Backbone.LocalStorage("notes")
	});

	return Notes;
});