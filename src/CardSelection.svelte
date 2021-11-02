<script>
	import Card from "./Card.svelte";
	import Header from "./Header.svelte";
	import { jsonToCSV } from "svelte-csv";
	import { BasicTable } from "csv2table";
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
		username,
		learnerMode,
		timeFeedbackDelay,
	} from "./stores.js";
	import { moveToPage } from "./navigator";
	import { longpress } from "./longpress.js";
	import { feedbackSounds, feedbackSoundsOptions } from "./sounds";
	import { getTest, getCard } from "./controller";
	export let preview = false;
	let soundIsActive = true;
	let duration;
	let showHeader;
	let localShowCardText;
	let localFeedbackSounds = [1, 2];
	let test_log_json = [];
	let t0, t1;
	let current_test = getTest($selectedTest);
	let correctSound;
	let incorrectSound;
	let feedbackSoundStr;
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
	let delayVoiceTime = $timeFeedbackDelay;
	silenceVoice.subscribe((value) => {
		soundIsActive = !value;
	});
	currentFeedbackSound.subscribe((value) => {
		localFeedbackSounds = feedbackSoundsOptions[value];
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
		correctSound = new Audio(feedbackSounds[localFeedbackSounds.fbIds[0]]);
		incorrectSound = new Audio(
			feedbackSounds[localFeedbackSounds.fbIds[1]]
		);
		feedbackSoundStr = localFeedbackSounds.name;
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
		cardsOnScreenStr = String(
			cardsOnScreen.map(
				(card) =>
					`${card == correct_choice ? "*" : ""}${
						getCard(card.cardId).cardName
					}`
			)
		);
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
		let card_selection_details_log = {};
		let k = Object.keys($localLog).length;
		card_selection_details_log["Test #"] = k;
		card_selection_details_log["TestName"] = current_test.name;
		card_selection_details_log["S+"] = getCard(
			correct_choice.cardId
		).cardName;
		card_selection_details_log["Subject"] = $subjectName;
		card_selection_details_log["Owner"] = $username;
		for (let index = 0; index < cardsOnScreen.length; index++) {
			const element = cardsOnScreen[index];
			card_selection_details_log[`C_${index}`] = getCard(
				element.cardId
			).cardName;
		}
		for (let index = 0; index < cardsOnScreen.length; index++) {
			const element = cardsOnScreen[index];
			if (element.cardId == chosen.id) {
				card_selection_details_log["BPC"] = `C_${index}`;
			}
		}
		card_selection_details_log["R"] =
			correct_choice.cardId == chosen.id ? "correct" : "incorrect";
		card_selection_details_log["Date"] = ISODate;
		card_selection_details_log["TimeR"] = responseTime.toFixed(3);
		test_log_json.push(card_selection_details_log);
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
		generate_log(getCard(chosenCard.cardId), (t1 - t0) / 1000);
		if (n_of_correct + n_of_incorrect >= n_of_test_total) {
			done = true;
			saveLocalLog();
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
		let k = Object.keys($localLog).length;
		let newLocalLog = $localLog;
		newLocalLog[k] = [];
		newLocalLog[k][0] = JSON.stringify(test_log_json);
		test_log_json = [];
		newLocalLog[
			k
		][1] = `Summary: correct: ${n_of_correct}; incorrect: ${n_of_incorrect} | feedback-sound: ${feedbackSoundStr} | Accuracy: ${
			(100 * n_of_correct) / n_of_test_total
		}%`;
		localLog.update(() => {
			return newLocalLog;
		});
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
	function showCSVData(jsonData) {
		return jsonToCSV(JSON.stringify(jsonData));
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
				<BasicTable
					csv={showCSVData(test_log_json)}
					csvColumnDelimiter=","
				/>
				<div>
					<button class="play-again" on:click={() => reset_test()}
						>PLAY AGAIN?</button
					>
				</div>
				correct: {n_of_correct}; incorrect: {n_of_incorrect}
				<div>
					<button on:click={() => goBack()}>Go Back</button>
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
