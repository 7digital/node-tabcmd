var childProcess	= require('child_process'),
	util			= require('util'),
	path			= require('path'),
	mkdirp			= require('mkdirp')
	;

function png(viewName, options, callback){
	var viewNameTokens = viewName.split('/');
	var exportFileName = viewNameTokens.pop();
	var exportDirectory = viewNameTokens.join('/');

	exportDirectory = path.join(process.cwd(), 'output', exportDirectory);
	
	mkdirp.mkdirp(exportDirectory, function(){
		childProcess.exec(buildCommand(), callback);
	});

	function buildCommand(){
		var filePath = path.join(exportDirectory, exportFileName);

		var parametersForCommand = [viewName];
		var command = 'tabcmd export %s'
		if (options.refresh) command += '?:refresh=yes';

		command += ' --png';

		if (options && options.width){
			command += ' --width %d';
			parametersForCommand.push(options.width);
		}

		if (options && options.height){
			command += ' --height %d';
			parametersForCommand.push(options.height);
		}

		command += ' -f %s';
		parametersForCommand.push(filePath);
		
		parametersForCommand.unshift(command);

		return util.format.apply(null, parametersForCommand);
	}
}

function csv(viewName, options, callback){
	var viewNameTokens = viewName.split('/');
	var exportFileName = viewNameTokens.pop();
	var exportDirectory = viewNameTokens.join('/');

	exportDirectory = path.join(process.cwd(), 'output', exportDirectory);
	
	mkdirp.mkdirp(exportDirectory, function(){
		childProcess.exec(buildCommand(), callback);
	});

	function buildCommand(){
		var filePath = path.join(exportDirectory, exportFileName);

		var parametersForCommand = [viewName];
		var command = 'tabcmd export %s';
		if (options.refresh) command += '?:refresh=yes';

		command = command += ' --csv';

		command += ' -f %s';
		parametersForCommand.push(filePath);
		
		parametersForCommand.unshift(command);

		return util.format.apply(null, parametersForCommand);
	}
}

module.exports = {
	png : png,
	csv : csv
};