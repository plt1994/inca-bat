<script>
    import TestDisplayer from "./TestDisplayer.svelte";
    import Link from "./Link.svelte";
    import { moveToPage } from "../utils/navigator";
    import { Navbar } from "sveltestrap";
</script>

<center><h1>Select a Test to start</h1></center>
<center>
    <div class="color">
        <TestDisplayer />
    </div>
</center>

<footer class="fixed-bottom">
    <Navbar>
        <button class="col-sm-6" on:click={() => moveToPage("menu")}
            >Go Back</button
        >
        <button class="col-sm-6">
            <Link to="card_selection">Start selected test</Link>
        </button>
    </Navbar>
</footer>
