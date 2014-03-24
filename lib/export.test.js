var mocha	= require('mocha'),
	expect	= require('chai').expect,
	sinon	= require('sinon'),
	sandbox,

	exporter	= require('./export'),

	childProcess	= require('child_process'),
	mkdirp			= require('mkdirp')
	;

describe('export', function(){
	beforeEach(function(){
		sandbox = sinon.sandbox.create();
	});

	afterEach(function(){
		sandbox.restore();
	});

	describe('png', function(){
		it ('should create the export directory if it does not exist', function(){
			sandbox.stub(process, 'cwd', function() { return 'c:\\hello'});
			mkdirp.mkdirp = sandbox.stub();
			mkdirp.mkdirp.yields();

			var spy = sandbox.spy(mkdirp.mkdirp);

			exporter.png('MyWorkbook/MySheet', function(){});

			expect(mkdirp.mkdirp.calledOnce).to.be.true;
			expect(mkdirp.mkdirp.args[0][0]).to.equal('c:\\hello\\temp\\export\\MyWorkbook');

		});

		it ('should create a png of the specified sheet', function(){
			childProcess.exec = sandbox.spy();
			sandbox.stub(process, 'cwd', function() { return 'c:\\hello'});

			var callback = function(){};

			var viewName = 'MyWorkbook/MySheet';
			exporter.png(viewName, callback);

			expect(childProcess.exec.calledOnce).to.be.true;
			expect(childProcess.exec.args[0][0]).to.equal('tabcmd export MyWorkbook/MySheet --png -f c:\\hello\\temp\\export\\MyWorkbook\\MySheet');
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