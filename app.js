const container = document.querySelector(".container");

//selecting the seats from the row that are not occupied and not in the showcase
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");

//Selecting the price of the movie and parsing it to and integer by using a +operator
let ticketPrice = +movieSelect.value;

populateUI();

//Update total Price
function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll(".row .seat.selected");

	const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

	localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;
	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}

//Populating UI from local Storage
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, idx) => {
			if (selectedSeats.indexOf(idx) > -1) {
				seat.classList.add("selected");
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem("selectedMovieindex");

	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

//Save selected movie and price
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem("selectedMovieIndex", movieIndex);
	localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Movie select Event
movieSelect.addEventListener("change", (e) => {
	ticketPrice = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
});

container.addEventListener("click", (e) => {
	if (
		e.target.classList.contains("seat") &&
		!e.target.classList.contains("occupied")
	) {
		e.target.classList.toggle("selected");

		updateSelectedCount();
	}
});

//Initial count and total set
updateSelectedCount();
