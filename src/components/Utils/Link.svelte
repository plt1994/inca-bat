<script>
    import { moveToPage } from "utils/navigator.js";
    export let to = "main";
    const moveToPageLocal = () => {
        moveToPage(to);
    };
</script>

<div on:click={moveToPageLocal}>
    <slot />
</div>
