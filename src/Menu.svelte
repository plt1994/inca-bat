<script>
    import { Link } from "svelte-navigator";
    import Header from "./Header.svelte";
</script>

<Header />
<div>
    <div class="color">
        <div class="buttonclass">
            <Link to="testselection">Test</Link>
        </div>
        <div class="buttonclass"><Link to="about">About</Link></div>
        <div class="buttonclass"><Link to="settings">Settings</Link></div>
    </div>

    <div class="color">
        In collaboration with <a
            href="https://parrotkindergarten.com/"
            target="_blank">Parrot Kindergarten</a
        >, Inc. and
        <a href="https://inca.dcc.uchile.cl" target="_blank">InCA Labs</a>
    </div>
</div>

<style>
    .color {
        background-color: rgb(195, 207, 207);
        display: grid;
        place-items: center;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
    }

    .buttonclass {
        /* background-color: rgb(80, 75, 83); */
        font-size: 10vw;
    }
</style>
