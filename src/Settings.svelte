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
    import { feedbackSoundsOptions } from "./sounds";
    function increment(option, max, step = 1) {
        option.update((n) => {
            if (n >= max) {
                return max;
            }
            return n + step;
        });
    }
    function decrement(option, min, step = 1) {
        option.update((n) => {
            if (n <= min) {
                return min;
            }
            return n - step;
        });
    }
    function switchBoolValue(option) {
        option.update((value) => {
            return !value;
        });
    }
</script>

<center><h1>Settings</h1></center>
<div class="color">
    <SettingsOption name="Number of repetitions">
        <div>
            <button on:click={() => increment(nOfRepetitions, 100)}> + </button>
            <button> {$nOfRepetitions} </button>
            <button on:click={() => decrement(nOfRepetitions, 1)}> - </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Cards on screen">
        <div>
            <button on:click={() => increment(nOfCardsOnScreen, 5)}> + </button>
            <button> {$nOfCardsOnScreen} </button>
            <button on:click={() => decrement(nOfCardsOnScreen, 1)}> - </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Cards separation">
        <div>
            <button on:click={() => increment(cardsSeparation, 10)}> + </button>
            <button> {$cardsSeparation} </button>
            <button on:click={() => decrement(cardsSeparation, 0)}> - </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Subject name">
        <div>
            <input bind:value={$subjectName} />
        </div>
    </SettingsOption>

    <SettingsOption name="Logging Style">
        <div>
            <button on:click={() => increment(loggingStyle, 1)}> + </button>
            <button> {logStyleStr[$loggingStyle]} </button>
            <button on:click={() => decrement(loggingStyle, 0)}> - </button>
        </div>
    </SettingsOption>

    <SettingsOption name="Time exit holding time">
        <div>
            <button on:click={() => increment(timeHoldToExit, 5)}> + </button>
            <button> {$timeHoldToExit} seconds </button>
            <button on:click={() => decrement(timeHoldToExit, 0)}> - </button>
        </div>
    </SettingsOption>

    <SettingsOption name="Show Title on Test Screen">
        <div>
            <button on:click={() => switchBoolValue(showTitle)}>
                {$showTitle ? "Enabled" : "Disabled"}
            </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Show Card Text on Test Screen">
        <div>
            <button on:click={() => switchBoolValue(showCardText)}>
                {$showCardText ? "Enabled" : "Disabled"}
            </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Card height">
        <div>
            <button on:click={() => increment(cardH, 1000, 10)}> + </button>
            <button> {$cardH} pixels </button>
            <button on:click={() => decrement(cardH, 10, 10)}> - </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Card width">
        <div>
            <button on:click={() => increment(cardW, 1000, 10)}> + </button>
            <button> {$cardW} pixels </button>
            <button on:click={() => decrement(cardW, 10, 10)}> - </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Card message (voice)">
        <div>
            <button on:click={() => switchBoolValue(silenceVoice)}>
                {!$silenceVoice ? "Enabled" : "Disabled"}
            </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Current Feedback (Sound)">
        <div>
            <button on:click={() => increment(currentFeedbackSound, 3, 1)}>
                +
            </button>
            <button>
                {feedbackSoundsOptions[$currentFeedbackSound].name}
            </button>
            <button on:click={() => decrement(currentFeedbackSound, 0, 1)}>
                -
            </button>
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
