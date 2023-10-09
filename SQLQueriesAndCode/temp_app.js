const express = require("express");

var app = express();
app.use(express.static("public"));
var Connection

Connection = require('tedious').Connection;  
var config = {  
    server: 'titan.csse.rose-hulman.edu',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'raglanma', //update me
            password: 'ilppdYAY!1'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'CSSE333_S2G2_FinalProjectDB'  //update me
    }
};  

makeQuery = function(query) {
    var connection = new Connection(config);

    
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.
        console.log("Connected");  

        var Request = require('tedious').Request;  
        var TYPES = require('tedious').TYPES;  
    
        
        request = new Request(query, function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
                if (column.value === null) {  
                console.log('NULL');  
                } else {  
                result+= column.value + " ";  
                }  
            });  
            console.log(result);  
            result ="";  
        });  

        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        });  
        
        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount, more) {
            connection.close();
        });
        connection.execSql(request);

    });
    
    connection.connect();
}
  


app.get("/api/readrecipe/:id", (request, response) => {
    const recipeID = request.params.id;

    
    makeQuery("select [password] from Person where Username = 'raglanma'");

    response.send(recipeID);
});



app.listen(3000);




//1.5

//2

//1.5

//1

//2

//2

