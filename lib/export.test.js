var mocha	= require('mocha'),
	expect	= require('chai').expect,
	sinon	= require('sinon'),
	sandbox,

	exporter	= require('./export'),

	childProcess	= require('child_process')
	;

describe('export', function(){
	beforeEach(function(){
		sandbox = sinon.sandbox.create();
	});

	afterEach(function(){
		sandbox.restore();
	});

	describe('png', function(){
		it ('should create a png of the specified sheet', function(){
			childProcess.exec = sandbox.spy();
			sandbox.stub(process, 'cwd', function() { return 'c:\\hello'});

			var callback = function(){};

			var viewName = 'MyWorkbook/MySheet';
			exporter.png(viewName, callback);

			expect(childProcess.exec.calledOnce).to.be.true;
			expect(childProcess.exec.args[0][0]).to.equal('tabcmd export MyWorkbook/MySheet --png -f c:\\hello\\temp\\export');
			expect(childProcess.exec.args[0][1]).to.equal(callback);
		});

		it ('should write the png to a temp folder', function(){
			childProcess.exec = sandbox.spy();
			sandbox.stub(process, 'cwd', function() { return 'c:\\hello'});

			var viewName = 'MyWorkbook/MySheet';
			exporter.png(viewName);

			expect(childProcess.exec.calledOnce).to.be.true;
			expect(childProcess.exec.args[0][0]).to.contain('-f c:\\hello\\temp\\export');
		});
	});
});