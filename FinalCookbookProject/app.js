const express = require("express");
const { connect } = require("tedious");
var sql = require('mssql');
var configfile = require('./dbconfig');

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

async function makeQuery2(query) {

    // var config = {  
    //     server: 'titan.csse.rose-hulman.edu',  //update me
    //     authentication: {
    //         type: 'default',
    //         options: {
    //             userName: 'raglanma', //update me
    //             password: 'ilppdYAY!1'  //update me
    //         }
    //     },
    //     options: {
    //         // If you are on Microsoft Azure, you need encryption:
    //         encrypt: true,
    //         database: 'CSSE333_S2G2_FinalProjectDB'  //update me
    //     }
    // };  

    try {
        let pool = await sql.connect(configfile);
        let result = await pool.request().query(query);
        return result.recordsets;
    } catch(error) {
        console.log(error);
    }
}

/*
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
*/





insert_person = function(username, password){
    
    // connection.connect().then(function(connection) {
        var request = new sql.Request(Connection);
        request.input('username', sql.VarChar(50), username);
        request.input('password', sql.VarChar(50), password);
        request.execute('insert_person');
    
   // })
}

app.get("/api/insertPerson/:username/:password", (request, response) =>{
    const userN = request.params.username;
    const pass = request.params.password;

   // insert_person(userN, pass);
    // makeQuery(`EXEC insert_person @username = "${userN}", @password = "${pass}"`)
    // response.send("Hello_Person");

    makeQuery2(`EXEC insert_person @username = "${userN}", @password = "${pass}"`).then(result => {
        //console.log(result[0][0][" "]);
        response.send(result[0]);
    }).catch(result => {
        console.log("Promise rejected");
    })
})

insert_recipe = function(skillLevel, instructions, MealType, PrepTime, ChefUser, recipeName){
    var request = new sql.Request(Connection);
    request.input('@SkillLevel_2', sql.Int, skillLevel);
    request.input('@Instructions_3', sql.Text, instructions);
    request.input('@MealType_4', sql.NVarChar(20), MealType);
    request.input('@PrepTime_5', sql.Time(0), PrepTime);
    request.input('@chefUser_6', sql.VarChar(50), ChefUser);
    request.input('@name_7', sql.VarChar(50), recipeName);
    request.execute('insert_Recipe');

}
app.get("/api/insertRecipe/:skillLevel/:instructions/:MealType/:PrepTime/:ChefUser/:recipeName", (request, response) =>{
    const skill = request.params.skillLevel;
    const instructions = request.params.instructions;
    const mealT = request.params.MealType;
    const prepT = request.params.PrepTime;
    const chef = request.params.ChefUser;
    const recipeName = request.params.recipeName;


   // insert_person(userN, pass);
    // makeQuery(`EXEC insert_recipe @SkillLevel_2 = "${skill}", @Instructions_3 = "${instructions}", @MealType_4 = "${mealT}",
    //  @PrepTime_5 = "${prepT}", @chefUser_6= "${chef}", @name_7= "${recipeName}" `)
    // response.send("Hello_Recipe");
    //console.log(`EXEC insert_recipe @SkillLevel_2 = ${skill}, @Instructions_3 = "${instructions}", @MealType_4 = "${mealT}", @PrepTime_5 = NULL, @chefUser_6= "${chef}", @name_7= "${recipeName}"`);
    makeQuery2(`EXEC insert_recipe @SkillLevel_2 = ${skill}, @Instructions_3 = "${instructions}", @MealType_4 = "${mealT}", @PrepTime_5 = NULL, @chefUser_6= "${chef}", @name_7= "${recipeName}" `).then(result => {
        response.send({});
    })
})

insert_chef = function(ChefUser){
    var request = new sql.Request(Connection);
    request.input('@username', sql.VarChar(50), ChefUser);
    request.execute('insert_Chef');
}
app.get("/api/insertChef/:username", (request, response) =>{
    const userC = request.params.username;
    // makeQuery(`EXEC insert_Chef @username = "${userC}"`);
    // response.send("Hello_Chef");

    makeQuery2(`EXEC insert_Chef @username = "${userC}"`).then(result => {
        response.send(result[0]);
    })

})

