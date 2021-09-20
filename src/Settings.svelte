<script>
    import { Link, navigate } from "svelte-navigator";
    import SettingsOption from "./SettingsOption.svelte";
    import {
        nOfRepetitions,
        nOfCardsOnScreen,
        cardsSeparation,
        subjectName,
        loggingStyle,
        timeHoldToExit,
        showTitle,
        showCardText,
        cardH,
        cardW,
        silenceVoice,
        currentFeedbackSound,
    } from "./stores.js";
    const logStyleStr = {
        0: "Verbose (every selection)",
        1: "Simple (only results)",
    };
    let localNOfRepetitions,
        localCardsOnScreen,
        localCardsSeparation,
        localSubjectName,
        localLoggingStyle,
        localTimeHoldExit,
        localShowTitle,
        localShowCardText,
        localCardH,
        localCardW,
        localSilenceFeedback,
        localSilenceVoice,
        localCurrentFeedbackSound;
    const options = {
        0: nOfRepetitions,
        1: nOfCardsOnScreen,
        2: cardsSeparation,
        3: subjectName,
        4: loggingStyle,
        5: timeHoldToExit,
        6: showTitle,
        7: showCardText,
        8: cardH,
        9: cardW,
        10: silenceVoice,
        11: currentFeedbackSound,
    };
    import { feedbackSoundsOptions } from "./sounds";
    function increment(option, max, step = 1) {
        options[option].update((n) => {
            if (n >= max) {
                return max;
            }
            return n + step;
        });
    }
    function decrement(option, min, step = 1) {
        options[option].update((n) => {
            if (n <= min) {
                return min;
            }
            return n - step;
        });
    }
    function switchBoolValue(option) {
        options[option].update((value) => {
            return !value;
        });
    }

    nOfRepetitions.subscribe((value) => {
        console.log("cambió el valor!");
        localNOfRepetitions = value;
        if (localNOfRepetitions == 1) {
            console.log("Solo una carta???");
        }
    });

    nOfCardsOnScreen.subscribe((value) => {
        localCardsOnScreen = value;
    });
    cardsSeparation.subscribe((value) => {
        localCardsSeparation = value;
    });
    subjectName.subscribe((value) => {
        localSubjectName = value;
    });
    loggingStyle.subscribe((value) => {
        localLoggingStyle = value;
    });
    timeHoldToExit.subscribe((value) => {
        localTimeHoldExit = value;
    });
    showTitle.subscribe((value) => {
        localShowTitle = value;
    });
    showCardText.subscribe((value) => {
        localShowCardText = value;
    });
    cardH.subscribe((value) => {
        localCardH = value;
    });
    cardW.subscribe((value) => {
        localCardW = value;
    });
    silenceVoice.subscribe((value) => {
        localSilenceVoice = value;
    });
    currentFeedbackSound.subscribe((value) => {
        localCurrentFeedbackSound = feedbackSoundsOptions[value].name;
    });
</script>

<center><h1>Settings</h1></center>
<div class="color">
    <SettingsOption name="Number of repetitions">
        <div>
            <button on:click={() => increment(0, 100)}> + </button>
            <button> {localNOfRepetitions} </button>
            <button on:click={() => decrement(0, 1)}> - </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Cards on screen">
        <div>
            <button on:click={() => increment(1, 5)}> + </button>
            <button> {localCardsOnScreen} </button>
            <button on:click={() => decrement(1, 1)}> - </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Cards separation">
        <div>
            <button on:click={() => increment(2, 10)}> + </button>
            <button> {localCardsSeparation} </button>
            <button on:click={() => decrement(2, 0)}> - </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Subject name">
        <div>
            <input bind:value={$subjectName} />
        </div>
    </SettingsOption>

    <SettingsOption name="Logging Style">
        <div>
            <button on:click={() => increment(4, 1)}> + </button>
            <button> {logStyleStr[localLoggingStyle]} </button>
            <button on:click={() => decrement(4, 0)}> - </button>
        </div>
    </SettingsOption>

    <SettingsOption name="Time exit holding time">
        <div>
            <button on:click={() => increment(5, 5)}> + </button>
            <button> {localTimeHoldExit} seconds </button>
            <button on:click={() => decrement(5, 0)}> - </button>
        </div>
    </SettingsOption>

    <SettingsOption name="Show Title on Test Screen">
        <div>
            <button on:click={() => switchBoolValue(6)}>
                {localShowTitle ? "Enabled" : "Disabled"}
            </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Show Card Text on Test Screen">
        <div>
            <button on:click={() => switchBoolValue(7)}>
                {localShowCardText ? "Enabled" : "Disabled"}
            </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Card height">
        <div>
            <button on:click={() => increment(8, 1000, 10)}> + </button>
            <button> {localCardH} pixels </button>
            <button on:click={() => decrement(8, 10, 10)}> - </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Card width">
        <div>
            <button on:click={() => increment(9, 1000, 10)}> + </button>
            <button> {localCardW} pixels </button>
            <button on:click={() => decrement(9, 10, 10)}> - </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Card message (voice)">
        <div>
            <button on:click={() => switchBoolValue(10)}>
                {!localSilenceVoice ? "Enabled" : "Disabled"}
            </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Current Feedback (Sound)">
        <div>
            <button on:click={() => increment(11, 3, 1)}> + </button>
            <button> {localCurrentFeedbackSound} </button>
            <button on:click={() => decrement(11, 0, 1)}> - </button>
        </div>
    </SettingsOption>
</div>

<center>
    <button class="color"><Link to="/preview">Test Preview</Link> </button>
    <button on:click={() => navigate(-1)}>Go Back</button>
</center>

<style>
    .color {
        background-color: rgb(195, 207, 207);
        display: grid;
        place-items: center;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
    }
    input {
        text-align: center;
    }
</style>
