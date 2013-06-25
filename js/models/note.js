define([
	'underscore',
	'backbone'
  ],function(_,Backbone){
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

	return Note;
});