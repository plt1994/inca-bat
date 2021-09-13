<script>
    import { Link } from "svelte-navigator";
    import {
        nOfRepetitions,
        nOfCardsOnScreen,
        cardsSeparation,
        subjectName,
        loggingStyle,
    } from "./stores.js";
    const logStyleStr = {
        0: "Verbose (every selection)",
        1: "Simple (only results)",
    };
    let localNOfRepetitions,
        localCardsOnScreen,
        localCardsSeparation,
        localSubjectName,
        localLoggingStyle;
    const options = {
        0: nOfRepetitions,
        1: nOfCardsOnScreen,
        2: cardsSeparation,
        3: subjectName,
        4: loggingStyle,
    };
    function increment(option) {
        options[option].update((n) => {
            return n + 1;
        });
    }
    function decrement(option) {
        options[option].update((n) => {
            if (n < 2) {
                return n;
            }
            return n - 1;
        });
    }

    nOfRepetitions.subscribe((value) => {
        localNOfRepetitions = value;
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
</script>

<div class="about color">
    Number of repetitions

    <div>
        <button on:click={() => increment(0)}> + </button>
        <button> {localNOfRepetitions} </button>
        <button on:click={() => decrement(0)}> - </button>
    </div>

    Cards on screen

    <div>
        <button on:click={() => increment(1)}> + </button>
        <button> {localCardsOnScreen} </button>
        <button on:click={() => decrement(1)}> - </button>
    </div>

    Cards separation

    <div>
        <button on:click={() => increment(2)}> + </button>
        <button> {localCardsSeparation} </button>
        <button on:click={() => decrement(2)}> - </button>
    </div>

    Subject name

    <div>
        <button> {localSubjectName} </button>
    </div>

    Logging Style

    <div>
        <button> {logStyleStr[localLoggingStyle]} </button>
    </div>
</div>

<center><button class="color"><Link to="/">go back</Link></button></center>

<style>
    .color {
        background-color: rgb(195, 207, 207);
        display: grid;
        place-items: center;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
    }

    .about {
        margin-left: 10%;
        margin-right: 10%;
    }
</style>
