<script>
    export let name = "name";
</script>

<div class="option">
    {name}
    <slot />
</div>

<style>
    .option {
        background-color: rgb(195, 207, 207);
        display: grid;
        place-items: center;
    }
</style>
