document.addEventListener("DOMContentLoaded", (event) => {
	const enterButton = document.getElementById("enter");
	const input = document.getElementById("userInput");
	const ul = document.querySelector("ul");

	function getInputLength() {
		return input.value.length;
	}

	function createListElement() {
		const li = document.createElement("li");
		li.appendChild(document.createTextNode(input.value));
		ul.appendChild(li);
		input.value = "";

		li.addEventListener("click", function () {
			li.classList.toggle("done");
		});

		const deleteButton = document.createElement("button");
		deleteButton.appendChild(document.createTextNode("X"));
		li.appendChild(deleteButton);

		// Add an event listener to the delete button
		deleteButton.addEventListener("click", function () {
			ul.removeChild(li);
		});
	}

	function addListAfterClick() {
		if (getInputLength() > 0) {
			createListElement();
		}
	}

	function addListAfterKeypress(event) {
		if (getInputLength() > 0 && event.keyCode === 13) {
			createListElement();
		}
	}

	enterButton.addEventListener("click", addListAfterClick);
	input.addEventListener("keypress", addListAfterKeypress);
});
