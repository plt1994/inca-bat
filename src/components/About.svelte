<script>
    import Header from "./Header.svelte";
    import ButtonLink from "components/Utils/ButtonLink.svelte";
</script>

<Header />
<div>
    <div class="color">
        InCA Blind Associative Testing (BAT), is a project for ACI research
        based on Jennifer Cunha method in Blind Testing, focused on Associative
        Tests for small animals. This project purpose is for helping ACI
        researchers and also to get Universidad de Chile Computing Engineering
        Undergraduate Degree.
    </div>

    <div class="color">
        In collaboration with <a
            href="https://parrotkindergarten.com/"
            target="_blank">Parrot Kindergarten</a
        >, Inc. and
        <a href="https://inca.dcc.uchile.cl" target="_blank">InCA Labs</a>
    </div>

    <center class="margin-to-center">
        <br /><br /><br />
        <ButtonLink path="back">Back</ButtonLink>
    </center>
</div>

<style>
    div {
        border-radius: 10px;
    }
    .color {
        background-color: #a0c9c0;
        place-items: center;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
        text-align: center;
        padding-left: 3vw;
        padding-right: 3vw;
        padding-top: 1vh;
        padding-bottom: 1vh;
    }

    .margin-to-center {
        margin-left: 10vw;
        margin-right: 10vw;
    }
</style>
