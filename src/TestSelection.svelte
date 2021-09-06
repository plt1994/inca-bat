<script>
    import { Link } from "svelte-navigator";
    import TestDisplayer from "./TestDisplayer.svelte";
</script>

<TestDisplayer />

<div class="color">
    <div class="buttonclass">
        <Link to="/cardselection">Start selected test</Link>
    </div>
</div>

<center><button class="color"><Link to="/">go back</Link></button></center>
