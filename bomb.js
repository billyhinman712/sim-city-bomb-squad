var timer, interval, siren;

document.addEventListener("DOMContentLoaded", function(){
	console.log("DOM got loaded");

	document.getElementById("reset").addEventListener("click", start);
});

function start(){
	addWireListeners();

	clearInterval(interval);
	
	interval = setInterval(tick, 1000);

	time  = 30;
	document.getElementById("timer").textContent = time;

	this.textContent = "Try Again!"

	document.getElementsByTagName("body")[0].classList.add("unexploded");
	document.getElementsByTagName("body")[0].classList.remove("exploded");

	document.getElementById("message").textContent="";
	document.getElementById("timer").style.color = "green";

	siren = document.getElementById("siren");
	siren.play();
}
// sets timer
function tick(){	
	time -= 1;
	document.getElementById("timer").textContent = time;

	if(time <= 3){
		document.getElementById("timer").style.color = "red";

	}

	if(time <= 0){
	losegame()
	}
}

function addWireListeners(){
	var wireImages = document.querySelectorAll("#box img");

	for(var i = 0; i < wireImages.length; i++){
		wireImages[i].src = "./img/uncut-" + wireImages[i].id + "-wire.png";
		wireImages[i].setAttribute("data-cut", (Math.random() > 0.5).toString());
		console.log(wireImages[i]);
		wireImages[i].addEventListener("click", clickwire);
	}

	if(checkwin()){
		start();
	}
}

function removeWireListeners(){
	var wireImages = document.querySelectorAll("#box img");

	for(var i = 0; i < wireImages.length; i++){
		wireImages[i].removeEventListener("click", clickwire);
	}
}
// checks if wire is cut
function clickwire(){
	this.src = "./img/cut-" + this.id + "-wire.png";
	this.removeEventListener("click", clickwire);

	if(this.getAttribute("data-cut")=== "true"){
		this.setAttribute("data-cut", "false");
		document.getElementById("buzz").play();

		if(checkwin()){
			wingame();
		}
	}
	//if all false restarts
	else {
		losegame();
	}
}
function checkwin(){
	var wireImages = document.querySelectorAll("#box img");

	for(var i = 0; i < wireImages.length; i++){
		if(wireImages[i].getAttribute("data-cut") === "true"){
			return false;
		}
	}
	return true;
}

function stopgame(message){
	removeWireListeners();

	clearInterval(interval);

	siren.pause();

	document.getElementById("message").textContent = message;
}
function wingame(){
	stopgame("You did it!");

	var cheer = document.getElementById("cheer");
	cheer.addEventListener("ended", function(){
		document.getElementById("success").play();
	});
	cheer.play();
}

function losegame(){
	stopgame("You Failed");

	document.getElementsByTagName("body")[0].classList.remove("unexploded");
	document.getElementsByTagName("body")[0].classList.add("exploded");

	document.getElementById("explode").play();
}






