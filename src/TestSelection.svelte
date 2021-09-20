<script>
    import { Link, navigate } from "svelte-navigator";
    import TestDisplayer from "./TestDisplayer.svelte";
</script>

<center><h1>Select a Test to start</h1></center>
<center>
    <div class="color">
        <TestDisplayer />
        <button class="buttonclass">
            <Link to="/cardselection">Start selected test</Link>
        </button>
    </div>
</center>

<center><button on:click={() => navigate(-1)}>Go Back</button></center>

<style>
    /* .color {
        background-color: rgb(195, 207, 207);
        display: grid;
        place-items: center;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
    } */

    .buttonclass {
        /* background-color: rgb(80, 75, 83); */
        font-size: 7vw;
    }
</style>
