var login = require('../lib/login');
var xport = require('../lib/export');

var TabCmd = function(config){
	this.settings = config;
};

TabCmd.prototype.login = login.login;
TabCmd.prototype.logout = login.logout;
TabCmd.prototype.export = xport;

module.exports = TabCmd;