var helpers = require('diy-handlebars-helpers');
helpers();

var hbs = require('handlebars-runtime');
var _   = require('lodash');

_.extend(hbs.helpers, require('diy-handlebars-helpers')());