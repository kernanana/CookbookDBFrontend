var rhit = rhit || {};

/** globals */
rhit.variableName = "";
var username = "pingpong";

/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 *
 */

function htmlToElement(html) {
	var template = document.createElement('template');
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
}

rhit.mainPageController = class {
	constructor() {
		//TODO: display recipe
		const urlParams = new URLSearchParams(window.location.search);
		const recipeID = urlParams.get("id");
		console.log(recipeID);
		fetch(`/api/readOneRecipe/${recipeID}`).then(response => {
			return response.json();
		}).then(data => {
			if (data) {
				//fetch successful
				console.log(data);
				//display data -- make into a method later
			} else {
				//fetch fail
				console.log("couldn't get the recipes :(");
			}
		})

		// this.getRecipes();

		// document.querySelector("#addRecipeButton").onclick = (event) => {

		// 	// TODO: add html text fields and buttons to implement this function

		// 	// const skillLevel = document.querySelector("#inputSkillLevel").value;
		// 	// const instructions = document.querySelector("#inputInstructions").value;
		// 	// const mealType = document.querySelector("#inputMealType").value;
		// 	// const prepTime = document.querySelector("#inputPrepTime").value;

		// 	// this.addRecipe(skillLevel, instructions, mealType, prepTime);

		// }

		// document.querySelector("#editRecipeButton").onclick = (event) => {

		// 	// TODO: add html text fields and buttons to implement this function

		// 	// const id = 
		// 	// const skillLevel = document.querySelector("#inputSkillLevel").value;
		// 	// const instructions = document.querySelector("#inputInstructions").value;
		// 	// const mealType = document.querySelector("#inputMealType").value;
		// 	// const prepTime = document.querySelector("#inputPrepTime").value;

		// 	// this.editRecipe(skillLevel, instructions, mealType, prepTime);

		// }

		// document.querySelector("#deleteRecipeButton").onclick = (event) => {

		// 	// TODO: add html text fields and buttons to implement this function

		// 	// const id =

		// 	// this.deleteRecipe(id);

		// }

		// document.querySelector("#logoutButton1").onclick = (event) => {

		// 	console.log("logout1");

		// 	// Get username

		// 	// TODO: finish authorization 

		// }
	}

	getRecipes() {
		fetch(`/api/readrecipes`).then(response => {
			return response.json();
		}).then(data => {
			console.log(data);
			return data;
		})
	}
	addRecipe(skillLevel, instructions, mealType, prepTime) {

		//TODO: get chef username
		fetch(`/api/insertRecipe/${skillLevel}/${instructions}/${mealType}/${prepTime}/:ChefUser`).then(response => {
			return response.json();
		}).then(data => {
			console.log(data);
			//return data;
		})
	}
	editRecipe(skillLevel, instructions, mealType, prepTime) {
		fetch(`[link]`).then(response => {
			return response.json();
		}).then(data => {
			console.log(data);
			return data;
		})
	}
	deleteRecipe(id) {
		d
		fetch(`/api/deleteRecipe/${id}`).then(response => {
			return response.json();
		}).then(data => {
			console.log(data);
			//return data;
		})
	}
}





rhit.profilePageController = class {
	constructor() {

		//get name
		//var data = this.getUser();

		// document.querySelector("#createNewAccountButton").onclick = (event) => {

		// 	const user = document.querySelector("#username").value;
		// 	const pass = document.querySelector("#password").value;

		// 	// TODO: finish implementing this function

		// 	this.createUser(user, pass);

		// }

		// // TODO: add html buttons and fill in functions

		// document.querySelector("#editUser").onclick = (event) => {

		// 	const user = document.querySelector("#username").value;
		// 	const pass = document.querySelector("#password").value;

		// 	// TODO: finish implementing this function

		// 	//this.editUser(user, pass);

		// }

		// document.querySelector("#deleteUser").onclick = (event) => {

		// 	const user = document.querySelector("#username").value;
		// 	const pass = document.querySelector("#password").value;

		// 	// TODO: finish implementing this function

		// 	//this.deleteUser(user, pass);

		// }

		// document.querySelector("#logoutButton2").onclick = (event) => {

		// 	// Get current username

		// 	// TODO: finish implementing this function and authorization

		// 	console.log("logout2");

		// }

		document.querySelector("#insertRecipeButton").onclick = (event) => {
			const name = document.querySelector("#recipeName").value;
			const image = document.querySelector("#recipeName").value;
			const instructions = document.querySelector("#recipeName").value;
			const mealType = document.querySelector("#recipeName").value;
			const prepTime = document.querySelector("#recipeName").value;


			console.log("running1");

			rhit.ins_Recipe("1", instructions, mealType, prepTime, username, name);


			
		}



	}

	getUser() {
		fetch(`[link]`).then(response => {
			return response.json();
		}).then(data => {
			console.log(data);
			return data;
		})
	}
	createUser(user, pass) {
		fetch(`/api/insertPerson/${user}/${pass}`).then(response => {
			return response.json();
		}).then(data => {
			console.log(data);
			//return data;
		})
	}
	editUser(user, pass) {
		fetch(`[link]`).then(response => {
			return response.json();
		}).then(data => {
			console.log(data);
			return data;
		})
	}
	deleteUser(user, pass) {
		fetch(`/api/deletePerson/${user}`).then(response => {
			return response.json();
		}).then(data => {
			console.log(data);
			//return data;
		})
	}

	
}
rhit.loginPageController = class {
	constructor() {

		//TODO: create login page and button
		document.querySelector("#loginButton").onclick = (event) => {

			const user = document.querySelector("#username").value;
			const pass = document.querySelector("#password").value;

			fetch(`/api/verifyLogin/${user}/${pass}`).then(response => {
				return response.json();
			}).then(data => {
				console.log(data);
				//return data;
				if (data) {
					//login failed

				} else {
					//login success

					rhit.username = user;

					//switch to recipe page

				}
			})


		}
	}
}


