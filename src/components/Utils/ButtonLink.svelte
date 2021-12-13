<script>
    import Button from "./Button.svelte";
    import Link from "./Link.svelte";
    export let path = "menu";
    export let fontSize = "min(10vh, 8vw)";
    export let contentType = "text";
</script>

<Button>
    <Link to={path}>
        {#if contentType == "text"}
            <p style="--font-size:{fontSize}" class="btn-font-size">
                <slot />
            </p>
        {:else}
            <div style="--font-size:{fontSize}" class="btn-font-size no-margin">
                <slot />
            </div>
        {/if}
    </Link>
</Button>

<style>
    .btn-font-size {
        font-size: var(--font-size);
    }
</style>
