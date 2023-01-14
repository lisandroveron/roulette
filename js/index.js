// The range of slots that the revolver can hold, from 'min' to 'max', 'max' not included
let min = 1;
let max = 7;

// Creating the array that will represents the slots
let cylinder = [];
for(let i = min; i < max; i++){
	cylinder.push(i);
};
console.log(cylinder);

// Choicing the slot that will contain the bullet
let bullet = getRandom();
console.log(`Bullet charged in: ${bullet}`);

function getRandom(){
	return Math.floor(Math.random() * (max - min) + min);
};

// Setting the bullets counter
let counter = document.getElementById("counter");
counter.textContent = max - 1;

// Checking if the current slot is that contains the bullet
// The logic is simple:
// 1. Check if the current slot contains the bullet. If so, the player dies and the other player wins.
// 2. If not, then the cylinder rotates to the next slot, but...
// 3. ...if the player decided to trigger the other player in the first step and the shot did not go off, now he must trigger himself.
// 4. If the bullet does not come out, the game goes to the next turn.
function check(tag){
	counter.textContent -= 1;
	// Step 1 ->
	if(cylinder[0] == bullet){
		let target = document.getElementById(tag.getAttribute("data-target"));
		let status = document.querySelector(`#${target.id} > p:last-child`);
		target.style.backgroundColor = "red";
		status.textContent = "You are DEAD.";
	}else{	// Step 2 ->
		cylinder.splice(0, 1);
		let parent = tag.parentElement.closest("div");
		let nextPlayer = document.getElementById(document.querySelector(`#${parent.id} > input[value='Him']`).getAttribute("data-target"));
		// Step 3 ->
		if(tag.value == "Him"){
			document.querySelector(`#${parent.id} > input[value="Him"]`).setAttribute("disabled", "true");
		}else{	// Step 4 ->
			let currentPlayerButtons = document.querySelectorAll(`#${parent.id} > input`);
			currentPlayerButtons.forEach(item => item.setAttribute("disabled", "true"));
			let nextPlayerButtons = document.querySelectorAll(`#${nextPlayer.id} > input`);
			nextPlayerButtons.forEach(item => item.removeAttribute("disabled"));

			let currentPlayerStatus = document.querySelector(`#${parent.id} > p:last-child`);
			currentPlayerStatus.textContent = "";
			let nextPlayerStatus = document.querySelector(`#${nextPlayer.id} > p:last-child`);
			nextPlayerStatus.textContent = "Your turn."
		};
	};
};