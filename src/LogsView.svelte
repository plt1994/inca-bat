<script>
    import { moveToPage } from "./navigator";
    import { localLog } from "./stores";
</script>

<center><h1>Local Logs</h1></center>
<div>
    {#each Object.keys($localLog) as id}
        <div class="color">
            Test #{id}
            {#each $localLog[id] as line}
                <p>{line}</p>
            {/each}
        </div>
    {/each}
    <center><button on:click={() => moveToPage("menu")}>Go Back</button></center
    >
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
</style>
