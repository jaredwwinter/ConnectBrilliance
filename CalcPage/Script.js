document.getElementById("foot01").innerHTML =
"<p>&copy;  " + new Date().getFullYear() + " Connect-Brilliance ChargeNow</p>";
// document.getElementById("nav01").innerHTML =
// "<ul id='menu'>" +
// "<li><a href='Index.html'>Home</a></li>" +
// "<li><a href='About.html'>About</a></li>" +
// "</ul>"; 

var pricing = document.getElementById('pricing');
console.log(pricing);
pricing.onclick = calcPrice;

function myFunction() {
    var Price = 0.1;

var calc = document.getElementById("calc");
console.log(calc);
var value = document.getElementById("calc").value;
var result = value * Price;
return result;

}



function calcPrice() {
	console.log('running');

    var result = myFunction();
document.getElementById("output").innerHTML = result;
console.log(result);
}
