<script>
    export let name = "name";
</script>

<div class="option">
    {name}
    <slot />
</div>

<style>
    .option {
        display: grid;
        place-items: center;
    }
</style>
