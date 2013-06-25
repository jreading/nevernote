require.config({
    baseUrl: "js",
    paths: {
        "jquery": "libs/jquery.min",
        "json2": "libs/json2",
        "moment": "libs/moment.min",
        "backbone": "libs/backbone",
        "localstorage": "libs/backbone.localStorage-min",
        "underscore": "libs/underscore"
    }
  });
require([
	//dependencies
	"jquery",
	"json2",
	"moment",
	"underscore",
	"backbone",
	"localstorage",
	"app"
	//app files

	], function() {
    
    
});