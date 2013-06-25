require.config({
	baseUrl: "js",
	paths: {
		jquery: "libs/jquery.min",
		json2: "libs/json2",
		moment: "libs/moment.min",
		backbone: "libs/backbone",
		localstorage: "libs/backbone.localStorage-min",
		underscore: "libs/underscore"
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

require([
	"json2",
	"moment",
	"localstorage",
	"app"
	], function(json, moment, localstorage, app) {
		app.initialize();
});