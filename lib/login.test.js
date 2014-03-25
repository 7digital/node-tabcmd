var mocha	= require('mocha'),
	expect	= require('chai').expect,
	sinon	= require('sinon'),
	sandbox,

	login	= require('./login'),
	test = require('./settings'),

	childProcess	= require('child_process')
	;

describe('login', function(){
	beforeEach(function(){
		sandbox = sinon.sandbox.create();
	});

	afterEach(function(){
		sandbox.restore();
	});

	describe('connect', function(){
		it ('should connect to the tableau server', function(){
			childProcess.exec = sandbox.spy();
			sandbox.stub(test, 'settings', {
				server : {
					host : 'myserver.local'
				},
				auth : {
					user : 'me',
					password : 'pass'
				}
			});

			var callback = function(){};

			login.login(callback);

			expect(childProcess.exec.calledOnce).to.be.true;
			expect(childProcess.exec.args[0][0]).to.equal('tabcmd login -s myserver.local -u me -p pass');
			expect(childProcess.exec.args[0][1]).to.equal(callback);
		});
	});

	describe('logout', function(){
		it ('should logout from the tableau server', function(){
			childProcess.exec = sandbox.spy();
			var callback = function(){};

			login.logout(callback);

			expect(childProcess.exec.calledOnce).to.be.true;
			expect(childProcess.exec.args[0][0]).to.equal('tabcmd logout');
			expect(childProcess.exec.args[0][1]).to.equal(callback);
		});
	});
});