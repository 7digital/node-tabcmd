var mocha	= require('mocha'),
	expect	= require('chai').expect,

	TabCmd	= require('./TabCmd'),
	settings = require('../lib/settings')
	;

describe('TabCmd', function(){
	it ('should set the settings', function(){
		var config = { hello : 'hi' };

		var tabCmd = new TabCmd(config);

		expect(settings.settings).to.equal(config);
	});

	it ('should expose a login method', function(){
		var tabCmd = new TabCmd();

		expect(tabCmd.login).to.exist;
	});

	it ('should expose a logout method', function(){
		var tabCmd = new TabCmd();

		expect(tabCmd.logout).to.exist;
	});

	it ('should expose an export png method', function(){
		var tabCmd = new TabCmd();

		expect(tabCmd.export.png).to.exist;
	});
});