/** function and class syntax examples */
rhit.readRecipe = function (id) {

	console.log("recipe: ");
	fetch(`/api/readrecipes`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
};
rhit.ins_chef = function (user) {
	fetch(`/api/insertChef/${user}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}

rhit.ins_person = function (user, password) {
	fetch(`/api/insertPerson/${user}/${password}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}
rhit.ins_Recipe = function (skillLevel, Instructions, MealType, PrepTime, chef, recipeName) {
	fetch(`/api/insertRecipe/${skillLevel}/${Instructions}/${MealType}/${PrepTime}/${chef}/${recipeName}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}

rhit.ins_ingredient = function (ingredientName) {
	fetch(`/api/insertIngredient/${ingredientName}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}
rhit.ins_tool = function (toolName) {
	fetch(`/api/insertTool/${toolName}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}
rhit.ins_MadeFrom = function (ID, ingredient, units) {
	fetch(`/api/insertMadeFrom/${ID}/${ingredient}/${units}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}
rhit.ins_Needs = function (toolName, ID) {
	fetch(`/api/insertNeed/${toolName}/${ID}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}

rhit.del_chef = function (user) {
	fetch(`/api/deleteChef/${user}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}
rhit.del_Person = function (user) {
	fetch(`/api/deletePerson/${user}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}
rhit.del_Recipe = function (ID) {
	fetch(`/api/deleteRecipe/${ID}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}
rhit.del_MadeFrom = function (ID, ingredient) {
	fetch(`/api/deleteMadeFrom/${ID}/${ingredient}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}
rhit.del_Needs = function (toolName, ID) {
	fetch(`/api/deleteNeed/${toolName}/${ID}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}
rhit.upd_Chef = function (user, profilePic, stars, bio) {
	fetch(`/api/updateChef/${user}/${profilePic}/${stars}/${bio}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}
rhit.upd_Person = function (oldusername, user, password) {
	fetch(`/api/updatePerson/${oldusername}/${user}/${password}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}
rhit.upd_Recipe = function (ID, skillLevel, Instructions, mealType, prepTime, chefUser, name) {
	fetch(`/api/updateRecipe/${ID}/${skillLevel}/${Instructions}/${mealType}/${prepTime}/${chefUser}/${name}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}
rhit.upd_MadeFrom = function (ID, ingredient, units) {
	fetch(`/api/update_MadeFrom/${ID}/${ingredient}/${units}`).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	})
}


rhit.allRecipesController = class {
	constructor() {
		fetch(`/api/allRecipesonHomepage`).then(response => {
			return response.json();
		}).then(data => {
			if (data) {
				//fetch successful
				console.log(data);
				//display data -- make into a method later
				const allRecipesView = htmlToElement(`<div class="feedInRecipes"></div>`);
				console.log(allRecipesView);
				for (let i = 0; i < data.length; i++) {
					const newRecipeThumbnail = this._createRecipeThumbnail(data[i]);
					console.log(data[i].Recipe_Name);
					newRecipeThumbnail.onclick = (event) => {
						console.log("clicked on ", i);
						window.location.href = `/index.html?id=${i + 1}`;
					}
					allRecipesView.appendChild(newRecipeThumbnail);
				}
				const loadRecipes = document.querySelector("#masterRecipeList");
				loadRecipes.appendChild(allRecipesView);
			} else {
				//fetch fail
				console.log("couldn't get the recipes :(");
			}
		})

	}
	_createRecipeThumbnail(recipeData) {
		let totalStars = ``;
		let singleStar = `<img class="star" src="images/Star.png" alt="">`;
		for (let i = 0; i < recipeData.Rating; i++) {
			totalStars = totalStars + singleStar;
			console.log(singleStar);
		}
		return htmlToElement(`<div class="recipeBox columns">
			<h4>${recipeData.Recipe_Name}</h4>
			<img class="recipeThumbnail" src="images/pizza1.webp" alt="">
			<div id="starContainer2">	
				${totalStars}
			</div>
	</div>`)

	}
}



rhit.ClassName = class {
	constructor() {

	}

	methodName() {

	}
}


// with connection.cursor() as current:
//     current.callproc("insert_person", (username, password))



/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");

	if (document.querySelector("#mainPage")) {
		console.log("main page");

		new rhit.mainPageController();

	}

	if (document.querySelector("#profilePage")) {
		console.log("profile page");

		new rhit.profilePageController();

	}

	if (document.querySelector("#allRecipesPage")) {
		console.log("all the recipes");

		new rhit.allRecipesController();
	}
};

rhit.main();
