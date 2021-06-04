<script>
	import Card from "./card.svelte";
	import { tests } from "./tests.js";
	let name = 'world';
// 	let cards = [0, 1];
	let w = 160;
	let h = 160;
	let current_test = tests[0]
	// let playSound = true;
	let correctSound = new Audio("sounds/yes.mp3");
	let incorrectSound = new Audio("sounds/no.mp3");
	let touchthedot = new Audio("sounds/cards/1.mp3")
	
	
	function shuffle(array) {
		return array.sort(() => Math.random() - 0.5);
	}
	
	let cards = shuffle(current_test.cards)
	let selectableCards = []
	for(var i=0; i< cards.length; i++) {
		let card=cards[i]
		if (card.selectable) {
			selectableCards.push(card)
		}
	}
	let nOfSelectableCards = selectableCards.length
	let correctN = Math.floor(Math.random() * nOfSelectableCards)
	let correct_choice = selectableCards[correctN]
	
	function select(id) {
		console.log(id.n, correct_choice.n)
		if (id.n == correct_choice.n) {
			correctSound.play();
		}else {
			incorrectSound.play();
		}
		setTimeout(function () {
			correctN = Math.floor(Math.random() * nOfSelectableCards)
			correct_choice = selectableCards[correctN]
			cards = shuffle(current_test.cards)
			if (correct_choice.n == 1){
				touchthedot.play();
			}
		}, 1500)
	}
</script>

<center>
	<h1>
		{correct_choice.msg}
	</h1>
<table align=center>
	<tr>
		{#each cards as c}
		<td on:click={()=>select(c)}>
			<Card n={c["n"]} width={w} height={h}></Card>
		</td>
		{/each}
	</tr>
</table>
</center>