insert_ingredient = function(ingredient){
    var request = new sql.Request(Connection);
    request.input('@ingredientName', sql.VarChar(20), ingredient);
    request.execute('createIngredient');
}

app.get("/api/insertIngredient/:ingredientName", (request, response)=>{
    const ing = request.params.ingredientName;
    // makeQuery(`EXEC createIngredient @ingredientName = "${ing}"`);
    // response.send("Hello_ing");

    makeQuery2(`EXEC createIngredient @ingredientName = "${ing}"`).then(result => {
        response.send(result[0]);
    })
})

insert_tool = function(tool){
    var request = new sql.Request(Connection);
    request.input('@toolName', sql.VarChar(20), tool);
    request.execute('createTool');
}

app.get("/api/insertTool/:toolName", (request, response)=>{
    const tool = request.params.toolName;
    // makeQuery(`EXEC createTool @toolName = "${tool}"`);
    // response.send("Hello_tool");

    makeQuery2(`EXEC createTool @toolName = "${tool}"`).then(result => {
        response.send(result[0]);
    })
})


Made_From = function(ID, ingredient, units){
    var request = new sql.Request(Connection);
    request.input('@recipeID', sql.Int, ID);
    request.input('@ingredientName',sql.VarChar(20), ingredient)
    request.input('@units',sql.NVarChar(20), units)
    request.execute('createMadeFrom');

}

app.get("/api/insertMadeFrom/:ID/:ingredient/:units", (request, response)=>{
    const recID = request.params.ID;
    const ing = request.params.ingredient;
    const units = request.params.units;
    // makeQuery(`EXEC createMadeFrom @recipeID = "${recID}", @ingredientName = "${ing}", @units = "${units}"`);
    // response.send("Hello_MadeFrom");

    makeQuery2(`EXEC createMadeFrom @recipeID = "${recID}", @ingredientName = "${ing}", @units = "${units}"`).then(result => {
        response.send(result[0]);
    })
})

needs = function(toolName, recipeID){
    var request = new sql.Request(Connection);
    request.input('@toolName',sql.VarChar(20), toolName);
    request.input('@recipeID', sql.Int, recipeID);
    request.execute('createNeed');

}
app.get("/api/insertNeed/:toolName/:recipeID", (request, response)=>{
    const recID = request.params.recipeID;
    const tool = request.params.toolName;
    // makeQuery(`EXEC createNeed @toolName= "${tool}", @recipeID = "${recID}"`);
    // response.send("Hello_Need");

    makeQuery2(`EXEC createNeed @toolName= "${tool}", @recipeID = "${recID}"`).then(result => {
        response.send(result[0]);
    })
})


del_chef = function(username){
    var request = new sql.Request(Connection);
    request.input('@username',sql.VarChar(50), username);
    request.execute('delete_Chef');
}
app.get("/api/deleteChef/:username", (request, response)=>{
    const user = request.params.username;
    // makeQuery(`EXEC delete_Chef @username= "${user}"`);
    // response.send("Hello_Del_Chef");

    makeQuery2(`EXEC delete_Chef @username= "${user}"`).then(result => {
        response.send(result[0]);
    })
})

del_person = function(username){
    var request = new sql.Request(Connection);
    request.input('@username',sql.VarChar(50), username);
    request.execute('delete_Person');
}
app.get("/api/deletePerson/:username", (request, response)=>{
    const user = request.params.username;
    // makeQuery(`EXEC delete_Person @username= "${user}"`);
    // response.send("Hello_Del_Person");

    makeQuery2(`EXEC delete_Person @username= "${user}"`).then(result => {
        response.send(result[0]);
    })
})
del_recipe = function(ID){
    var request = new sql.Request(Connection);
    request.input('@RecipeID_1',sql.Int, ID);
    request.execute('delete_Recipe');
}
app.get("/api/deleteRecipe/:ID", (request, response)=>{
    const RecID = request.params.ID;
    // makeQuery(`EXEC delete_Recipe @RecipeID_1= "${RecID}"`);
    // response.send("Hello_Del_Recipe");

    makeQuery2(`EXEC delete_Recipe @RecipeID_1= "${RecID}"`).then(result => {
        response.send(result[0]);
    })
})

