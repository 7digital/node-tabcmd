node-tabcmd
===========

A simple wrapper around Tableau's tabcmd utility

# node-tabcmd

A simple wrapper around Tableau's tabcmd utility.

Functionality has been implemented 'as-needed' and thus not all features exist.  Pull requests are welcome.

# API

- [TabCmd](#TabCmd)
	- [login](#login)
	- [logout](#logout)
	- [export](#efxport)
		- [png](#png)

## TabCmd(config)
Create and configure a new tabcmd instance

Example:

````js
var tabcmd = new TabCmd({
	server : {
		host: 'my-tableau-server'
	},
	auth : {
		user : 'my-username',
		password: 'my-password'
	}
});
````

## login(callback)
Connect to the tableau server.  The provided callback will be called upon connection.  The session will remain open until the [logout](#logout) function is called.

Example:

````js
new TabCmd({...})
	.login(function(err){
		if (err){
			console.log(err);
		}
	});
````

## logout(callback)
End the current tableau session.  The provided callback will be called when the client has disconnected.

Example:

````js
var tabcmd = new TabCmd({...})
tabcmd.login(function(){
	tabcmd.logout();
});
````

## export
Provides functions to export data from the tableau server.

## png(viewName, [options], callback)
Exports a view as a png.  Output directory defaults to ./output. The provided callback is called upon creation.

Example:

````js
var tabcmd = new TabCmd({...})
tabcmd.login(function(){
	tabcmd.export.png('MyWorksheet/MyView', { width: 800, height: 1000}, function(err){
		if (err){
			console.log(err);
		}

		tabcmd.logout();
	});
});
````