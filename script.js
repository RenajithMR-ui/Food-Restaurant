// -----------------------------
// LOAD HOME PAGE
// -----------------------------
loadPage("home.html");
// -----------------------------
// FOOD DATA
// -----------------------------

const foods = [

    {
        name: "Chicken Biriyani",
        price: 150
    },

    {
        name: "Cheese Pizza",
        price: 200
    },

    {
        name: "Chicken Burger",
        price: 120
    },
    {
        name:"mango juice",
        price:40
    },
    {
        name:"icecream",
        price:40
    },
    {
        name:"shawarma",
        price:179
    }

];


// -----------------------------
// QUANTITIES
// -----------------------------

let quantities = [1, 1, 1,1,1,1];


// -----------------------------
// ORDERS
// -----------------------------

let orders = [];


// -----------------------------
// LOAD PAGE
// -----------------------------

function loadPage(page) {

    fetch(page)

        .then(response => response.text())

        .then(data => {

            document.getElementById("content")
                .innerHTML = data;


            // If orders page is loaded
            // show existing orders

            if (page === "orders.html") {

                displayOrders();

            }

        })

        .catch(error => {

            console.log("Error:", error);

        });

}


// -----------------------------
// LOAD NAVBAR
// -----------------------------

fetch("navbar.html")

    .then(response => response.text())

    .then(data => {

        document.getElementById("navbar")
            .innerHTML = data;

    });


// -----------------------------
// QUANTITY
// -----------------------------

function changeQuantity(index, change) {

    quantities[index] += change;


    // Quantity cannot be less than 1

    if (quantities[index] < 1) {

        quantities[index] = 1;

    }


    document.getElementById(
        "quantity-" + index
    ).textContent = quantities[index];
    document.getElementById("price"+index).textContent=quantities[index]*foods[index].price;

}


// -----------------------------
// BUY FOOD
// -----------------------------

function buyFood(index) {

    const food = foods[index];

    const quantity = quantities[index];


    const total =
        food.price * quantity;


    // Add order

    orders.push({

        name: food.name,

        quantity: quantity,

        total: total

    });


    // Open orders page

    loadPage("orders.html");

}


// -----------------------------
// DISPLAY ORDERS
// -----------------------------

function displayOrders() {
    if (usrname==""){
        document.getElementById("order-names").innerHTML=`<p> Complete Profile <br>name: invalid</p>`;}
    else{
        document.getElementById("order-names").innerHTML=`<p>Name: ${usrname}</p><br>`;
    }
    const orderList =
        document.getElementById("order-list");


    if (orders.length === 0) {

        orderList.innerHTML = `

            <p class="empty">
                You haven't ordered anything yet.
            </p>

        `;

        return;

    }


    orderList.innerHTML = "";


    let grandTotal = 0;


    orders.forEach(function(order,index) {

        grandTotal += order.total;


        const orderCard =
            document.createElement("div");


        orderCard.className =
            "order-card";


        orderCard.innerHTML = `

            <h2>
                ${order.name}
            </h2>

            <p>
                Quantity:
                ${order.quantity}
            </p>

            <p>
                Price:
                ₹${order.total}
            </p>
            <button class="button-cancel" onclick="cancelorder(${index})">X</button>

        `;
        
        
        orderList.appendChild(orderCard);

    });


    // Total

    const totalCard =
        document.createElement("div");


    totalCard.className =
        "total-card";


    totalCard.innerHTML = `

        <h2>
            Total: ₹${grandTotal}
        </h2>

    `;


    orderList.appendChild(totalCard);

}
function cancelorder(index){
    orders.splice(index,1);
    displayOrders();
}
let usrname="";
function show_name(){
    usrname=document.getElementById("name").value;
    const mob=document.getElementById("number").value;
    document.getElementById("prof").innerHTML=`<h3>Name: ${usrname}<br><br> MOB: ${mob}</h3>`;
}



