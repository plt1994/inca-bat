<script>
    import { Link } from "svelte-navigator";
    import TestDisplayer from "./TestDisplayer.svelte";
</script>

<center>
    <div class="color">
        <TestDisplayer />
        <button class="buttonclass">
            <Link to="/cardselection">Start selected test</Link>
        </button>
    </div>
</center>

<center><button class="color"><Link to="/">go back</Link></button></center>

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
        font-size: 10vw;
    }
</style>
