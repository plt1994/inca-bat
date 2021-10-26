<script>
	import Card from "./Card.svelte";
	import Header from "./Header.svelte";
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
	} from "./stores.js";
	import { moveToPage } from "./navigator";
	import { longpress } from "./longpress.js";
	import { feedbackSounds, feedbackSoundsOptions } from "./sounds";
	import { getTest } from "./controller";
	export let preview = false;
	let soundIsActive = true;
	let duration;
	let showHeader;
	let localShowCardText;
	let localFeedbackSounds = [1, 2];
	let test_log = ["Current test log Detail:"];
	let t0, t1;
	let current_test = getTest($selectedTest);
	let correctSound;
	let incorrectSound;
	let testsSounds = {};
	let cardsOnScreen;
	let cardsOnScreenStr;
	let n_of_correct = 0;
	let n_of_incorrect = 0;
	let n_of_test_total;
	let done = false;
	let touchable = false;
	let cards = shuffle(current_test.cards);
	let selectableCards = [];
	let nOfSelectableCards = 0;
	let correctN;
	let correct_choice;
	let separation;
	let textHoldToExit = "Hold to exit";
	let delayVoiceTime = 1000;
	silenceVoice.subscribe((value) => {
		soundIsActive = !value;
	});
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
	nOfRepetitions.subscribe((value) => {
		n_of_test_total = value;
	});
	cardsSeparation.subscribe((value) => {
		separation = value;
	});
	function loadTestSounds() {
		let soundLocation;
		current_test.cards.forEach((card) => {
			soundLocation = card.soundSrc;
			testsSounds[card.cardId] = new Audio(soundLocation);
		});
	}
	function loadFeedbackSounds() {
		correctSound = new Audio(feedbackSounds[localFeedbackSounds[0]]);
		incorrectSound = new Audio(feedbackSounds[localFeedbackSounds[1]]);
	}
	function playCorrectChoiceSound(id) {
		testsSounds[id].play();
	}
	function shuffle(array) {
		return array.sort(() => Math.random() - 0.5);
	}
	// Get sub-array of first n elements after shuffled
	function setCurrentCardsOnScreen() {
		let otherCards = [];
		for (var i = 0; i < cards.length; i++) {
			let card = cards[i];
			if (card.cardId != correct_choice.cardId) {
				otherCards.push(card);
			}
		}
		// Shuffle array
		let shuffled = shuffle(otherCards);
		// obtiene las primeras nOfCardsOnScreen-1 cartas entre las opciones incorrectas
		cardsOnScreen = shuffled.slice(0, $nOfCardsOnScreen - 1);
		cardsOnScreen.push(correct_choice);
		cardsOnScreen = shuffle(cardsOnScreen);
		cardsOnScreenStr = String(cardsOnScreen.map((card) => card.cardName));
	}
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
		// console.log(id.cardId, correct_choice.cardId)
		if (chosenCard.cardId == correct_choice.cardId) {
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
				playCorrectChoiceSound(correct_choice.cardId);
			}
			touchable = true;
			t0 = performance.now();
		}, delayVoiceTime);
	}
	function convertSeparation() {
		separation = 27 - (27 * separation) / 10;
	}
	convertSeparation();
	function saveLocalLog() {
		if (!test_log) {
			return;
		}
		let k = Object.keys($localLog).length;
		let newLocalLog = $localLog;
		newLocalLog[k] = test_log;
		newLocalLog[
			k
		][0] = `Summary: correct: ${n_of_correct}; incorrect: ${n_of_incorrect}`;
		localLog.update(() => {
			return newLocalLog;
		});
		test_log = "";
		// alert(`test saved as Test #${k}`);
	}
	function initTest() {
		if (soundIsActive) {
			loadTestSounds();
		}
		loadFeedbackSounds();
		if (preview) {
			n_of_test_total = 1;
		}
		for (var i = 0; i < cards.length; i++) {
			let card = cards[i];
			if (card.selectable) {
				selectableCards.push(card);
			}
		}
		correctN = Math.floor(Math.random() * nOfSelectableCards);
		correct_choice = selectableCards[correctN];
		setCurrentCardsOnScreen();
		nOfSelectableCards = selectableCards.length;
		setTimeout(function () {
			if (soundIsActive) {
				playCorrectChoiceSound(correct_choice.cardId);
			}
			t0 = performance.now();
			touchable = true;
		}, delayVoiceTime);
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
							<Card testCard={c} />
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