del_MadeFrom = function(ID, ingredient){
    var request = new sql.Request(Connection);
    request.input('@RecipeID_1',sql.Int, ID);
    request.input('@ingredientName', sql.VarChar(20), ingredient);
    request.execute('delete_MadeFrom');
}

app.get("/api/deleteMadeFrom/:ID/:ingredient", (request, response)=>{
    const RecID = request.params.ID;
    const ing = request.params.ingredient;
    // makeQuery(`EXEC deleteMadeFrom @RecipeID= "${RecID}", @ingredientName= "${ing}"`);
    // response.send("Hello_Del_MadeFrom");

    makeQuery2(`EXEC deleteMadeFrom @RecipeID= "${RecID}", @ingredientName= "${ing}"`).then(result => {
        response.send(result[0]);
    })
})

del_Needs = function(toolName, ID){
    var request = new sql.Request(Connection);
    request.input('@toolName', sql.VarChar(20), toolName);
    request.input('@recipeID',sql.Int, ID);
    request.execute('deleteNeed');
}

app.get("/api/deleteNeed/:toolName/:ID", (request, response)=>{
    const RecID = request.params.ID;
    const tool = request.params.toolName;
    // makeQuery(`EXEC deleteNeed @toolName= "${tool}", @recipeID= "${RecID}"`);
    // response.send("Hello_Del_Needs");

    makeQuery2(`EXEC deleteNeed @toolName= "${tool}", @recipeID= "${RecID}"`).then(result => {
        response.send(result[0]);
    })
})

upd_chef = function(username, profilePic, stars, bio){
    var request = new sql.Request(Connection);
    request.input('@username', sql.VarChar(50), username);
    request.input('@profilePic',sql.Image, profilePic);
    request.input('@stars',sql.Int, stars); // Should not exist
    request.input('@bio',sql.VarChar(300), bio);
    request.execute('update_Chef');
}

app.get("/api/updateChef/:username/:profilePic/:stars/:bio", (request, response)=>{
    const username = request.params.username;
    const profilePic = request.params.profilePic;
    const stars = request.params.stars;
    const bio = request.params.bio;
    // makeQuery(`EXEC deleteNeed @username= "${username}", @profilePic= "${profilePic}", @stars= "${stars}",  @bio= "${bio}"`);
    // response.send("Hello_Update_Chef");

    makeQuery2(`EXEC deleteNeed @username= "${username}", @profilePic= "${profilePic}", @stars= "${stars}",  @bio= "${bio}"`).then(result => {
        response.send(result[0]);
    })
})

upd_Person= function(oldUser, newUser, password){
    var request = new sql.Request(Connection);
    request.input('@oldusername', sql.VarChar(50), oldUser);
    request.input('@username',sql.VarChar(50), newUser);
    request.input('@password',sql.VarChar(50), password); // Should not exist
    request.execute('update_Person');
}

app.get("/api/updatePerson/:oldusername/:username/:password", (request, response)=>{
    const oldusername = request.params.oldusername;
    const username = request.params.username;
    const password = request.params.password;
    // makeQuery(`EXEC update_Person @oldusername= "${oldusername}", @username= "${username}", @password= "${password}"`);
    // response.send("Hello_Update_Person");



    makeQuery2(`EXEC update_Person @oldusername= "${oldusername}", @username= "${username}", @password= "${password}"`).then(result => {
        response.send(result[0]);
    })
})

