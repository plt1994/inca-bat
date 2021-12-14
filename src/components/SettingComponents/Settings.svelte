<script>
    import Link from "components/Utils/Link.svelte";
    import SettingsOption from "./SettingsOption.svelte";
    import Header from "components/Header.svelte";
    import Footer from "components/Footer.svelte";
    import ButtonLink from "components/Utils/ButtonLink.svelte";
    import { longpress } from "utils/longpress.js";
    import { Col, Row } from "sveltestrap";
    import { ArrowRightShort, ArrowLeftShort } from "svelte-bootstrap-icons";
    import {
        nOfRepetitions,
        nOfCardsOnScreen,
        cardsSeparation,
        subjectName,
        username,
        timeHoldToExit,
        showTitle,
        showCardText,
        cardH,
        cardW,
        silenceVoice,
        currentFeedbackSound,
        localLog,
        bgColor,
        fgColor,
        cardBgColor,
        timeFeedbackDelay,
    } from "stores/stores.js";
    import { feedbackSoundsOptions } from "controller/sounds.js";
    const colors = [
        "white",
        "silver",
        "gray",
        "black",
        "red",
        "maroon",
        "yellow",
        "olive",
        "lime",
        "green",
        "aqua",
        "teal",
        "blue",
    ];
    let footerButtonsFontSize = "min(10vh, 8vw)";
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
    function cleanLogs() {
        localLog.update(() => {
            return {};
        });
    }
</script>

<center><Header title="Settings" /></center>
<div class="color">
    <SettingsOption name="Number of repetitions">
        <div>
            <button on:click={() => decrement(nOfRepetitions, 1)}> - </button>
            <button> {$nOfRepetitions} </button>
            <button on:click={() => increment(nOfRepetitions, 100)}> + </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Cards on screen">
        <div>
            <button on:click={() => decrement(nOfCardsOnScreen, 1)}> - </button>
            <button> {$nOfCardsOnScreen} </button>
            <button on:click={() => increment(nOfCardsOnScreen, 5)}> + </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Cards separation">
        <div>
            <button on:click={() => decrement(cardsSeparation, 0)}> - </button>
            <button> {$cardsSeparation * 10}% </button>
            <button on:click={() => increment(cardsSeparation, 10)}> + </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Learner name">
        <div>
            <input bind:value={$subjectName} />
        </div>
    </SettingsOption>
    <SettingsOption name="Teacher name">
        <div>
            <input bind:value={$username} />
        </div>
    </SettingsOption>
    <SettingsOption name="Learner Screen background color">
        <div>
            <input bind:value={$bgColor} />
        </div>
        <center>
            <div>
                {#each colors as color}
                    <button
                        style="background-color:{color}"
                        class="button-color-selector"
                        id={color}
                        on:click={() => ($bgColor = color)}
                    />
                {/each}
            </div>
        </center>
    </SettingsOption>
    <SettingsOption name="Card background color (if transparent)">
        <div>
            <input bind:value={$cardBgColor} />
        </div>
        <center>
            <div>
                {#each colors as color}
                    <button
                        style="background-color:{color}"
                        class="button-color-selector"
                        id={color}
                        on:click={() => ($cardBgColor = color)}
                    />
                {/each}
            </div>
        </center>
    </SettingsOption>
    <SettingsOption name="foreground color (only for dice and text cards)">
        <div>
            <input bind:value={$fgColor} />
        </div>
        <center>
            <div>
                {#each colors as color}
                    <button
                        style="background-color:{color}"
                        class="button-color-selector"
                        id={color}
                        on:click={() => ($fgColor = color)}
                    />
                {/each}
            </div>
        </center>
    </SettingsOption>
    <!-- <SettingsOption name="Logging Style">
        <div>
            <button on:click={() => increment(loggingStyle, 1)}> + </button>
            <button> {logStyleStr[$loggingStyle]} </button>
            <button on:click={() => decrement(loggingStyle, 0)}> - </button>
        </div>
    </SettingsOption> -->

    <SettingsOption name="Feedback time delay">
        <div>
            <button on:click={() => decrement(timeFeedbackDelay, 0, 500)}>
                -
            </button>
            <button> {$timeFeedbackDelay / 1000} seconds </button>
            <button on:click={() => increment(timeFeedbackDelay, 3500, 500)}>
                +
            </button>
        </div>
    </SettingsOption>

    <SettingsOption name="Time exit holding time">
        <div>
            <button on:click={() => decrement(timeHoldToExit, 0)}> - </button>
            <button> {$timeHoldToExit} seconds </button>
            <button on:click={() => increment(timeHoldToExit, 5)}> + </button>
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
            <button on:click={() => decrement(cardH, 10, 10)}> - </button>
            <button> {$cardH} pixels </button>
            <button on:click={() => increment(cardH, 1000, 10)}> + </button>
        </div>
    </SettingsOption>
    <SettingsOption name="Card width">
        <div>
            <button on:click={() => decrement(cardW, 10, 10)}> - </button>
            <button> {$cardW} pixels </button>
            <button on:click={() => increment(cardW, 1000, 10)}> + </button>
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
            {#if $currentFeedbackSound > 0}
                <button on:click={() => decrement(currentFeedbackSound, 0, 1)}>
                    <ArrowLeftShort />
                </button>
            {/if}
            <button>
                {feedbackSoundsOptions[$currentFeedbackSound].name}
            </button>
            {#if $currentFeedbackSound < 3}
                <button on:click={() => increment(currentFeedbackSound, 3, 1)}>
                    <ArrowRightShort />
                </button>
            {/if}
        </div>
    </SettingsOption>
    <SettingsOption name="Tests Logs">
        <div>
            {#if Object.keys($localLog).length > 0}
                <button use:longpress={3000} on:longpress={() => cleanLogs()}
                    >Clean Logs (keep 3 seconds)
                </button>
            {:else}
                <p>Logs are empty</p>
            {/if}
        </div>
    </SettingsOption>
</div>

<Footer rows="2">
    <Col>
        <ButtonLink
            path="menu"
            fontSize={footerButtonsFontSize}
            contentType="icon"
        >
            <i class="fa fa-home" />
        </ButtonLink>
    </Col>

    <Col>
        <ButtonLink
            path="preview"
            fontSize={footerButtonsFontSize}
            contentType="text"
        >
            Preview
        </ButtonLink>
        <!-- <button class="btn d-block w-100 dark-border"
                ><Link to="preview"
                    ><p class="footer-text-size no-margin">Preview</p></Link
                >
            </button> -->
    </Col>
</Footer>

<style>
    .button-color-selector {
        width: 35px;
        height: 35px;
    }
    .color {
        background-color: #a0c9c0;
        border-color: #a0c9c0;
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
