var childProcess	= require('child_process'),
	util			= require('util'),
	path			= require('path'),
	mkdirp			= require('mkdirp')
	;

function png(viewName, callback){
	var viewNameTokens = viewName.split('/');
	var exportFileName = viewNameTokens.pop();
	var exportDirectory = viewNameTokens.join('/');

	exportDirectory = path.join(process.cwd(), 'temp', 'export', exportDirectory);
	
	mkdirp.mkdirp(exportDirectory, function(){
		var filePath = path.join(exportDirectory, exportFileName);
		var cmd = util.format('tabcmd export %s --png -f %s', viewName, filePath);

		childProcess.exec(cmd, callback);
	});
}

module.exports = {
	png : png
};