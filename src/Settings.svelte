<script>
    import { Link } from "svelte-navigator";
    import { nOfRepetitions } from "./stores.js";
    let n_of_repetitions;
    function increment() {
        nOfRepetitions.update((n) => n + 1);
    }

    function decrement() {
        nOfRepetitions.update((n) => n - 1);
    }

    nOfRepetitions.subscribe((value) => {
        n_of_repetitions = value;
    });
</script>

<div class="about color">
    Number of repetitions

    <div>
        <button on:click={increment}> + </button>
        <button> {n_of_repetitions} </button>
        <button on:click={decrement}> - </button>
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
