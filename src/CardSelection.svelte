<script>
	import Card from "./Card.svelte";
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
		silenceVoice,
		currentFeedbackSound,
		localLog,
		subjectName,
		learnerMode,
		page,
	} from "./stores.js";
	import { moveToPage } from "./navigator";
	import { longpress } from "./longpress.js";
	import { Sounds, feedbackSounds, feedbackSoundsOptions } from "./sounds";
	export let preview = false;
	let soundIsActive = true;
	let duration;
	let showHeader;
	let localShowCardText;
	silenceVoice.subscribe((value) => {
		soundIsActive = !value;
	});
	let localFeedbackSounds = [1, 2];
	currentFeedbackSound.subscribe((value) => {
		localFeedbackSounds = feedbackSoundsOptions[value].fbIds;
	});
	showTitle.subscribe((value) => {
		showHeader = value;
	});
	timeHoldToExit.subscribe((value) => {
		duration = value * 1000;
	});
	showCardText.subscribe((value) => (localShowCardText = value));
	let test_log = ["Current test log Detail:"];
	let current_test_id;
	selectedTest.subscribe((value) => {
		current_test_id = value;
	});
	let t0, t1;
	let current_test = tests[current_test_id];
	let correctSound;
	let incorrectSound;
	let testsSounds = {};
	let cardsOnScreen;
	let cardsOnScreenStr;
	let localNOfCardsOnScreen; //subscribe this to a global value for settings
	function loadTestSounds() {
		let soundLocation;
		let id;
		current_test.cards.forEach((card) => {
			id = card.soundId;
			soundLocation = Sounds[id];
			testsSounds[card.n] = new Audio(soundLocation);
		});
	}
	function loadFeedbackSounds() {
		correctSound = new Audio(feedbackSounds[localFeedbackSounds[0]]);
		incorrectSound = new Audio(feedbackSounds[localFeedbackSounds[1]]);
	}
	if (soundIsActive) {
		loadTestSounds();
	}
	loadFeedbackSounds();
	function playCorrectChoiceSound(id) {
		testsSounds[id].play();
	}
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
			`[${ISODate}] [${current_test.name}] [${current}]/[${n_of_test_total}]: [${$subjectName}] chose [${chosen}] over [${options}] in a time of [${responseTime} s]`
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
			if (soundIsActive) {
				playCorrectChoiceSound(correct_choice.n);
			}
			touchable = true;
			t0 = performance.now();
		}, 1500);
	}
	let separation;
	cardsSeparation.subscribe((value) => {
		separation = value;
	});
	function convertSeparation() {
		separation = 27 - (27 * separation) / 10;
	}
	convertSeparation();
	let textHoldToExit = "Hold to exit";
	function saveLocalLog(button) {
		let k = Object.keys($localLog).length;
		let newLocalLog = $localLog;
		newLocalLog[k] = test_log;
		newLocalLog[
			k
		][0] = `Summary: correct: ${n_of_correct}; incorrect: ${n_of_incorrect}`;
		localLog.update(() => {
			return newLocalLog;
		});
		alert(`test saved as Test #${k}`);
	}
	function initTest() {
		setTimeout(function () {
			if (soundIsActive) {
				playCorrectChoiceSound(correct_choice.n);
			}
			touchable = true;
		}, 1500);
	}
	function reset_test() {
		initTest();
		n_of_correct = 0;
		n_of_incorrect = 0;
		done = false;
		touchable = true;
		setCurrentCardsOnScreen();
		if (preview) {
			test_log = ["Current test log Detail (preview):"];
		}
	}
	function goBack() {
		learnerMode.update(() => {
			return false;
		});
		if (preview) {
			moveToPage("settings");
			return;
		}
		moveToPage("test_selection");
	}
</script>

{#if showHeader}
	<Header />
{/if}

{#if $learnerMode}
	<center on:load={initTest()}>
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
							<Card cardObject={c} />
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
					on:longpress={() => goBack()}
					>{textHoldToExit}
				</button>
			</div>
		{/if}
		{#if done}
			<div class="center">
				<!-- {#each test_log as log_i}
					<p>{log_i}</p>
				{/each} -->
				<div>
					<button class="play-again" on:click={() => reset_test()}
						>PLAY AGAIN?</button
					>
				</div>
				correct: {n_of_correct}; incorrect: {n_of_incorrect}
				<div>
					<button on:click={() => goBack()}>Go Back</button>
					<button on:click={() => saveLocalLog()}>Save logs</button>
				</div>
			</div>
		{/if}
	</center>
{/if}

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
		left: 10px;
		bottom: 0px;
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

	.play-again {
		border-radius: 5px;
		width: 50vh;
		height: 20vh;
	}
</style>