upd_Recipe= function(ID, skillLevel, instructions, mealType, PrepTime, ChefUser, recipeName){
    var request = new sql.Request(Connection);
    request.input('@RecipeID_1', sql.Int, ID);
    request.input('@SkillLevel_2',sql.Int, skillLevel);
    request.input('@Instructions_3',sql.Text, instructions); 
    request.input('@MealType_4', sql.NVarChar(20), mealType);
    request.input('@PrepTime_5', sql.Time(0), PrepTime);
    request.input('@chefUser_6', sql.VarChar(50), ChefUser);
    request.input('@name_7', sql.VarChar(50), recipeName);
    request.execute('Update_Recipe');
}

app.get("/api/updateRecipe/:ID/:skillLevel/:instructions/:mealtype/:prepTime/:chefUser/:recipeName", (request, response)=>{
    const ID = request.params.ID;
    const skillLevel = request.params.skillLevel;
    const instructions = request.params.instructions;
    const mealType = request.params.mealtype;
    const prepTime = request.params.prepTime;
    const chefUser = request.params.chefUser;
    const recipeName = request.params.recipeName;

    // makeQuery(`EXEC Update_Recipe @RecipeID_1= "${ID}", @SkillLevel_2= "${skillLevel}", @Instructions_3= "${instructions}",
    // @MealType_4= "${mealType}", @PrepTime_5= "${prepTime}", @chefUser_6= "${chefUser}", @name_7 = "${recipeName}"`);
    // response.send("Hello_Update_Recipe");

    makeQuery2(`EXEC Update_Recipe @RecipeID_1= "${ID}", @SkillLevel_2= "${skillLevel}", @Instructions_3= "${instructions}", @MealType_4= "${mealType}", @PrepTime_5= "${prepTime}", @chefUser_6= "${chefUser}", @name_7 = "${recipeName}"`).then(result => {
        response.send(result[0]);
    })

    
})

upd_MadeFrom= function(ID, ingredient, units){
    var request = new sql.Request(Connection);
    request.input('@recipeID', sql.Int, ID);
    request.input('@ingredientName',sql.VarChar(20), ingredient);
    request.input('@units',sql.NVarChar(20), units); 
    request.execute('updateMadeFrom');
}

app.get("/api/update_MadeFrom/:ID/:ingredient/:units", (request, response)=>{
    const ID = request.params.ID;
    const ingredient = request.params.ingredient;
    const units = request.params.units;
   

    // makeQuery(`EXEC updateMadeFrom @recipeID= "${ID}", @ingredientName= "${ingredient}", @units= "${units}"`);
    // response.send("Hello_Update_Recipe");
    makeQuery2(`EXEC updateMadeFrom @recipeID= "${ID}", @ingredientName= "${ingredient}", @units= "${units}"`).then(result => {
        response.send(result[0]);
    })
})



app.get("/api/verifyLogin/:username/:password", (request, response) => {
    const user = request.params.username;
    const pass = request.params.password;

    // const value = makeQuery(`EXEC verifyLogin @username = ${user}, @password = ${pass}`);
    // //returns 0 on success
    // response.send(value)

    makeQuery2(`EXEC verifyLogin @username = ${user}, @password = ${pass}`).then(result => {
        response.send(result[0]);
    })
    
})











app.get("/api/readrecipes", async function(request, response) {
    //const recipeID = request.params.id;

    
    makeQuery2("select Recipe_Name from Recipe").then(result => {
        response.send(result[0]);
    })

    
});

app.get("/api/readOneRecipe/:id", async function(request, response) {
    //const recipeID = request.params.id;
    const ID = request.params.ID;
    console.log("hi");
    
    makeQuery2(`select * from Recipe where ID = ${ID}`).then(result => {
        response.send(result[0]);
    })

    
});


app.get("/api/allRecipesonHomepage", async function(request, response) {
    //const recipeID = request.params.id;
    
    makeQuery2("select * from dbo.HomepageRecipe").then(result => {
        response.send(result[0]);
    })

    
});



app.listen(3000);
