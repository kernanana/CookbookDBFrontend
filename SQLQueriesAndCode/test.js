/** namespace. */
var rhit = rhit || {};

/** globals */
rhit.variableName = "";

/** function and class syntax examples */
rhit.Connect = function () {
	/** function body */
};

rhit.addButton = function(username, password) {
    var Request = require('tedious').Request  
    var TYPES = require('tedious').TYPES;  
  
    //function executeStatement1() {  
    request = new Request("exec insert_person @username = @name @password = @pass", function(err) {  
     if (err) {  
        console.log(err);}  
    });  
        request.addParameter('name', TYPES.NVarChar,'SQL Server Express 2014');  
        request.addParameter('pass', TYPES.NVarChar , 'SQLEXPRESS2014');  
        // request.addParameter('Cost', TYPES.Int, 11);  
        // request.addParameter('Price', TYPES.Int,11);  
        // request.on('row', function(columns) {  
        //     columns.forEach(function(column) {  
        //       if (column.value === null) {  
        //         console.log('NULL');  
        //       } else {  
        //         console.log("Product id of inserted item is " + column.value);  
        //       }  
        //     });  
        // });

        // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);  
    //}  
};


/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");
    rhit.Connect();


    document.querySelector("[ADD BUTTON]").onclick = (event) => {

        var user = document.getElementsByName("[USER FIELD]");
        var pass = document.getElementsByName("[PASSWORD FIELD]");
        
        rhit.addButton(user, pass);
    }

    



};

rhit.main();