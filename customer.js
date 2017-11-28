//
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');


//login creation, username and pass input
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // user username
  user: "root",
  // user password
  password: "passw0rd",
  database: "bamazon"
});


//error response
connection.connect(function(err) {
  if (err) throw err;
  showItems();
});

//item list
function showItems() {
	connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
		var table = new Table({
			head: ['ID', 'Name', 'Price'],
			style: {
				head: ['blue'],
				compact: false,
				colAligns: ['center'],
				colWidths: [10, 40, 15],
			}
		});

		var id, name, price;

		for(var i = 0; i < result.length; i++){
			table.push(
				[result[i].ItemID, result[i].ProductName, result[i].Price]
			);
		}
		console.log(table.toString());

		startShopping();
	});
}


//beginning shopping
function startShopping() {
	inquirer
		.prompt([{
			name: "id",
			type: "input",
			message: "Enter the ID of the item you would like to purchase: ",

		}, {
			name: "qty",
			type: "input",
			message: "Enter the quantity you would like to purchase: "

		}])
		.then(function(answers) {
			var purchaseID = parseInt(answers.id);
			var purchaseQty = parseInt(answers.qty);

			//since these two values will be NaN if a number isn't entered
			if (!purchaseID || !purchaseQty) {
				console.log ("Please enter a valid numerical ID and quantity");
				startShopping();
			} else {
				finishPurchase(purchaseID, purchaseQty);
			}
			
		});
}


//checkout
function finishPurchase(id, qty) {
	connection.query("SELECT * FROM products WHERE item_id=?", 
		[id], function(err, res) {
			if (err) throw err;

			if (res.length === 0) {
				console.log("no item fits id" + id);
				startShopping();

			} else if (qty > res[0].stock_quantity) {
				console.log("not enough " + res[0].product_name);
				startShopping();
			} else {
				console.log("we're finishing up your purchase");
				connection.query(
					"UPDATE products SET ? WHERE ?",
					[
						{
							stock_quantity: res[0].stock_quantity - qty
						},
						{
							item_id: id
						}
					],
					function(err, result) {
						var total = (parseInt(qty) * parseFloat(res[0].price)).toFixed(2);

						console.log("Purchased " + qty + " of " + res[0].product_name + ".");
						console.log("Total: $" + total);

						nextAction();
					});
			}
		});
}

//offer new shop
function nextAction() {
	inquirer
		.prompt({
			name: "again",
			type: "list",
			message: "do it again?",
			choices: ["YES ", "NO"]
		})
		.then(function(answer) {
			if (answer.again === "YES") {
				startShopping();
			} else {
				console.log("go away now");
				connection.end();
			}
		})
}