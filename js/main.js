require.config({
    baseUrl: "js",
    paths: {
        "jquery": "libs/jquery.min",
        "json2": "libs/json2",
        "moment": "libs/moment.min",
        "backbone": "libs/backbone",
        "localstorage": "libs/backbone.localStorage-min",
        "underscore": "libs/underscore"
    },
    shim: {
      // Backbone
      "backbone": {
         // Depends on underscore/lodash and jQuery
         "deps": ["underscore", "jquery"],
         // Exports the global window.Backbone object
         "exports": "Backbone"
      }
   }
  });

require([
	"jquery",
	"underscore",
	"backbone",
	"json2",
	"moment",
	"localstorage",
	"app"
	], function($, _, Backbone, json, moment, localstorage, app) {
		app.initialize();
});