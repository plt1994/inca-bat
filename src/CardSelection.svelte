<script>
	import { navigate } from "svelte-navigator";
	import Card from "./card.svelte";
	import Card2 from "./Card2.svelte";
	import Header from "./Header.svelte";
	import { tests } from "./tests.js";
	import {
		nOfRepetitions,
		selectedTest,
		nOfCardsOnScreen,
		cardsSeparation,
		timeHoldToExit,
		showCardText,
		showTitle,
	} from "./stores.js";
	import { longpress } from "./longpress.js";
	let duration;
	let showHeader;
	let localShowCardText;
	showTitle.subscribe((value) => {
		showHeader = value;
	});
	timeHoldToExit.subscribe((value) => {
		duration = value * 1000;
	});
	showCardText.subscribe((value) => (localShowCardText = value));
	export let preview = false;
	let test_log = ["Current test log Detail:"];
	let current_test_id;
	selectedTest.subscribe((value) => {
		current_test_id = value;
	});
	let t0, t1;
	let w = 160;
	let h = 160;
	let current_test = tests[current_test_id];
	let correctSound = new Audio("sounds/yes.mp3");
	let incorrectSound = new Audio("sounds/no.mp3");
	let touchthedot = new Audio("sounds/cards/1.mp3");
	let cardsOnScreen;
	let cardsOnScreenStr;
	let localNOfCardsOnScreen; //subscribe this to a global value for settings
	nOfCardsOnScreen.subscribe((value) => {
		localNOfCardsOnScreen = value;
	});
	function shuffle(array) {
		return array.sort(() => Math.random() - 0.5);
	}
	let n_of_correct = 0;
	let n_of_incorrect = 0;
	let n_of_test_total;
	nOfRepetitions.subscribe((value) => {
		n_of_test_total = value;
	});
	if (preview) {
		n_of_test_total = 1;
	}
	let done = false;
	let touchable = false;
	let cards = shuffle(current_test.cards);
	//what is a selectable card??? its a card that has a meaning
	//if a card is not selectable, its just for filling
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
	//poner el correct choice y otra carta al azar

	// Get sub-array of first n elements after shuffled
	function setCurrentCardsOnScreen() {
		let otherCards = [];
		for (var i = 0; i < cards.length; i++) {
			let card = cards[i];
			if (card.n != correct_choice.n) {
				otherCards.push(card);
			}
		}
		// Shuffle array
		let shuffled = shuffle(otherCards);
		// obtiene las primeras nOfCardsOnScreen-1 cartas entre las opciones incorrectas
		cardsOnScreen = shuffled.slice(0, localNOfCardsOnScreen - 1);
		cardsOnScreen.push(correct_choice);
		cardsOnScreen = shuffle(cardsOnScreen);
		cardsOnScreenStr = String(cardsOnScreen.map((card) => card.cardName));
	}
	setCurrentCardsOnScreen();
	t0 = performance.now();
	function generate_log(chosen, responseTime) {
		var today = new Date();
		var date =
			today.getFullYear() +
			"-" +
			(today.getMonth() + 1) +
			"-" +
			today.getDate();
		var time =
			today.getHours() +
			":" +
			today.getMinutes() +
			":" +
			today.getSeconds();
		var ISODate = date + " " + time;
		var current = n_of_correct + n_of_incorrect;
		var options = cardsOnScreenStr;
		test_log.push(
			`[${ISODate}] [${current_test.name}] [${current}]/[${n_of_test_total}]: [Subject] chose [${chosen}] over [${options}] in a time of [${responseTime} s]`
		);
	}

	function select(chosenCard) {
		t1 = performance.now();
		//how to get current options?
		//what if i have more than one option to select?
		touchable = false;
		// console.log(id.n, correct_choice.n)
		if (chosenCard.n == correct_choice.n) {
			correctSound.play();
			n_of_correct += 1;
		} else {
			incorrectSound.play();
			n_of_incorrect += 1;
		}
		generate_log(chosenCard.cardName, (t1 - t0) / 1000);
		if (n_of_correct + n_of_incorrect >= n_of_test_total) {
			done = true;
			return;
		}
		setTimeout(function () {
			correctN = Math.floor(Math.random() * nOfSelectableCards);
			correct_choice = selectableCards[correctN];
			//TODO: poner solo dos cartas y no todas
			cards = shuffle(current_test.cards);
			setCurrentCardsOnScreen();
			if (correct_choice.n == 1) {
				//voice with message
				touchthedot.play();
			}
			touchable = true;
			t0 = performance.now();
		}, 1500);
	}
	function reset_test() {
		n_of_correct = 0;
		n_of_incorrect = 0;
		done = false;
		touchable = true;
		setCurrentCardsOnScreen();
		if (preview) {
			test_log = ["Current test log Detail (preview):"];
		}
	}
	setTimeout(function () {
		touchthedot.play();
		touchable = true;
	}, 1500);
	let separation;
	cardsSeparation.subscribe((value) => {
		separation = value;
	});
	function convertSeparation() {
		separation = 27 - (27 * separation) / 10;
	}
	convertSeparation();
	let textHoldToExit = "Hold to exit";
	function download() {
		console.log("download log");
	}
</script>

{#if showHeader}
	<Header />
{/if}

<center>
	{#if done == false && touchable}
		<div style="--separation:{separation}%" class="center">
			{#if localShowCardText}
				<p class="no-margin">
					{correct_choice.msg}
				</p>
			{/if}
			<div class="space-around">
				{#each cardsOnScreen as c}
					<div on:click={() => select(c)}>
						<!-- <Card n={c.n} width={w} height={h} /> -->
						<Card2 id={c.n} width={w} height={h} />
					</div>
				{/each}
			</div>
		</div>
	{/if}
	{#if done == false}
		<div>
			<button
				class="exit"
				use:longpress={duration}
				on:longpress={() => {
					navigate(-1);
				}}
				>{textHoldToExit}
			</button>
		</div>
	{/if}
	{#if done}
		<div>
			{#each test_log as log_i}
				<p>{log_i}</p>
			{/each}
			correct: {n_of_correct}; incorrect: {n_of_incorrect}
		</div>
		<button on:click={() => reset_test()}>Retry</button>
		<button on:click={() => navigate(-1)}>Go Back</button>
		<button on:click={() => download()}>Download logs</button>
	{/if}
</center>

<style>
	.space-around {
		display: flex;
		justify-content: space-around;
		position: relative;
		margin-left: var(--separation);
		margin-right: var(--separation);
	}

	.exit {
		color: #000;
		background-color: var(--color-hold-to-exit);
		position: fixed;
		left: 20px;
		bottom: 20px;
	}

	.center {
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
	}

	.no-margin {
		margin: 0%;
		font-size: large;
	}
</style>
