<script>
    import { Link } from "svelte-navigator";
</script>

<div class="about">
    InCA Blind Associative Testing (BAT), is a project for ACI research 
    based on Jennifer Cunha method in Blind Testing, focused on Associative
    Tests for small animals. This project purpose is for helping ACI researchers
    and also to get Universidad de Chile Computing Engineering Undergraduate Degree.
</div>

<div class="color">
    In collaboration with <a href="https://parrotkindergarten.com/" target="_blank"
        >Parrot Kindergarten</a
    >, Inc. and <a href="https://inca.dcc.uchile.cl" target="_blank">InCA Labs</a>
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