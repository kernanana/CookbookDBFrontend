// var express = require('express');
// var app = express();

// app.get('/', function(req, res) {

//     var sql = require("mssql");

//     // config for your database
//     var config = {
//         user: 'spevakj1',
//         password: 'Password123',
//         server: 'titan.csse.rose-hulman.edu',
//         database: 'CSSE333_S2G2_FinalProjectDB'
//     };

//     // connect to your database
//     sql.connect(config, function(err) {

//         if (err) console.log(err);

//         // create Request object
//         var request = new sql.Request();

//         // query to the database and get the records
//         request.query('Select * from Chef', function(err, recordset) {

//             console.log("Hello");

//         });
//     });
// });

// var server = app.listen(5000, function() {
//     console.log('Server is running..');
// });



var rhit = rhit || {};

const express = require('express');

 const app = express();
var server = app.listen(5000, function () {

console.log('Server is listening at port 5000...');

 });



/** globals */

rhit.variableName = "";
// CONNECTION -----------------------------

rhit.connectDatabase = function () {

    var Connection = require('tedious').Connection;

    var config = {

        server: 'titan.csse.rose-hulman.edu',  //update me

        authentication: {

            type: 'default',

            options: {

                userName: 'Kernan Lee', //update me

                password: 'Password123'  //update me

            }

        },

        options: {

            // If you are on Microsoft Azure, you need encryption:

            encrypt: true,

            database: 'CSSE333_S2G2_FinalProjectDB'  //update me

        }

    };

    var connection = new Connection(config);

    connection.on('connect', function (err) {

        // If no error, then good to proceed.

        console.log("Connected");

    });



    connection.connect();

}
 //EXECUTE A QUERY -----------------------------------------------



 rhit.readPerson = function () {

    var Request = require('tedious').Request;

    var TYPES = require('tedious').TYPES;



    function executeStatement() {

        request = new Request("SELECT *, FROM Person AS p", function (err) {

            if (err) {

                console.log(err);

            }

        });

        var result = "";

        request.on('row', function (columns) {

            columns.forEach(function (column) {

                if (column.value === null) {

                    console.log('NULL');

                } else {

                    result += column.value + " ";

                }

            });

            console.log(result);

            result = "";

        });


        request.on('done', function (rowCount, more) {

            console.log(rowCount + ' rows returned');

        });



        // Close the connection after the final event emitted by the request, after the callback passes

        request.on("requestCompleted", function (rowCount, more) {

            connection.close();

        });

        connection.execSql(request);

    }

};





/* Main */

/** function and class syntax examples */

rhit.main = function () {

    console.log("Ready");

    rhit.connectDatabase();

    console.log("Connected");

    rhit.readPerson();

    console.log("Finished Reading");

};



rhit.main();