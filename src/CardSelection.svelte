<script>
	import { Link } from "svelte-navigator";
	import Card from "./card.svelte";
	import { tests } from "./tests.js";
	import { nOfRepetitions, selectedTest } from "./stores.js";

	let current_test_id;
	selectedTest.subscribe((value) => {
		current_test_id = value;
	});
	let w = 160;
	let h = 160;
	let current_test = tests[current_test_id];
	let correctSound = new Audio("sounds/yes.mp3");
	let incorrectSound = new Audio("sounds/no.mp3");
	let touchthedot = new Audio("sounds/cards/1.mp3");

	function shuffle(array) {
		return array.sort(() => Math.random() - 0.5);
	}
	let n_of_correct = 0;
	let n_of_incorrect = 0;
	let n_of_test_total = 10;
	nOfRepetitions.subscribe((value) => {
		n_of_test_total = value;
	});
	let done = false;
	let touchable = false;
	let cards = shuffle(current_test.cards);
	let selectableCards = [];
	for (var i = 0; i < cards.length; i++) {
		let card = cards[i];
		if (card.selectable) {
			selectableCards.push(card);
		}
	}
	let nOfSelectableCards = selectableCards.length;
	let correctN = Math.floor(Math.random() * nOfSelectableCards);
	let correct_choice = selectableCards[correctN];

	function select(id) {
		touchable = false;
		// console.log(id.n, correct_choice.n)
		if (id.n == correct_choice.n) {
			correctSound.play();
			n_of_correct += 1;
		} else {
			incorrectSound.play();
			n_of_incorrect += 1;
		}
		if (n_of_correct + n_of_incorrect >= n_of_test_total) {
			done = true;
			return;
		}
		setTimeout(function () {
			correctN = Math.floor(Math.random() * nOfSelectableCards);
			correct_choice = selectableCards[correctN];
			cards = shuffle(current_test.cards);
			if (correct_choice.n == 1) {
				touchthedot.play();
				touchable = true;
			}
		}, 1500);
	}
	function reset_test() {
		n_of_correct = 0;
		n_of_incorrect = 0;
		done = false;
	}
	setTimeout(function () {
		touchthedot.play();
		touchable = true;
	}, 1500);
</script>

<center>
	{#if done == false && touchable}
		<h1>
			{correct_choice.msg}
		</h1>
		<table align="center">
			<tr>
				{#each cards as c}
					<td on:click={() => select(c)}>
						<Card n={c["n"]} width={w} height={h} />
					</td>
				{/each}
			</tr>
		</table>
	{/if}
	{#if done}
		<div>
			correct: {n_of_correct}; incorrect: {n_of_incorrect}
		</div>
		<button on:click={() => reset_test()}>retry</button>
		<button><Link to="/">go back</Link></button>
	{/if}
</center>
